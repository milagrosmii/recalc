import express from 'express';
import core from './core.js';

import { createHistoryEntry } from './models.js'
import { getHistory } from './models.js';

const router = express.Router();

router.get("/sub/:a/:b", async function (req, res) {
    const params = req.params;
    const a = Number(params.a);
    const b = Number(params.b);

    if (isNaN(a) || isNaN(b)) {
        res.status(400).send('Uno de los parámetros no es un número');
    } else {
        const result = core.sub(a, b);

        await createHistoryEntry({ firstArg: a, secondArg: b, operationName: "SUB", result })
        return res.send({ result });
    }
});

router.get("/pow/:a", async function (req, res) {
    const params = req.params;
    const a = Number(params.a);

    if (isNaN(a)) {
        await createHistoryEntry({
            firstArg: 0,
            secondArg: null,
            operationName: "POW",
            result: null,
            error: "El parámetro ingresado no es un numero"
        })
        res.status(400).send({ mensaje: 'El parámetro ingresado no es un numero'});
    } else {
        const result = core.pow(a);
        await createHistoryEntry({
            firstArg: a,
            secondArg: null,
            operationName: "POW",
            result
        })
        return res.send({ result });
    }
});

router.get("/add/:a/:b", async function (req, res) {
    const params = req.params;
    const a = Number(params.a);
    const b = Number(params.b);

    if (isNaN(a) || isNaN(b)) {
        res.status(400).send({ mensaje: 'Uno de los parámetros no es un número'});
        await createHistoryEntry({
            firstArg: 0,
            secondArg: 0,
            operationName: 'ADD',
            error: 'Uno de los parametros no es un numero'
        })
    } else {
        const result = core.add(a, b);
        await createHistoryEntry({
            firstArg: a,
            secondArg: b,
            operationName: "ADD",
            result
        })
        return res.send({ result });
    }
});

router.get("/div/:a/:b", async function (req, res) {
    const params = req.params;
    const a = Number(params.a);
    const b = Number(params.b);

    if (isNaN(a) || isNaN(b)) {
        res.status(400).send({mensaje: 'Uno de los parámetros no es un número'});
    } if (b === 0) {
        await createHistoryEntry({
            firstArg: a,
            secondArg: b,
            operationName: "DIV",
            result: null,
            error: "No se puede dividir por 0"
        })
        res.status(400).send({mensaje: 'No se puede dividir por 0'})
    } else {
        const result = core.div(a,b);
        await createHistoryEntry({
            firstArg: a,
            secondArg: b,
            result: result,
            error: null,
            operationName: "DIV"
        })
        return res.send({ result });
    }
});

router.get("/mul/:a/:b", async function (req, res) {
    const params = req.params;
    const a = Number(params.a);
    const b = Number(params.b);

    if (isNaN(a) || isNaN(b)) {
        await createHistoryEntry({
            firstArg: a,
            secondArg: b,
            operationName: "MUL",
            result: null,
            error: "ambos parametros deben ser un numero"
        })
        res.status(400).send('Uno de los parámetros no es un número');
    } else {
        const result = core.mul(a, b);
        await createHistoryEntry({
            firstArg: a,
            secondArg: b,
            operationName: "MUL",
            result
            
        })
        
        return res.send({ result });
    }
});

router.get("/history", async function(req, res) {
    try {
      const history = await getHistory();
  
      res.status(200).json(history);
    } catch (error) {
      res.status(500).json({ error: "Ocurrió un error al intentar acceder al historial" });
    }
  });
  

export default router;


import { test, expect } from '@playwright/test';
import { seed } from '../src/seed.js';
import { Operation, History } from '../src/models.js'

test.describe('test', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async () => {
    await seed();
  })

  test('Deberia tener como titulo de pagina recalc', async ({ page }) => {
    await page.goto('./');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/recalc/i);
  });

  test('Deberia poder realizar una resta', async ({ page }) => {
    await page.goto('./');

    await page.getByRole('button', { name: '7' }).click()
    await page.getByRole('button', { name: '9' }).click()
    await page.getByRole('button', { name: '-' }).click()
    await page.getByRole('button', { name: '9' }).click()

    const [response] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/v1/sub/')),
      page.getByRole('button', { name: '=' }).click()
    ]);

    const { result } = await response.json();
    expect(result).toBe(70);

    await expect(page.getByTestId('display')).toHaveValue(/70/)

    const operation = await Operation.findOne({
      where: {
        name: "SUB"
      }
    });

    const historyEntry = await History.findOne({
      where: { OperationId: operation.id }
    })

    expect(historyEntry.firstArg).toEqual(79)
    expect(historyEntry.secondArg).toEqual(9)
    expect(historyEntry.result).toEqual(70)
  });

  //TEST: Verifica que la potencia cuadrada se calcule correctamente
  test('Deberia poder calcular la potencia cuadrada de un número', async ({page}) => {
    await page.goto('./');


    await page.getByRole('button', { name: '7' }).click();
    await page.getByRole('button', { name: '^2' }).click();

    const [response] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/v1/pow/')),
      page.getByRole('button', { name: '=' }).click()
    ]);

    const { result } = await response.json();
    expect(result).toBe(49);

    await expect(page.getByTestId('display')).toHaveValue(/49/)

    const operation = await Operation.findOne({
      where: {
        name: "POW"
      }
    });

    const historyEntry = await History.findOne({
      where: { OperationId: operation.id }
    })

    expect(historyEntry.firstArg).toEqual(7)
    expect(historyEntry.result).toEqual(49)
  });

  //TEST: Verifica que la calculadora tire error si el resultado es mayor que 100.000
  test('Verifica que la calculadora tire error si el resultado es mayor que 100.000', async ({page}) => {
    await page.goto('./');


    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '0' }).click();
    await page.getByRole('button', { name: '0' }).click();
    await page.getByRole('button', { name: '0' }).click();
    await page.getByRole('button', { name: '^2' }).click();

    const [response] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/v1/pow/')),
      page.getByRole('button', { name: '=' }).click()
    ]);

    const { result } = await response.json();
    expect(result).toBe(1000000);

    await expect(page.getByTestId('display')).toHaveValue(/Error: Valor muy grande/)

    const operation = await Operation.findOne({
      where: {
        name: "POW"
      }
    });

    const historyEntry = await History.findOne({
      where: { OperationId: operation.id }
    })

    expect(historyEntry.firstArg).toEqual(1000)
    expect(historyEntry.result).toEqual(1000000)
  });
  //Debería realizar una división
  test('Debería poder realizar una división', async ({ page }) => {
    await page.goto('./');

    await page.getByRole('button', {name: '9' }).click()
    await page.getByRole('button', {name: '/' }).click()
    await page.getByRole('button', {name: '3' }).click()

    const [response] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/v1/div/')),
      page.getByRole('button', { name: '=' }).click()
    ]);

    const { result } = await response.json();
    expect(result).toBe(3);

    await expect(page.getByTestId('display')).toHaveValue(/3/)

    const operation = await Operation.findOne({
      where: {
        name: "DIV"
      }
    });

    const historyEntry = await History.findOne({
      where: { OperationId: operation.id }
    })

    expect(historyEntry.firstArg).toEqual(9)
    expect(historyEntry.secondArg).toEqual(3)
    expect(historyEntry.result).toEqual(3)

  })

  

  //Deberia borrar el contenido del display al pulsar el boton C
  test('Deberia limpiar el display al pulsar el boton C', async ({ page }) => {
    await page.goto('./');

    await page.getByRole('button', { name: '7' }).click();
    expect(page.getByTestId('display')).toHaveValue(/7/);

    await page.getByRole('button', { name: 'c' }).click(); 
    await expect(page.getByTestId('display')).toHaveValue('');
  });
  

  test('Deberia poder realizar una multiplicacion', async ({ page }) => {
    await page.goto('./');
    await page.getByRole('button', { name: '2', exact:true}).click()
    await page.getByRole('button', { name: '*' }).click()
    await page.getByRole('button', { name: '5' }).click()

    const [response] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/v1/mul/')),
      page.getByRole('button', { name: '=' }).click()
    ]);

    const { result } = await response.json();
    expect(result).toBe(10);

    await expect(page.getByTestId('display')).toHaveValue(/10/)

    const operation = await Operation.findOne({
      where: {
        name: "MUL"
      }
    });

    const historyEntry = await History.findOne({
      where: { OperationId: operation.id }
    })

    expect(historyEntry.firstArg).toEqual(2)
    expect(historyEntry.secondArg).toEqual(5)
    expect(historyEntry.result).toEqual(10)
  });

  //No debería de dividir por cero 0
  test('No debería dividir por 0', async ({ page }) => {
    await page.goto('./');

    await page.getByRole('button', {name: '5' }).click()
    await page.getByRole('button', {name: '/' }).click()
    await page.getByRole('button', {name: '0' }).click()

    const [response] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/v1/div/')),
      page.getByRole('button', { name: '=' }).click()
    ]);

    const { result } = await response.json();
    //Esperamos un elemento de tipo undefined porque el controller solamente devuelve un message y no un result
    expect(result).toBe(undefined);
    //Debido al undefined en el result comprobamos que se haya realizado la función mediante el retorno del display
    await expect(page.getByTestId('display')).toHaveValue(/Math Error/)

  })

})
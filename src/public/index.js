const $display = document.querySelector('.display')
const $buttons = document.querySelector('.buttons')

const operations = ['-','^2','*'];

let currentDisplay = "";
let operation = null;
let reset = false;

let unused;

$buttons.addEventListener('click', async (e) => {
    const nextAction = e.target.name

    nextAction === "c" ? reset = true : ""

    if (nextAction === "=") {
        const [firstArg, secondArg] = currentDisplay.split(operation)

        let result;

        if (operation === "-") {
            result = await calculateSub(firstArg, secondArg)
        } else if (operation === '^2'){
            result = await calculatePow(firstArg)
            result > 100000 ? result = "Error: Valor muy grande" : ""
        }
        if (operation === "*") {
            result = await calculateMul(firstArg, secondArg)
        }
        reset = true;
        return renderDisplay(result);
    }

    if (operations.includes(nextAction)) {
        operation = nextAction;
    }

    if (reset) {
        reset = false;
        operation = null;
        renderDisplay("");
    } else {
        renderDisplay(currentDisplay + nextAction);
    }
})

async function calculateSub(firstArg, secondArg) {
    const resp = await fetch(`/api/v1/sub/${firstArg}/${secondArg}`)
    const { result } = await resp.json();

    return result;
}
async function calculateMul(firstArg, secondArg) {
    const resp = await fetch(`/api/v1/mul/${firstArg}/${secondArg}`)
    const { result } = await resp.json();

    return result;
}
async function calculatePow(firstArg) {
    const resp = await fetch(`/api/v1/pow/${firstArg}`)
    const { result } = await resp.json();

    return result;
}

function renderDisplay(chars) {
    currentDisplay = chars;
    $display.value = chars;
}

function rerender() { }

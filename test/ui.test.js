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
})
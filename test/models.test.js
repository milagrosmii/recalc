const { seed } = require('../src/seed.js')
const {
    createHistoryEntry,
    History,
    Operation
} = require('../src/models.js')

beforeEach(async () => {
    await seed()
})

describe("History", () => {
    test("Deberia poder crear una resta en el history", async () => {
        await createHistoryEntry({
            firstArg: 2,
            secondArg: 2,
            result: 0,
            operationName: "SUB"
        })

        const histories = await History.findAll({
            include: [Operation]
        })

        expect(histories.length).toEqual(1)
        expect(histories[0].firstArg).toEqual(2)
        expect(histories[0].result).toEqual(0)
        expect(histories[0].Operation.name).toEqual("SUB")
    })

    test("Debería poder crear una división en el history", async() => {
      await createHistoryEntry({
        firstArg: 27,
        secondArg: 3,
        result: 9,
        operationName: "DIV"
      })

      const entries = await History.findAll({
        include: [Operation]
      })

      expect(entries.length).toEqual(9)
      expect(entries[0].firstArg).toEqual(27)
      expect(entries[0].secondArg).toEqual(3)
      expect(entries[0].result).toEqual(9)
      expect(entries[0].Operation.name).toEqual()

    })
})

const mockInput = require("./mocks/test-json")
const processRunnerQuestionnaire = require("./processRunnerQuestionnaire")

const mockRequest = () => {
  const req = {}
  return req
}

const mockResponse = () => {
  const res = {
    locals: {
      questionnaire: mockInput
    }
  }
  return res
}

describe("testing processQuestionnaire", () => {
  let res, req
  const next = jest.fn()

  beforeAll(() => {
    req = mockRequest()
    res = mockResponse()
  })

  it(`should return a json object matching snapshot`, async () => {
    processRunnerQuestionnaire(req, res, next)
    expect(res.locals.questions).toMatchSnapshot()
  })
})

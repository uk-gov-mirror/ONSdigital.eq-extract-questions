const mockInput = require("./mocks/test-json")
const processQuestionnaire = require("./processQuestionnaire")

const mockRequest = () => {
    const req = {
      files: {
        jsonFile: {
            data: JSON.stringify(mockInput)
        }
      }
    }
    return req
  }

const mockResponse = () => {
    const res = {
        locals: {}
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
        processQuestionnaire(req, res, next)
        expect(res.locals.questions).toMatchSnapshot()
    })
  
  })
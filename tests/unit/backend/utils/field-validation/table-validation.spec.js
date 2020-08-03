const validateField = require('../../../../../dist/backend/app/utils/field-validation')
describe('Table validation', () => {
  const makeTableField = (fieldId, columns, rowsOptions) => {
    const table = {
      _id: fieldId,
      fieldType: 'table',
      required: true,
      columns,
      addMoreRows: false,
      minimumRows: 1,
      maximumRows: null,
      ...rowsOptions,
    }
    return table
  }
  const makeDropdownColumn = (fieldOptions, options) => {
    return {
      columnType: 'dropdown',
      required: true,
      _id: '5dd6488dae2ba0d11f2e6e30',
      fieldOptions,
      ...options,
    }
  }
  const makeTextFieldColumn = (options) => {
    return {
      columnType: 'textfield',
      required: true,
      _id: '5dd64c2497d7540392def29c',
      ...options,
    }
  }
  const makeTableResponse = (fieldId, answerArray) => {
    const response = {
      _id: fieldId,
      fieldType: 'table',
      answerArray,
      isVisible: true,
    }
    return response
  }
  const formId = '5dd3b0bd3fbe670012fdf23f'
  const fieldId = '5ad072e3d9a3d4000f2c77c8'
  describe('Dropdown column', () => {
    it('should disallow empty submissions if columns are required', () => {
      const fieldOptions = ['a', 'b', 'c']
      const columns = [makeDropdownColumn(fieldOptions)]
      const formField = makeTableField(fieldId, columns)
      const response = makeTableResponse(fieldId, [['']])
      const testFunc = () => validateField(formId, formField, response)
      expect(testFunc).toThrow()
    })
    it('should allow empty submissions for optional columns', () => {
      const fieldOptions = ['a', 'b', 'c']
      const columns = [makeDropdownColumn(fieldOptions, { required: false })]
      const formField = makeTableField(fieldId, columns)
      const response = makeTableResponse(fieldId, [['']])
      const testFunc = () => validateField(formId, formField, response)
      expect(testFunc).not.toThrow()
    })
    it('should allow valid submission for dropdown column', () => {
      const fieldOptions = ['a', 'b', 'c']
      const columns = [makeDropdownColumn(fieldOptions)]
      const formField = makeTableField(fieldId, columns)
      const response = makeTableResponse(fieldId, [['a']])
      const testFunc = () => validateField(formId, formField, response)
      expect(testFunc).not.toThrow()
    })
    it('should disallow values not found in field options for dropdown column', () => {
      const fieldOptions = ['a', 'b', 'c']
      const columns = [makeDropdownColumn(fieldOptions)]
      const formField = makeTableField(fieldId, columns)
      const response = makeTableResponse(fieldId, [['x']])
      const testFunc = () => validateField(formId, formField, response)
      expect(testFunc).toThrow()
    })
  })
  describe('Textfield column', () => {
    it('should disallow empty submissions if columns are required', () => {
      const columns = [makeTextFieldColumn()]
      const formField = makeTableField(fieldId, columns)
      const response = makeTableResponse(fieldId, [['']])
      const testFunc = () => validateField(formId, formField, response)
      expect(testFunc).toThrow()
    })
    it('should allow empty submissions for optional columns', () => {
      const columns = [makeTextFieldColumn({ required: false })]
      const formField = makeTableField(fieldId, columns)
      const response = makeTableResponse(fieldId, [['']])
      const testFunc = () => validateField(formId, formField, response)
      expect(testFunc).not.toThrow()
    })
    it('should allow valid submission for textfield column', () => {
      const columns = [makeTextFieldColumn()]
      const formField = makeTableField(fieldId, columns)
      const response = makeTableResponse(fieldId, [['hello']])
      const testFunc = () => validateField(formId, formField, response)
      expect(testFunc).not.toThrow()
    })
  })
  describe('Multiple columns and rows', () => {
    it('should allow valid submissions for multiple columns', () => {
      const fieldOptions = ['a', 'b', 'c']
      const columns = [makeDropdownColumn(fieldOptions), makeTextFieldColumn()]
      const formField = makeTableField(fieldId, columns)
      const response = makeTableResponse(fieldId, [['a', 'hello']])
      const testFunc = () => validateField(formId, formField, response)
      expect(testFunc).not.toThrow()
    })
    it('should disallow input with number of columns that do not match', () => {
      // WRONG
      const fieldOptions = ['a', 'b', 'c']
      const columns = [
        makeDropdownColumn(fieldOptions),
        makeTextFieldColumn(),
        makeTextFieldColumn(),
      ]
      const formField = makeTableField(fieldId, columns)
      const response = makeTableResponse(fieldId, [
        ['a', 'text1', 'text2', 'text3'],
      ])
      const testFunc = () => validateField(formId, formField, response)
      expect(testFunc).toThrow()
    })
    it('should allow valid submissions for multiple rows', () => {
      const fieldOptions = ['a', 'b', 'c']
      const columns = [makeDropdownColumn(fieldOptions), makeTextFieldColumn()]
      const formField = makeTableField(fieldId, columns, { minimumRows: 2 })
      const response = makeTableResponse(fieldId, [
        ['a', 'hello'],
        ['b', 'world'],
      ])
      const testFunc = () => validateField(formId, formField, response)
      expect(testFunc).not.toThrow()
    })
    it('should disallow invalid submissions for multiple rows', () => {
      const fieldOptions = ['a', 'b', 'c']
      const columns = [makeDropdownColumn(fieldOptions), makeTextFieldColumn()]
      const formField = makeTableField(fieldId, columns, { minimumRows: 2 })
      const response = makeTableResponse(fieldId, [
        ['a', 'hello'],
        ['x', 'world'],
      ]) // Invalid dropdown value for second row
      const testFunc = () => validateField(formId, formField, response)
      expect(testFunc).toThrow()
    })
  })
  describe('Number of rows', () => {
    it('should disallow submissions with fewer than min rows', () => {
      const columns = [makeTextFieldColumn()]
      const formField = makeTableField(fieldId, columns, { minimumRows: 3 })
      const response = makeTableResponse(fieldId, Array(2).fill(['hello']))
      const testFunc = () => validateField(formId, formField, response)
      expect(testFunc).toThrow()
    })
    it('should disallow submissions with more rows than min rows if addMoreRows is not set ', () => {
      const isLogic = false
      const columns = [makeTextFieldColumn()]
      const formField = makeTableField(fieldId, columns, { minimumRows: 3 })
      const response = makeTableResponse(fieldId, Array(4).fill(['hello']))
      const testFunc = () => validateField(formId, formField, response, isLogic)
      expect(testFunc).toThrow()
    })
    it('should disallow submissions with more than max rows if max rows is set and addMoreRows is configured for that field', () => {
      const columns = [makeTextFieldColumn()]
      const formField = makeTableField(fieldId, columns, {
        maximumRows: 3,
        addMoreRows: true,
      })
      const response = makeTableResponse(fieldId, Array(100).fill(['hello']))
      const testFunc = () => validateField(formId, formField, response)
      expect(testFunc).toThrow()
    })
    it('should allow submissions with unlimited rows if max rows is not set and addMoreRows is configured for that field ', () => {
      const columns = [makeTextFieldColumn()]
      const formField = makeTableField(fieldId, columns, {
        maximumRows: null,
        addMoreRows: true,
      })
      const response = makeTableResponse(fieldId, Array(100).fill(['hello']))
      const testFunc = () => validateField(formId, formField, response)
      expect(testFunc).not.toThrow()
    })
  })
  describe('Invalid input', () => {
    it('should disallow null input', () => {
      const columns = [makeTextFieldColumn()]
      const formField = makeTableField(fieldId, columns)
      const response = makeTableResponse(fieldId, null)
      const testFunc = () => validateField(formId, formField, response)
      expect(testFunc).toThrow()
    })
  })
})

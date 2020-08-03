// Exports data for a form containing all basic field types, where all the fields are
// hidden due to logic depending on the value of the first field.

const { allFields } = require('./all-fields')
const {
  getBlankVersion,
  getHiddenVersion,
  makeField,
  listIntsInclusive,
} = require('./util')
const shownFields = [
  {
    title: 'Yes/No',
    fieldType: 'yes_no',
    val: 'No',
  },
].map(makeField)
const hiddenFields = allFields.map((field) =>
  getHiddenVersion(getBlankVersion(field)),
)

const hiddenFieldsLogicData = [
  {
    showFieldIndices: listIntsInclusive(
      shownFields.length,
      shownFields.length + hiddenFields.length - 1,
    ),
    conditions: [
      {
        fieldIndex: 0,
        state: 'is equals to',
        value: 'Yes',
        ifValueType: 'single-select',
      },
    ],
    logicType: 'showFields',
  },
]
const hiddenFieldsData = [...shownFields, ...hiddenFields]

module.exports = {
  hiddenFieldsData,
  hiddenFieldsLogicData,
}

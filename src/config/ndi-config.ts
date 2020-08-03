// Mapping between form field types and MyInfo field types
// TODO: childrenbirthrecords, relationships
export const FIELD_MAPPING = {
  dropdown: [
    'sex',
    'race',
    'dialect',
    'nationality',
    'birthcountry',
    'secondaryrace',
    'residentialstatus',
    'housingtype',
    'hdbtype',
    'marital',
    'edulevel',
    'countryofmarriage',
    'workpassstatus',
    'householdincome',
    'schoolname',
    'occupation',
  ],
  textfield: [
    'name',
    'marriedname',
    'hanyupinyinname',
    'aliasname',
    'hanyupinyinaliasname',
    'passportnumber',
    'regadd',
    'mailadd',
    'billadd',
    'employment',
    'vehno',
    'marriagecertno',
  ],
  mobile: ['mobileno'],
  homeno: ['homeno'],
  date: [
    'dob',
    'passportexpirydate',
    'marriagedate',
    'divorcedate',
    'workpassexpirydate',
  ],
  number: ['gradyear'],
}

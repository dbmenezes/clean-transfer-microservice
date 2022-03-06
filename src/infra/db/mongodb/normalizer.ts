
export const normalize = (mongodbObject): any => {
  delete mongodbObject._id
  delete mongodbObject.__v
  console.log('NORMALIZE', mongodbObject)
  return mongodbObject
}

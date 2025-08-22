import { FieldHook } from 'payload'

export const afterChangeFieldHook: FieldHook = async ({
  collection,
  data,
  operation,
  originalDoc,
  overrideAccess,
  field,
  findMany,
  path,
  previousDoc,
  previousValue,
  value,
  req,
  context,
  previousSiblingDoc,
  schemaPath,
  siblingDocWithLocales
}) => {
  if (operation === 'create') {
    //
    if (previousValue === value) {
      // do notinhg
    } else if (previousValue !== value) {
      // do something else
    }
  } else if (operation === 'update') {
    //
  }
}

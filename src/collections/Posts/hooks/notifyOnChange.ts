import { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

export const notifyOnChange: CollectionAfterChangeHook = async ({
  collection,
  doc,
  previousDoc,
  req: { context, payload },
  operation,
}) => {
  const sendEmail = async () => {
    try {
      await payload.sendEmail({
        to: process.env.EMAIL || '',
        subject: `Change made in ${collection.slug}`,
        text: `A change was made in the ${collection.slug} collection.`,
      })
    } catch (err) {
      console.error({ err }, 'Failed to send afterChange email')
    }
  }

  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      console.log(
        `A change was made in the ${collection.slug} collection. Operation: ${operation}`,
      )
      await sendEmail()
    }
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      console.log(
        `A change was made in the ${collection.slug} collection. Operation: ${operation}`,
      )
      await sendEmail()
    }
  }
  return doc
}

export const notifyOnDelete: CollectionAfterDeleteHook = async ({
  collection,
  doc,
  req: { context, payload },
}) => {

    const sendEmail = async () => {
    try {
      await payload.sendEmail({
        to: process.env.EMAIL || '',
        subject: `Deletion made in ${collection.slug}`,
        text: `Something was deleted in the ${collection.slug} collection.`,
      })
    } catch (err) {
      console.error({ err }, 'Failed to send afterChange email')
    }
  }

  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      console.log(`Something was deleted in the ${collection.slug} collection.`)
      await sendEmail()
    }
  }
  return doc
}


import {
  MigrateDownArgs,
  MigrateUpArgs,
  sql,
} from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "categories" ADD COLUMN "slug" varchar;`)

  await db.execute(sql`
    ALTER TABLE "categories"
    ADD COLUMN "slug_lock" boolean DEFAULT true;`)

  await db.execute(sql`
    UPDATE "categories"
    SET "slug" = 'slugpardefaut'
    WHERE "slug" IS NULL;`)

  await db.execute(sql`
    ALTER TABLE "categories"
    ALTER COLUMN "slug" SET NOT NULL;`)

  await db.execute(sql`
CREATE INDEX IF NOT EXISTS "categories_slug_idx" ON "categories" USING btree ("slug");`)
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "categories_slug_idx";`)

  await db.execute(sql`

  ALTER TABLE "categories" DROP COLUMN "slug";`)

  await db.execute(sql`
  ALTER TABLE "categories" DROP COLUMN "slug_lock";`)
}

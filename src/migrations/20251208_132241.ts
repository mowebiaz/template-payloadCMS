import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "categories" ADD COLUMN "slug" varchar NOT NULL;
  ALTER TABLE "categories" ADD COLUMN "slug_lock" boolean DEFAULT true;
  CREATE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "categories_slug_idx";
  ALTER TABLE "categories" DROP COLUMN "slug";
  ALTER TABLE "categories" DROP COLUMN "slug_lock";`)
}

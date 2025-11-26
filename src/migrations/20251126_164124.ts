import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "search_results_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"relation_to" varchar,
  	"category_i_d" varchar,
  	"title" varchar
  );
  
  ALTER TABLE "media" ADD COLUMN "caption" jsonb;
  ALTER TABLE "search_results" ADD COLUMN "plaintext" varchar;
  ALTER TABLE "search_results" ADD COLUMN "cover_image_id" integer;
  ALTER TABLE "search_results" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "search_results_categories" ADD CONSTRAINT "search_results_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."search_results"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "search_results_categories_order_idx" ON "search_results_categories" USING btree ("_order");
  CREATE INDEX "search_results_categories_parent_id_idx" ON "search_results_categories" USING btree ("_parent_id");
  ALTER TABLE "search_results" ADD CONSTRAINT "search_results_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "search_results_slug_idx" ON "search_results" USING btree ("slug");
  CREATE INDEX "search_results_cover_image_idx" ON "search_results" USING btree ("cover_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "search_results_categories" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "search_results_categories" CASCADE;
  ALTER TABLE "search_results" DROP CONSTRAINT "search_results_cover_image_id_media_id_fk";
  
  DROP INDEX "search_results_slug_idx";
  DROP INDEX "search_results_cover_image_idx";
  ALTER TABLE "media" DROP COLUMN "caption";
  ALTER TABLE "search_results" DROP COLUMN "plaintext";
  ALTER TABLE "search_results" DROP COLUMN "cover_image_id";
  ALTER TABLE "search_results" DROP COLUMN "meta_description";`)
}

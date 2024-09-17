CREATE TABLE IF NOT EXISTS "api_documentation" (
	"id" text PRIMARY KEY NOT NULL,
	"scrape_id" text NOT NULL,
	"title" text NOT NULL,
	"overview" text NOT NULL,
	"base_url" text NOT NULL,
	"version" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chat_session" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"started_at" timestamp DEFAULT now() NOT NULL,
	"ended_at" timestamp,
	"prompt" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "endpoint" (
	"id" text PRIMARY KEY NOT NULL,
	"doc_id" text NOT NULL,
	"path" text NOT NULL,
	"operation_id" text NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "http_method" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "message" (
	"id" text PRIMARY KEY NOT NULL,
	"session_id" text NOT NULL,
	"sender" text NOT NULL,
	"content" text NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "scrape_session" (
	"id" text PRIMARY KEY NOT NULL,
	"session_id" text NOT NULL,
	"url" text NOT NULL,
	"scraped_content" text NOT NULL,
	"scraped_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "api_documentation" ADD CONSTRAINT "api_documentation_scrape_id_scrape_session_id_fk" FOREIGN KEY ("scrape_id") REFERENCES "public"."scrape_session"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chat_session" ADD CONSTRAINT "chat_session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "endpoint" ADD CONSTRAINT "endpoint_doc_id_api_documentation_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."api_documentation"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "endpoint" ADD CONSTRAINT "endpoint_operation_id_http_method_id_fk" FOREIGN KEY ("operation_id") REFERENCES "public"."http_method"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "message" ADD CONSTRAINT "message_session_id_chat_session_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."chat_session"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scrape_session" ADD CONSTRAINT "scrape_session_session_id_chat_session_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."chat_session"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

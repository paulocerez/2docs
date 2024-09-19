ALTER TABLE "authenticator" DROP CONSTRAINT "authenticator_userId_credentialID_pk";--> statement-breakpoint
ALTER TABLE "authenticator" ADD COLUMN "id" text PRIMARY KEY NOT NULL;
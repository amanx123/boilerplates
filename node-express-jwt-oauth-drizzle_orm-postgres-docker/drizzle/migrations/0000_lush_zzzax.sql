CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(50) NOT NULL,
	"name" varchar(100) NOT NULL,
	"profile_picture" text,
	"email" varchar(100) NOT NULL,
	"password" text NOT NULL,
	"googleId" varchar,
	"about" text,
	"bio" text,
	"profession" varchar(100),
	"instagram_profile" text,
	"location" varchar(100),
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_googleId_unique" UNIQUE("googleId")
);

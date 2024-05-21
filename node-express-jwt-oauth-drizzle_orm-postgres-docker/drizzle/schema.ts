import {
  pgTable,
  serial,
  varchar,
  text,
  uniqueIndex,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  name: varchar("name", { length: 100 }).notNull(),
  profilePicture: text("profile_picture"),
  email: varchar("email", { length: 100 }).notNull().unique(),
  password: text("password").notNull(),
  googleId: varchar("googleId").unique(),
  about: text("about"),
  bio: text("bio"),
  profession: varchar("profession", { length: 100 }),
  instagramProfile: text("instagram_profile"),
  location: varchar("location", { length: 100 }),
});

// export const followers = pgTable(
//   "followers",
//   {
//     userId: serial("userId")
//       .references(() => users.id)
//       .primaryKey(),
//     followerId: serial("followerId")
//       .references(() => users.id)
//       .primaryKey(),
//   },
//   (table) => ({
//     pk: uniqueIndex("followers_pk").on(table.userId, table.followerId),
//   })
// );

// export const trips = pgTable("trips", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   title: varchar("title", { length: 100 }).notNull(),
//   shortDescription: text("short_description"),
//   numberOfDays: serial("number_of_days").notNull(),
//   summary: text("summary"),
//   itinerary: text("itinerary"),
//   inclusions: text("inclusions"),
//   exclusions: text("exclusions"),
//   startingDestination: varchar("starting_destination", { length: 100 }),
//   endingDestination: varchar("ending_destination", { length: 100 }),
//   price: serial("price"),
//   discount: serial("discount"),
//   photos: text("photos").array(),
// });

// export const userTrips = pgTable(
//   "userTrips",
//   {
//     userId: serial("userId")
//       .references(() => users.id)
//       .primaryKey(),
//     tripId: serial("tripId")
//       .references(() => trips.id)
//       .primaryKey(),
//   },
//   (table) => ({
//     pk: uniqueIndex("user_trips_pk").on(table.userId, table.tripId),
//   })
// );

// export const posts = pgTable("posts", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   userId: serial("userId").references(() => users.id),
//   text: text("text"),
//   photo: text("photo"),
//   category: varchar("category", { length: 20 }).notNull(),
//   feedLocation: varchar("feedLocation", { length: 100 }),
//   userLocation: varchar("userLocation", { length: 100 }),
//   createdAt: timestamp("createdAt").defaultNow(),
// });

// export const postInterests = pgTable(
//   "postInterests",
//   {
//     postId: serial("postId")
//       .references(() => posts.id)
//       .primaryKey(),
//     userId: serial("userId")
//       .references(() => users.id)
//       .primaryKey(),
//   },
//   (table) => ({
//     pk: uniqueIndex("post_interests_pk").on(table.postId, table.userId),
//   })
// );

// export const comments = pgTable("comments", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   postId: serial("postId").references(() => posts.id),
//   userId: serial("userId").references(() => users.id),
//   text: text("text"),
//   createdAt: timestamp("createdAt").defaultNow(),
// });

// export const tripEnrollments = pgTable(
//   "tripEnrollments",
//   {
//     tripId: serial("tripId").references(() => trips.id),
//     userId: serial("userId").references(() => users.id),
//     transactionId: varchar("transactionId", { length: 100 }).notNull().unique(),
//   },
//   (table) => ({
//     pk: uniqueIndex("trip_enrollments_pk").on(table.tripId, table.userId),
//   })
// );

// export const tripChats = pgTable("tripChats", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   tripId: serial("tripId").references(() => trips.id),
//   userId: serial("userId").references(() => users.id),
//   message: text("message"),
//   createdAt: timestamp("createdAt").defaultNow(),
// });

// export const feeds = pgTable("feeds", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   postId: serial("postId").references(() => posts.id),
//   location: varchar("location", { length: 100 }),
//   createdAt: timestamp("createdAt").defaultNow(),
// });

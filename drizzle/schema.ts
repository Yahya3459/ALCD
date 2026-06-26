import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
  jsonb,
  serial,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: varchar("role", { length: 20 }).default("user").notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn", { withTimezone: true }).defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// جدول المديرين
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 64 }).notNull().unique(),
  passwordHash: varchar("passwordHash", { length: 255 }).notNull(),
  role: varchar("role", { length: 20 }).default("admin").notNull(),
  isSuperAdmin: integer("isSuperAdmin").default(0).notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
});

export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = typeof adminUsers.$inferInsert;

// جدول طلبات التسجيل
export const registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),
  offerIndex: integer("offerIndex").notNull(),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  email: varchar("email", { length: 320 }),
  notes: text("notes"),
  status: varchar("status", { length: 20 }).default("pending").notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow().notNull(),
});

export type Registration = typeof registrations.$inferSelect;
export type InsertRegistration = typeof registrations.$inferInsert;

// جدول طلبات الشهادات
export const certificateRequests = pgTable("certificate_requests", {
  id: serial("id").primaryKey(),
  courseName: varchar("courseName", { length: 255 }).notNull(),
  fullNameAr: varchar("fullNameAr", { length: 255 }).notNull(),
  fullNameEn: varchar("fullNameEn", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  birthPlace: varchar("birthPlace", { length: 255 }).notNull(),
  birthDate: varchar("birthDate", { length: 50 }).notNull(),
  gender: varchar("gender", { length: 20 }).notNull(),
  idCardUrl: varchar("idCardUrl", { length: 500 }),
  grades: jsonb("grades"),
  finalGrade: varchar("finalGrade", { length: 50 }),
  average: varchar("average", { length: 50 }),
  total: varchar("total", { length: 50 }),
  status: varchar("status", { length: 20 }).default("pending").notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow().notNull(),
});

export type CertificateRequest = typeof certificateRequests.$inferSelect;
export type InsertCertificateRequest = typeof certificateRequests.$inferInsert;

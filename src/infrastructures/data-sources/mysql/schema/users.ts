import { date, text, index, mysqlTable, varchar, datetime } from 'drizzle-orm/mysql-core'
import { relations } from 'drizzle-orm'
import { ulid } from 'ulidx'
import { auditableAtColumns, auditableByColumns, softDelete } from './auditable'

export const roles = mysqlTable('roles', {
  id: varchar('id', { length: 32 })
    .primaryKey()
    .$defaultFn(() => ulid()),
  name: varchar('name', { length: 32 }).notNull(),
  description: varchar('description', { length: 128 }),
  label: varchar('label', { length: 24 }).notNull(),
  type: varchar('type', { length: 24 }),
  ...auditableAtColumns,
  ...auditableByColumns,
})

export const permissions = mysqlTable('permissions', {
  id: varchar('id', { length: 32 })
    .primaryKey()
    .$defaultFn(() => ulid()),
  can: varchar('can', { length: 16 }).notNull(),
  resource: varchar('resource', { length: 32 }).notNull(),
  ...auditableAtColumns,
  ...auditableByColumns,
})

export const users = mysqlTable(
  'users',
  {
    id: varchar('id', { length: 32 })
      .primaryKey()
      .$defaultFn(() => ulid()),
    fullName: varchar('full_name', { length: 64 }).notNull(),
    email: varchar('email', { length: 128 }).unique().notNull(),
    password: varchar('password', { length: 128 }).notNull(),
    phone: varchar('phone_number', { length: 18 }).unique().notNull(),
    dob: date('dob').notNull(),
    emailVerifiedAt: datetime('email_verified_at'),
    phoneVerifiedAt: datetime('phone_verified_at'),
    gender: varchar('gender', { length: 128, enum: ['male', 'female'] }).notNull(),
    ...auditableAtColumns,
    ...auditableByColumns,
    ...softDelete,
  },
  (table) => ({
    dobIdx: index('dob_idx').on(table.dob),
  }),
)

export const userProfiles = mysqlTable('user_profiles', {
  id: varchar('id', { length: 32 })
    .primaryKey()
    .$defaultFn(() => ulid()),
  userId: varchar('user_id', { length: 32 })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  picture: varchar('picture', { length: 512 }),
  address: text('address'),
  ...auditableAtColumns,
  ...auditableByColumns,
})

export const userRoles = mysqlTable('user_roles', {
  id: varchar('id', { length: 32 })
    .primaryKey()
    .$defaultFn(() => ulid()),
  userId: varchar('user_id', { length: 32 })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  roleId: varchar('role_id', { length: 32 })
    .notNull()
    .references(() => roles.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  ...auditableAtColumns,
  ...auditableByColumns,
})

export const usersPermissions = mysqlTable('user_permissions', {
  id: varchar('id', { length: 32 })
    .primaryKey()
    .$defaultFn(() => ulid()),
  userId: varchar('user_id', { length: 32 })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  permissionId: varchar('permission_id', { length: 32 })
    .notNull()
    .references(() => permissions.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  ...auditableAtColumns,
  ...auditableByColumns,
})

export const rolesPermissions = mysqlTable('role_permissions', {
  id: varchar('id', { length: 32 })
    .primaryKey()
    .$defaultFn(() => ulid()),
  roleId: varchar('role_id', { length: 32 })
    .notNull()
    .references(() => roles.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  permissionId: varchar('permission_id', { length: 32 })
    .notNull()
    .references(() => permissions.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  ...auditableAtColumns,
  ...auditableByColumns,
})

export const usersToRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(users, {
    fields: [userRoles.userId],
    references: [users.id],
  }),
  role: one(roles, {
    fields: [userRoles.roleId],
    references: [roles.id],
  }),
}))

export const usersToPermissionsRelations = relations(usersPermissions, ({ one }) => ({
  user: one(users, {
    fields: [usersPermissions.userId],
    references: [users.id],
  }),
  permission: one(permissions, {
    fields: [usersPermissions.permissionId],
    references: [permissions.id],
  }),
}))

export const rolesToPermissionsRelations = relations(rolesPermissions, ({ one }) => ({
  role: one(users, {
    fields: [rolesPermissions.roleId],
    references: [users.id],
  }),
  permission: one(permissions, {
    fields: [rolesPermissions.permissionId],
    references: [permissions.id],
  }),
}))

export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(userProfiles),
  roles: many(userRoles),
  permissions: many(usersPermissions),
}))

export const userProfilesRelations = relations(userProfiles, ({ one }) => ({
  user: one(users, {
    fields: [userProfiles.userId],
    references: [users.id],
  }),
}))

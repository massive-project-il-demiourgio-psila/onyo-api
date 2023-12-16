import { boolean, int, json, mysqlTable, varchar, year } from 'drizzle-orm/mysql-core'
import { ulid } from 'ulidx'

export const vehicleMakes = mysqlTable('vehicle_makes', {
  id: varchar('id', { length: 32 })
    .primaryKey()
    .$defaultFn(() => ulid()),
  name: varchar('name', { length: 32 }).notNull(),
  slug: varchar('slug', { length: 32 }).notNull(),
  logo: varchar('logo', { length: 256 }),
  vehicleCount: int('vehicle_count').default(0),
  vehicleModelCount: int('vehicle_model_count').default(0),
  isActive: boolean('is_active').default(true),
})

export const vehicleClassifications = mysqlTable('vehicle_classifications', {
  id: varchar('id', { length: 32 }).primaryKey(), // use slug as id
  name: varchar('name', { length: 32 }).notNull(),
  abbrv: varchar('abbrv', { length: 24 }),
  description: varchar('description', { length: 255 }).notNull(),
  // slug: varchar('slug', { length: 32 }).notNull(),
  isActive: boolean('is_active').default(true),
})

export const vehicleModels = mysqlTable('vehicle_models', {
  id: varchar('id', { length: 32 })
    .primaryKey()
    .$defaultFn(() => ulid()),
  makeId: varchar('make_id', { length: 32 }).references(() => vehicleMakes.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  name: varchar('name', { length: 32 }).notNull(),
  slug: varchar('slug', { length: 32 }).notNull(),
  vehicleCount: int('vehicle_count').default(0),
  isActive: boolean('is_active').default(true),
  refImagePath: varchar('reference_image_path', { length: 256 }),
})

export const fuelTypes = mysqlTable('fuel_types', {
  id: varchar('id', { length: 32 }).primaryKey(), // use slug as id
  name: varchar('name', { length: 32 }).notNull(),
  category: varchar('category', { length: 32, enum: ['diesel', 'gasoline', 'electric'] }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
})

export const vehicles = mysqlTable('vehicles', {
  id: varchar('id', { length: 32 })
    .primaryKey()
    .$defaultFn(() => ulid()),
  makeId: varchar('make_id', { length: 32 }).references(() => vehicleMakes.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  classificationId: varchar('classification_id', { length: 32 })
    .notNull()
    .references(() => vehicleClassifications.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  modelId: varchar('model_id', { length: 32 })
    .notNull()
    .references(() => vehicleModels.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  fuelTypeId: varchar('fuel_type_id', { length: 32 })
    .notNull()
    .references(() => fuelTypes.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  dayAmount: int('per_day_amount'),
  hourAmount: int('per_hour_amount'),
  transmission: varchar('transmission', { enum: ['automatic', 'manual'], length: 24 })
    .notNull()
    .default('automatic'),
  noOfSeats: int('no_of_seats').notNull().default(2),
  year: year('year'),
  licensePlate: varchar('license_plate', { length: 12 }),
  availability: varchar('availability', { enum: ['available', 'rented', 'maintenance'], length: 12 })
    .notNull()
    .default('maintenance'),
  aircon: int('air_conditioner'), // (where 0 = doesn't exist AND 5 = like new)
  imagePath: varchar('image_path', { length: 512 }),
  images: json('images').$type<string[]>().default([]),
  extraAttrs: json('extra_attributes')
    .$type<VehicleExtraAttributes>()
    .default({ color: null, noOfDoors: 0, noOfAirbags: 0, noOfGears: 0 }),
})

type VehicleExtraAttributes = {
  color: string | null
  noOfDoors: number
  noOfGears: number
  noOfAirbags: number
}

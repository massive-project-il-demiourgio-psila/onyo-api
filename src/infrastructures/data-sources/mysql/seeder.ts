/* eslint-disable @typescript-eslint/no-unused-vars */
import slug from 'slug'
import drizzle from './drizzle'
import * as schema from './schema'

await drizzle
  .insert(schema.vehicleMakes)
  .values(
    ['Suzuki', 'Toyota', 'Daihatsu', 'Mitsubishi', 'Nissan', 'Honda'].map((make) => ({ name: make, slug: slug(make) })),
  )

const makeIds: string[] = (await drizzle.select({ id: schema.vehicleMakes.id }).from(schema.vehicleMakes)).map(
  (val) => val.id,
)

await drizzle.insert(schema.vehicleClassifications).values([
  {
    id: 'suv',
    name: 'SUV (Sport Utility Vehicle)',
    abbrv: 'SUV',
    description:
      'Kendaraan serbaguna yang dirancang untuk kemampuan off-road dan sering kali memiliki badan yang lebih besar dan ground clearance yang lebih tinggi.',
  },
  {
    id: 'mpv',
    name: 'MPV (Multi-Purpose Vehicle)',
    abbrv: 'MPV',
    description:
      'Juga dikenal sebagai minivan, kendaraan ini dirancang untuk mengangkut penumpang dan barang bawaan dengan efisien.',
  },
  {
    id: 'sedan',
    name: 'Sedan',
    abbrv: 'Sedan',
    description: 'Umumnya ditandai dengan konfigurasi empat pintu dan bagasi terpisah untuk barang bawaan.',
  },
  {
    id: 'hatchback',
    name: 'Hatchback',
    abbrv: 'Hatchback',
    description: 'Mobil kompak dengan pintu belakang yang terbuka ke atas, memberikan akses ke area bagasi.',
  },
  {
    id: 'electric-car',
    name: 'Mobil Listrik',
    abbrv: 'EV',
    description:
      'Ditenagai oleh motor listrik dan baterai, mobil ini tidak menghasilkan emisi dan dianggap ramah lingkungan.',
  },
  {
    id: 'off-road-4x4',
    name: 'Off-Road/4x4',
    abbrv: 'Off-Road/4x4',
    description: 'Dibangun untuk medan yang sulit dan pengemudi off-road, dengan kemampuan empat roda.',
  },
  {
    id: 'sports-car',
    name: 'Mobil Sport',
    abbrv: 'Sport',
    description: 'Dirancang untuk kinerja, dengan fokus pada kecepatan, kegesitan, dan pengalaman mengemudi dinamis.',
  },
  {
    id: 'coupe',
    name: 'Coupe',
    abbrv: 'Coupe',
    description: 'Umumnya mobil dua pintu dengan desain yang sporty, seringkali dengan atap yang melengkung.',
  },
  {
    id: 'convertible-roadster',
    name: 'Convertible/Roadster',
    abbrv: 'Convertible/Roadster',
    description: 'Mobil dengan atap yang dapat dilipat, memungkinkan pengalaman mengemudi tanpa atap.',
  },
  {
    id: 'crossover',
    name: 'Crossover',
    abbrv: 'Crossover',
    description: 'Menggabungkan fitur SUV dan sedan, crossover lebih kecil dan dibangun di atas platform mobil.',
  },
  {
    id: 'luxury-car',
    name: 'Mobil Mewah',
    abbrv: 'Mewah',
    description: 'Kendaraan kelas atas yang memprioritaskan kenyamanan, fitur canggih, dan bahan premium.',
  },
  {
    id: 'wagon',
    name: 'Wagon',
    abbrv: 'Wagon',
    description: 'Mirip dengan hatchback tetapi dengan bodi yang lebih panjang dan ruang bagasi yang lebih besar.',
  },
])

const classificationIds: string[] = (
  await drizzle.select({ id: schema.vehicleClassifications.id }).from(schema.vehicleClassifications)
).map((val) => val.id)

await drizzle.insert(schema.fuelTypes).values([
  {
    id: 'oktan-90',
    name: 'Oktan 90',
    category: 'gasoline',
    description: 'Pertamina: Pertamina Pertamax 90, Shell: Shell V-Power Racing 90',
  },
  {
    id: 'oktan-92',
    name: 'Oktan 92',
    category: 'gasoline',
    description: 'Pertamina: Pertamax, Shell: Shell Super, BP: RON 92',
  },
  {
    id: 'oktan-95',
    name: 'Oktan 95',
    category: 'gasoline',
    description: 'Pertamina: Pertamax Turbo, Shell: Shell V-Power',
  },
  {
    id: 'oktan-98',
    name: 'Oktan 98',
    category: 'gasoline',
    description: 'Total: Total Excellium 98, Shell: Shell V-Power Racing 98',
  },
  {
    id: 'solar',
    name: 'Solar',
    category: 'diesel',
    description: 'Pertamina: Solar Dex, Shell: Shell Diesel',
  },
  {
    id: 'elektrik',
    name: 'Elektrik',
    category: 'electric',
    description: 'Tesla Supercharger, Nissan: Nissan Leaf Charging Station',
  },
])

const fuelIds: string[] = (await drizzle.select({ id: schema.fuelTypes.id }).from(schema.fuelTypes)).map(
  (val) => val.id,
)

await drizzle.insert(schema.vehicleModels).values(
  [
    { makeId: makeIds[0], name: 'Ertiga' },
    { makeId: makeIds[0], name: 'XL7' },
    { makeId: makeIds[1], name: 'Innova' },
    { makeId: makeIds[1], name: 'Fortuner' },
    { makeId: makeIds[2], name: 'Terios' },
    { makeId: makeIds[2], name: 'Ayla' },
    { makeId: makeIds[3], name: 'Xpander' },
    { makeId: makeIds[3], name: 'Pajero Sport' },
    { makeId: makeIds[4], name: 'Livina' },
    { makeId: makeIds[4], name: 'Grand Livina' },
  ].map((model) => ({ makeId: model.makeId, name: model.name, slug: slug(model.name) })),
)

const modelIds: string[] = (await drizzle.select({ id: schema.vehicleModels.id }).from(schema.vehicleModels)).map(
  (val) => val.id,
)

const permissionCans = ['write', 'read', 'edit', 'delete']
const permissionResources = ['users', 'roles', 'drivers', 'permissions', 'vehicles', 'bookings']

async function insertPermissions() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const insertPromises: any[] = []

  permissionResources.forEach((resource) => {
    permissionCans.forEach((can) => {
      const promise = drizzle.insert(schema.permissions).values({
        can,
        resource,
      })
      insertPromises.push(promise)
    })
  })

  await Promise.all(insertPromises)
}

await insertPermissions()

await drizzle.insert(schema.roles).values([
  {
    name: 'user',
    description: 'regular user',
    label: 'User',
  },
  {
    name: 'superadmin',
    description: 'Super Admin has all permissions',
    label: 'Super Admin',
  },
  {
    name: 'admin',
    description: 'other admin with most permissions',
    label: 'Admin',
  },
  {
    name: 'receptionist',
    description: 'Receptionist',
    label: 'Receptionist',
  },
])

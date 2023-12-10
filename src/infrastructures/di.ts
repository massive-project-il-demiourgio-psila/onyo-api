import { container } from 'tsyringe'
import HelloWorldRepository from '@/infrastructures/repositories/hello-world.impl.repository'
import UserRepository from '@/infrastructures/repositories/user.impl.repository'
import pool from '@/infrastructures/data-sources/mysql/pool'
import drizzle from '@/infrastructures/data-sources/mysql/drizzle'
import { redis } from '@/infrastructures/data-sources/redis/client'
import DiTokens from './di-tokens'
import AuthRepository from './repositories/auth.impl.repository'
import VehicleRepository from './repositories/vehicle.impl.repository'
import BookingRepository from './repositories/booking.impl.repository'

export default function initContainerRegistry() {
  container
    .register(DiTokens.Pool, { useValue: pool })
    .register(DiTokens.Drizzle, { useValue: drizzle })
    .register(DiTokens.Redis, { useValue: redis })
    .register(DiTokens.HelloWorldRepository, { useClass: HelloWorldRepository })
    .register(DiTokens.AuthRepository, { useClass: AuthRepository })
    .register(DiTokens.UserRepository, { useClass: UserRepository })
    .register(DiTokens.VehicleRepository, { useClass: VehicleRepository })
    .register(DiTokens.BookingRepository, { useClass: BookingRepository })
  // RoleRepository
  // PermissionRepository
  return container
}

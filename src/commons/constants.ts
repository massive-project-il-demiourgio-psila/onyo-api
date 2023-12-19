// eslint-disable-next-line import/prefer-default-export
export class Paths {
  public static readonly VehicleModelRefImage = 'car-models'

  public static readonly VehicleMakeLogo = 'car-brand-logo'

  public static readonly DriverVerifiable = 'drivers/verifiable'

  public static readonly DriverKtp = `${Paths.DriverVerifiable}/idcard`

  public static readonly DriverSim = `${Paths.DriverVerifiable}/license`

  public static readonly PaymentProof = 'invoices/payment-proofs'
}

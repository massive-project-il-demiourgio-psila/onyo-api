/* eslint-disable import/prefer-default-export */
export function countDaysBetweenDates(date1: Date, date2: Date): number {
  // Convert both dates to milliseconds
  const time1 = date1.getTime()
  const time2 = date2.getTime()

  // Calculate the difference in milliseconds
  const timeDifference = Math.abs(time2 - time1)

  // Convert the time difference to days
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24))

  return daysDifference
}

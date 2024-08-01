export class InvalidStartDateError extends Error {
  constructor() {
    super('Start date should be less than end date.')
  }
}

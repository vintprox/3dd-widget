/**
 * Error that is being thrown because `widget` object is undefined.
 */
export default class NoWidgetError extends Error {
  constructor() {
    super('`widget` object is not defined at execution time. Make sure that script is imported as AMD module in 3DDashboard widget endpoint.');
    this.name = this.constructor.name;
  }
}

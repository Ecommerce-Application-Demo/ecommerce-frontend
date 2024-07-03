class CustomError extends Error {
  constructor(message, type) {
    super(message);
    this.name = this.constructor.name;
    this.type = type;
  }
}
  
module.exports = CustomError;
  
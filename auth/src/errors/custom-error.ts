//Abstract classesare used to set up requirements for subclasses
export abstract class CustomError extends Error {
  //a subclass must have this
  abstract statusCode: number;

  constructor(message: string) {
    //eqvalant to having throw new Error so to log our custom error we will pass message to super:Error
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  //just a method signature and return type of it
  abstract serializeErrors(): { message: string; field?: string }[];
}

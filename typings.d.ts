import Bluebird = require('bluebird');

declare module "*.json" {
  const value: any;
  export default value;
}

declare module "mongoose" {
  type Promise<T> = Bluebird<T>;
}

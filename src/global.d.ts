import { Connection, Promise } from "mongoose";

declare global {
  var mongoDbConnection: {
    conn: Connection | null,
    promise: Promise<Connection> | null
  }
}

export { }
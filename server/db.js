import mongoose from 'mongoose';

export function dbConfig() {
  mongoose.connect(process.env.DATABASE_URL)
    .then(
      (value) => {
        console.log("database connected");
      },
      (reason) => {
        console.error(reason);
      },
    );
}
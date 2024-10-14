import mongoose from 'mongoose';

export function dbConfig() {
  mongoose.connect('mongodb://127.0.0.1:27017/chat')
    .then(
      (value) => {
        console.log("database connected");
      },
      (reason) => {
        console.error(reason);
      },
    );
}
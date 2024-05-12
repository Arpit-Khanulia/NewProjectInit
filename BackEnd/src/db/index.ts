import mongoose from 'mongoose';

const dbinit = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}`);
    console.log('Database Connected Successfully');
  } catch (err) {
    console.log('Database failed to connect', err);
  }
};

export { dbinit };

// import mongoose from "mongoose";

// const connectDB= async () =>{

//     mongoose.connection.on('connected', ()=> console.log("Database connected"));
//     await mongoose.connect(`${process.env.MONGODB_URL}/mern-auth`);

// };

// export default connectDB;

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/mern-auth`, {
      useNewUrlParser: true, // Ensure using the new URL parser for compatibility
      useUnifiedTopology: true, // Use the new unified topology engine
    });

    mongoose.connection.on('connected', () => {
      console.log("Database connected");
    });

    mongoose.connection.on('error', (err) => {
      console.error(`Error connecting to database: ${err}`);
    });
  } catch (error) {
    console.error(`Error while connecting to DB: ${error.message}`);
    process.exit(1); // Exit the process if DB connection fails
  }
};

export default connectDB;

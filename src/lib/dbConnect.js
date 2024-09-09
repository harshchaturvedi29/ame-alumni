// Import the Mongoose library
import mongoose from 'mongoose';

// Define the database connection URL
// Use a environment variable to store the connection URL
// This way, you can easily switch between different environments (e.g. development, production)
const dbUrl = process.env.MONGO_URL;

// Define a function to connect to the database
async function connectToDatabase() {
  try {
    // Use the mongoose.connect method to connect to the database
    // Pass the connection URL and options to the method
    await mongoose.connect(dbUrl, {
      // Use the useNewUrlParser option to enable the new URL parser
      useNewUrlParser: true,
      // Use the useUnifiedTopology option to enable the new connection logic
      useUnifiedTopology: true,
      // Use the useCreateIndex option to create indexes on the database
      useCreateIndex: true,
      // Use the useFindAndModify option to enable the findAndModify method
      useFindAndModify: false,
    });

    // Log a message to the console to indicate that the connection was successful
    console.log('Connected to database');
  } catch (error) {
    // Log an error message to the console if the connection fails
    console.error('Error connecting to database:', error);
    // Exit the process with a non-zero exit code to indicate an error
    process.exit(1);
  }
}

// Call the connectToDatabase function to establish a connection to the database
connectToDatabase();

// Export the mongoose connection

export default connectToDatabase;


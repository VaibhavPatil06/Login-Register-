import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {sequelize} from './database/database.js'; // Ensure this is the correct path
import userRoutes from './routes/authRoutes.js';
// import otpRoutes from './routes/otpRoutes.js'; // Import OTP routes
// import OTP from './'; // Import OTP model if needed for further operations

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Define routes
app.use('/api/users', userRoutes);

// Database synchronization and server start
const startServer = async () => {
  try {
    await sequelize.authenticate(); // Check database connection
    console.log('Database connection has been established successfully.');

    // Sync all defined models to the database
    await sequelize.sync();
    console.log('Database synchronized.');

    // Start server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();

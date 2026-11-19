import express from 'express';
import cors from "cors";
import router from './Router/AuthRouter.js';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
dotenv.config();
const app = express();
const port = 3000;

// Connect to MongoDB
connectDB();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// middleware 


// base route 
app.use('/api/auth', router);
// base route

// not found route
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// server listening 
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
// server listening

export default app;
import express from 'express';
import cors from 'cors'
import userRoutes from './routes/userRoutes.js';
import { connectToDb } from './config/db.js';

const app = express();

app.use(express.json());
app.use(cors());

connectToDb()

app.use('/api/user', userRoutes);
app.use('/api/user',userRoutes);
app.use('/api/user',userRoutes)
app.use('/api/user',userRoutes)



app.listen(5000, () => {
    console.log('Server running on port 5000');
});

import express from 'express';
import userRoutes from './routes/userRoutes.js';
import { connectToDb } from './config/db.js';

const app = express();

app.use(express.json());


connectToDb()

app.use('/api/user', userRoutes);
app.use('/api/user',userRoutes)


app.listen(5000, () => {
    console.log('Server running on port 5000');
});

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

// Data Base connection
const DBconnection = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('DB connection established'))
    .catch(err => console.error('DB connection error:', err));
}


export default DBconnection
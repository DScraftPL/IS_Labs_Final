import mongoose from 'mongoose'

const connectDB = async (MONGO_URI: any) => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log('MongoDB Connected!')
        return mongoose
    } catch (err) {
        console.error('MongoDB Not connected!', err)
        process.exit(1)
    }
}

export default connectDB;
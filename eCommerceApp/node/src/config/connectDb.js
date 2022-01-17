import mongoose from 'mongoose'
import 'dotenv/config'

const connectDb = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.username}:${process.env.dbPassword}@cluster0.k8or0.mongodb.net/eCommerceDb?retryWrites=true&w=majority`,
            { useNewUrlParser: true, useUnifiedTopology: true }
        )
        console.log('Connection has been established successfully.');
    } catch (e) {
        console.error('Unable to connect to the database:', e);
    }
}

export default connectDb;
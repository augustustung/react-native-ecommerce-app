import { model, Schema, Types } from 'mongoose';

const AddressSchema = new Schema({
    _id: Types.ObjectId,
    userId: {
        type: Types.ObjectId,
        ref: "User"
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    streetAdd1: {
        type: String,
        required: true
    },
    streetAdd2: {
        type: String,
        required: false,
        default: ''
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
}, { timestamps: true });

const AddressModel = model('Address', AddressSchema);

export default AddressModel;
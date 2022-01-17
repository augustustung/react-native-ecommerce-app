import { model, Schema, Types } from 'mongoose';

const OfferSchema = new Schema({
    _id: Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    notificationTime: {
        type: String,
        required: true,
        default: "January 1, 1990 00:00 AM"
    }
}, { timestamps: true });

const OfferModel = model('Offer', OfferSchema);

export default OfferModel;
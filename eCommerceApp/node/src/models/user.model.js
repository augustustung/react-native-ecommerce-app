import { model, Schema, Types } from 'mongoose';

import { validateEmail } from '../ultis/regex';

const UserSchema = new Schema({
    _id: Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        match: validateEmail,
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    gender: String,
    birthday: String,
    phoneNumber: String,
    avatar: String,
    notification: {
        offer: [
            {
                type: Types.ObjectId,
                ref: "Offer"
            }
        ],
        feed: [
            {
                type: Types.ObjectId,
                ref: "Feed"
            }
        ],
        activity: [
            {
                type: Types.ObjectId,
                ref: "Activity"
            }
        ]
    },
    payment: {
        credit: [
            {
                id: String,
                cardNumber: String,
                cardHolder: String,
                cardSave: String
            }
        ],
        paypal: [
            {
                id: String,
                cardNumber: String,
                cardHolder: String,
                cardSave: String
            }
        ],
        bank: [
            {
                id: String,
                cardNumber: String,
                cardHolder: String,
                cardSave: String
            }
        ]
    }
}, { timestamps: true });

const UserModel = model('User', UserSchema);

export default UserModel;
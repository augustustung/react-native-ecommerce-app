import { model, Schema, Types } from 'mongoose';

const AllcodeSchema = new Schema({
    _id: Types.ObjectId,
    keyMap: String,
    type: String,
    value: String
}, { timestamps: true });

const AllcodeModel = model('Allcode', AllcodeSchema);

export default AllcodeModel;
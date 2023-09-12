import  mongoose, { Schema } from 'mongoose';
import { IUser } from '../interface/IUser';

const UserSchema = new Schema<IUser>({
  username: { type: String, default: null, required: true },
  firstname: { type: String, default: null, required: true },
  lastname: { type: String, default: null, required: true },
  chatId: { type: Number, default: null, required: true },
  score: { type: Number, default: 0, required: true }
});

export default mongoose.model<IUser>('Melon-User', UserSchema);
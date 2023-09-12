import  mongoose, { Schema } from 'mongoose';
import { IUser } from '../interface/IUser';

const UserSchema = new Schema<IUser>({
  username: { type: String, default: null, required: false },
  firstname: { type: String, default: null, required: false },
  lastname: { type: String, default: null, required: false },
  chatId: { type: Number, default: null, required: true },
  score: { type: Number, default: 0, required: true }
});

export default mongoose.model<IUser>('Melon-User', UserSchema);
import  mongoose, { Schema } from 'mongoose';
import { IUser } from '../interface/IUser';

const UserSchema = new Schema<IUser>({
  username: { type: String, default: null },
  chatId: { type: Number, default: null },
  score: { type: Number, default: null }
});

export default mongoose.model<IUser>('Melon-User', UserSchema);
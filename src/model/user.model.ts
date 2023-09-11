import  mongoose, { Schema } from 'mongoose';
import { IUser } from '../interface/IUser';

const UserSchema = new Schema<IUser>({
  username: { type: String, default: '' },
  chatId: { type: Number, default: 0 },
  score: { type: Number, default: 0 }
});

export default mongoose.model<IUser>('User', UserSchema);
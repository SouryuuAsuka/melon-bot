import  mongoose, { Schema } from 'mongoose';
import { IUser } from '../interface/IUser';

const UserSchema = new Schema<IUser>({
  username: { type: String, default: '' },
  chatId: { type: Number, default: 0 },
  score: { type: Number, default: 0 }
});

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
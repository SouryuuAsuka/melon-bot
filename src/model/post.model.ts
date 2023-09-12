import  mongoose, { Schema } from 'mongoose';
import { IPost } from '../interface/IPost';

const PostSchema = new Schema<IPost>({
  creatorId: { type: Number, default: null },
  postId: { type: Number, default: null },
  keyboardId: { type: Number, default: null },
  ownerId: { type: Number, default: null },
  inChanelPostId: { type: Number, default: null},
});

export default mongoose.model<IPost>('Melon-Post', PostSchema);
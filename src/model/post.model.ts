import  mongoose, { Schema } from 'mongoose';
import { IPost } from '../interface/IPost';

const PostSchema = new Schema<IPost>({
  creatorId: { type: Number, default: 0 },
  postId: { type: Number, default: 0 },
  keyboardId: { type: Number, default: 0 },
  ownerId: { type: Number, default: 0 },
  inChanelPostId: { type: Number },
});

export default mongoose.model<IPost>('Melon-Post', PostSchema);
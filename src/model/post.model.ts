import mongoose, { Schema } from 'mongoose';
import { IPost } from '../interface/IPost';

const PostSchema = new Schema<IPost>({
  creatorId: { type: Number, default: null, required: true },
  postId: { type: Number, default: null, required: true },
  keyboardId: { type: Number, default: null, required: true },
  ownerId: { type: Number, default: null, required: true },
  inChanelPostId: { type: Number, default: null, required: false },
});

export default mongoose.model<IPost>('Melon-Post', PostSchema);
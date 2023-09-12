import  { Document } from 'mongoose';

export interface IPost extends Document{
  creatorId: number;
  postId: number;
  keyboardId: number;
  ownerId: number;
  inChanelPostId?: number;
}
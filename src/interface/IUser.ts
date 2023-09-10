import  { Document } from 'mongoose';

export interface IUser extends Document{
  username: string;
  chatId: number;
  score?: number;
}
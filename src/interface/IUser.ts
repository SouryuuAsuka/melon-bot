import  { Document } from 'mongoose';

export interface IUser extends Document{
  username: string;
  firstname: string;
  lastname: string;
  chatId: number;
  score?: number;
}
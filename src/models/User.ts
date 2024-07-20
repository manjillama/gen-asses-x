import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  lastLoggedInAt: Date;
  refreshTokens: { token: string }[];
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, select: false },
  refreshTokens: { type: [{ token: { type: String, required: true } }], select: false },
  lastLoggedInAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

export default User;

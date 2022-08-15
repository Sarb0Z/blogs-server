
import mongoose from 'mongoose';
const UserSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    phone: String,
    is_active:  { type: Boolean, default: false },
});

const User =  mongoose.model('User', UserSchema);
 export default User;

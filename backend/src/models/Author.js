const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const authorSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'author',
    },
    profilePicUrl: {
      type: String,
      default: 'default-profile-pic.png',
    },
  }, { timestamps: true }
)

// TOOK THESE FROM PULSEBOARD
// DON'T KNOW WHAT WE'RE DOING FOR AUTHENTICATION
userSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.passwordHash);
};

userSchema.statics.hashPassword = function hashPassword(plain) {
  return bcrypt.hash(plain, 10);
};

userSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  delete obj.passwordHash;
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('User', userSchema)


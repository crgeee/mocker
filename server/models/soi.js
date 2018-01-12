import mongoose from 'mongoose';

const soiSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String
});

soiSchema.method({});

soiSchema.statics = {
  get(id) {
    return this.findById(id).exec().then((soi) => {
      if (soi) {
        return soi;
      }
      const err = new Error('No such soi exists!');
      return Promise.reject(err);
    });
  },

  list({
    skip = 0,
    limit = 50
  } = {}) {
    return this.find().sort({createdAt: -1}).skip(+ skip).limit(+ limit).exec();
  }
};

const soi = mongoose.model('soi', soiSchema);

export default soi;

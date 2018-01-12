import mongoose from 'mongoose';

const geoSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String
});

geoSchema.method({});

geoSchema.statics = {
  get(id) {
    return this.findById(id).exec().then((geo) => {
      if (geo) {
        return geo;
      }
      const err = new Error('No such geo exists!');
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

const geo = mongoose.model('geo', geoSchema);

export default geo;

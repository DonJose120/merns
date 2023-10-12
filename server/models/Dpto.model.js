import mongoose from 'mongoose';
const DptoSchema = new mongoose.Schema([{

  name: {
    type: String,
    trim: true,
    require: 'name is required'
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date
}]);

export default mongoose.model('Dpto', DptoSchema);
import mongoose from "mongoose";

const required = 'required';
const CitySchema = new mongoose.Schema([{

  name: {
    type: String,
    required: `name ${required}`
  },
  dpto: {
type: mongoose.Schema.ObjectId,
ref: 'Dpto'
  },
  create: {
    type: Date,
    default: Date.now
  },
  updated: Date
}]);
export default mongoose.model('city', CitySchema);
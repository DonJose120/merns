import City from '../models/City.model';
import merge from 'lodash/merge';
import errorHandler from '../helpers/dbErrorHandler';

const create = async (req, res) => {
  const city = new City(req.body);
  try {
    await city.save();
    return res.status(200).json({
      message: 'Successfully signed up!'
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const list = async (req, res) => {
  try {
    let city = await city.find().select(
      '_id name'
    ).populate('dpto', '_id name')
    res.json(city);
  } catch (err) {
    return res.status('400').json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const cityById = async (req, res, next, id) => {
  try {
    let city = await City.findById({_id: id});
    if (!city) {
      return res.status(400).json({
        error: 'City Not Found'
      });
    }
    req.profile= city;
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error:'Could not retivese City'
    });
  }
};

const read = (req, res) => {
  req.profile.salt = undefined;
  req.name = 'aa';
  return res.json(req.profile);
};

const update = async (req, res, next) => {
  try {
    let city = req.profile;
    city = merge(city, req.body);

    city.update = Date.now();
    await city.save();
    city.salt = '';
    res.json(city);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error:errorHandler.getErrorMessage(err)
    });
  }
};

const remove = async (req, res, next) =>{
  try {
    console.log('deleted');
    let city = req.profile;
    console.log('city to remove', city);
    let deletedCity = await city.deleteOne();
    deletedCity.salt = '';
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
    }
  };

  export default{
    create,
    list,
    read,
    remove,
    cityById,
    update
};
import Dpto from '../models/Dpto.model';
import merge from 'lodash/merge';
import errorHandler from './../helpers/dbErrorHandler';

const create = async (req, res) => {
  const dpto = new Dpto(req.body);
  try {
    await dpto.save();
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
    let dptos = await Dpto.find().select('name created');
    res.json(dptos);

  } catch (err) {
    return res.status('400').json({
      error:errorHandler.getErrorMessage(err)
    })
  }
};

const dptoById =async (req, res, next, id) => {
  try {
    let dpto = await Dpto.findById({_id: id});
    if(!dpto) {
      return res.status(400).json({
        error:'Dpto not found'
      });
    }
    req.profile = dpto;
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error:"Could not retrieve Dpto"
    });
  }
};

const read = (req, res) => {
  req.profile.salt = undefined;
  req.name = 'ss';
  return res.json(req.profile);
};

const update = async (req, res, next) => {
  try {
    let dpto = req.profile;
    dpto = merge(dpto, req.body);

    dpto.updated = Date.now();
    await dpto.save();
    dpto.salt = '';
    res.json(dpto);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const remove = async (req, res, next) => {
  try {
    console.log('deleted');
    let dpto = req.profile;
    console.log('dpto to remove', dpto);
    let deletedDpto= await dpto.deleteOne();
    deletedDpto.salt = '';
    res.json(deletedDpto);
  } catch(err) {
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

export default {
  create,
  list,
  read,
  remove,
  dptoById,
  update
};
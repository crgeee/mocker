import Soi from '../models/soi.js';

function load(req, res, next, id) {
  Soi.get(id)
    .then((soi) => {
      req.soi = soi; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

function get(req, res) {
  return res.json(req.soi);
}

function create(req, res, next) {
  const soi = new Soi({
    id: req.body.id,
    name: req.body.name
  });

  soi.save()
    .then(savedSoi => res.json(savedSoi))
    .catch(e => next(e));
}

function update(req, res, next) {
  const soi = req.soi;

  soi.save()
    .then(savedSoi => res.json(savedSoi))
    .catch(e => next(e));
}

function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Soi.list({ limit, skip })
    .then(sois => res.json(sois))
    .catch(e => next(e));
}

function remove(req, res, next) {
  const soi = req.soi;
  soi.remove()
    .then(deletedSoi => res.json(deletedSoi))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };

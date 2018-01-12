import Geo from '../models/geo.js';

function load(req, res, next, id) {
  Geo.get(id)
    .then((geo) => {
      req.geo = geo; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

function get(req, res) {
  return res.json(req.geo);
}

function create(req, res, next) {
  const geo = new Geo({
    id: req.body.id,
    name: req.body.name
  });

  geo.save()
    .then(savedGeo => res.json(savedGeo))
    .catch(e => next(e));
}

function update(req, res, next) {
  const geo = req.geo;

  geo.save()
    .then(savedGeo => res.json(savedGeo))
    .catch(e => next(e));
}

function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Geo.list({ limit, skip })
    .then(geos => res.json(geos))
    .catch(e => next(e));
}

function remove(req, res, next) {
  const geo = req.geo;
  geo.remove()
    .then(deletedGeo => res.json(deletedGeo))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };

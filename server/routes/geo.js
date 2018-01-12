import Geo from '../models/geo';
import express from 'express';
// import paramValidation from '../../config/param-validation';
import validate from 'express-validation';
import geoCtrl from '../controllers/geo.js';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/geos - Get list of geos */
  .get(geoCtrl.list)

  /** POST /api/geos - Create new geo */
  // .post(validate(paramValidation.createGeo), geoCtrl.create);
  .post(geoCtrl.create);

router.route('/:geoId')
  /** GET /api/geos/:geoId - Get geo */
  .get(geoCtrl.get)

  /** PUT /api/geos/:geoId - Update geo */
  // .put(validate(paramValidation.updateGeo), geoCtrl.update)
  .put(geoCtrl.update)

  /** DELETE /api/geos/:geoId - Delete geo */
  .delete(geoCtrl.remove);

/** Load geo when API with geoId route parameter is hit */
router.param('geoId', geoCtrl.load);

export default router;

import Soi from '../models/soi';
import express from 'express';
// import paramValidation from '../../config/param-validation';
import validate from 'express-validation';
import soiCtrl from '../controllers/soi.js';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/sois - Get list of sois */
  .get(soiCtrl.list)

  /** POST /api/sois - Create new soi */
  // .post(validate(paramValidation.createSoi), soiCtrl.create);
  .post(soiCtrl.create);

router.route('/:soiId')
  /** GET /api/sois/:soiId - Get soi */
  .get(soiCtrl.get)

  /** PUT /api/sois/:soiId - Update soi */
  // .put(validate(paramValidation.updateSoi), soiCtrl.update)
  .put(soiCtrl.update)

  /** DELETE /api/sois/:soiId - Delete soi */
  .delete(soiCtrl.remove);

/** Load soi when API with soiId route parameter is hit */
router.param('soiId', soiCtrl.load);

export default router;

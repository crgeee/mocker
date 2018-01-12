import {Router} from 'express';
import {version} from '../../package.json';
import geo from './geo.js';
import soi from './soi.js';

export default({config, db}) => {
  let router = Router();

  // mount the resources
  router.use('/geo', geo);
  router.use('/soi', soi);

  // perhaps expose some API metadata at the root
  router.get('/', (req, res) => {
    res.send('<p style="font-family: \'Lucida Console\', Courier, monospace;">mocker ' + version + ' is running!!</p>');
  });

  return router;
};

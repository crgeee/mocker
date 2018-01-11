import {Router} from 'express';
import {version} from '../../package.json';

export default({config, db}) => {
  let api = Router();

  // mount the resources
  // api.use('/users', users);

  // perhaps expose some API metadata at the root
  api.get('/', (req, res) => {
    res.send('<p style="font-family: \'Lucida Console\', Courier, monospace;">mocker ' + version + ' is running!!</p>');
  });

  return api;
};

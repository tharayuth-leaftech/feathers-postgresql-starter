// Initializes the `comments` service on path `/comments`
const { Raws } = require('./raws.class');
const createModel = require('../../models/raws.model');
const hooks = require('./raws.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/raws', new Raws(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('raws');

  service.hooks(hooks);
};

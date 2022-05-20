// Initializes the `users` service on path `/users`
const createService = require("feathers-sequelize");
const createModel = require("../../models/users.model");
const hooks = require("./users.hooks");

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get("paginate");

  const options = {
    Model,
    paginate,
  };

  // Initialize our service with any options it requires
  app.use("/users", createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service("users");

  service.hooks(hooks);

  app.service("users").hooks({
    before: {
      get(hook) {
        //console.log(hook);
        if (hook.id == "me") {
          return service.get(hook.params.user.id).then((result) => {
            hook.result = result;
            return hook;
          });
        }
        return hook;
      },
    },
  });
};

const Sequelize = require("sequelize");

module.exports = function (app) {
  const connectionString = app.get("postgres");
  const sequelize = new Sequelize(connectionString, {
    dialect: "postgres",
    logging: console.log,
    define: {
      freezeTableName: true,
    },
  });
  const oldSetup = app.setup;

  app.set("sequelizeClient", sequelize);
  app.set('sequelizeSync', sequelize.sync({}).then(function(){
    console.log('DB connection sucessful.');
  }, function(err){
    console.log(err);
  }));
  app.get('sequelizeSync');

  app.setup = function (...args) {
    const result = oldSetup.apply(this, args);

    // Set up data relationships
    const models = sequelize.models;
    Object.keys(models).forEach((name) => {
      if ("associate" in models[name]) {
        models[name].associate(models);
        console.log("Model name", name);
      }
    });

    return result;
  };
};

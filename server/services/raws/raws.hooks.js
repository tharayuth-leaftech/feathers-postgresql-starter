const { authenticate } = require('@feathersjs/authentication').hooks;

const processComment = require('../../hooks/process-comment');
const populateUser = require('../../hooks/populate-user');
const addAssociations = require("./../../hooks/add-associations");

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [
      addAssociations({
        models: [
          {
            model: "sensors",
            as: "sensorsData",
          },
          {
            model: "devices",
            as: "deviceData",
          },
        ],
      })
    ],
    get: [
      addAssociations({
        models: [
          {
            model: "sensors",
            as: "sensorsData",
          },
          {
            model: "devices",
            as: "deviceData",
          },
        ],
      })
    ],
    //create: [processComment()],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    //all: [populateUser()],
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

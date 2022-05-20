const users = require('./users/users.service.js');
const comments = require('./comments/comments.service.js');
const devices = require('./devices/devices.service.js');
const sensors = require('./sensors/sensors.service.js');
const raws = require('./raws/raws.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(comments);
  app.configure(devices);
  app.configure(sensors);
  app.configure(raws);
};

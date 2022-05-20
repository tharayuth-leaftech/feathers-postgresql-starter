// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const devices = sequelizeClient.define('devices', {

    dID: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      unique: true
    },
    dName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dType: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },

  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  devices.removeAttribute("id");
  // eslint-disable-next-line no-unused-vars
  devices.associate = function (models) {
    devices.hasMany(
      sequelizeClient.models.sensors,
      {
        foreignKey: "sDeviceID",
        sourceKey: "dID",
        onDelete: 'CASCADE',
        as: 'sensorsData'
      }
    );
  };

  return devices;
};

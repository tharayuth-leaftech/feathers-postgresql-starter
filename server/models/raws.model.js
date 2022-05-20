// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const raws = sequelizeClient.define('raws', {
    rID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement : true
    },
    rValue: {
      type: DataTypes.DOUBLE,
      allowNull: true
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

  raws.removeAttribute("id");

  // eslint-disable-next-line no-unused-vars
  raws.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    raws.belongsTo(
      sequelizeClient.models.devices,
      {
        foreignKey: "rDeviceID",
        sourceKey: "dID",
        onDelete: 'CASCADE',
        as: 'deviceData'
      }
    );
    raws.belongsTo(
      sequelizeClient.models.sensors,
      {
        foreignKey: "rSensorID",
        sourceKey: "sID",
        onDelete: 'CASCADE',
        as: 'sensorsData'
      }
    );
  };

  return raws;
};

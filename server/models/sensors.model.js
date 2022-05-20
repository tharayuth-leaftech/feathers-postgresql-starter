// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const sensors = sequelizeClient.define('sensors', {
    sID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement : true
    },
    sName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sLastestValue: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    sLastestValueTime: {
      type: DataTypes.DATE,
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

  sensors.removeAttribute("id");

  // eslint-disable-next-line no-unused-vars
  sensors.associate = function (models) {
    sensors.belongsTo(
      sequelizeClient.models.devices,
      {
        foreignKey: "sDeviceID",
        sourceKey: "dID",
        onDelete: 'CASCADE',
        as: 'deviceData'
      }
    );
  };

  return sensors;
};

const Sequelize = require('sequelize');
const db = require('../config/database');

const Catalog = db.define('catalogs', {
  thing_label: {
    type: Sequelize.STRING
  },
  thing_status: {
    type: Sequelize.STRING
  },
  thing_condition: {
    type: Sequelize.STRING
  },
  person_role: {
    type: Sequelize.STRING
  },
  person_contactinfo: {
    type: Sequelize.STRING
  },
  place_storedin: {
    type: Sequelize.STRING
  },
  category_label: {
    type: Sequelize.STRING
  },
  hist_desc: {
    type: Sequelize.STRING
  },
  hist_date: {
    type: Sequelize.STRING
  },
  artifact_type: {
    type: Sequelize.STRING
  },
  imglink: {
    type: Sequelize.STRING
  },
  moneyvalue: {
    type: Sequelize.STRING
  },
  approxsize: {
    type: Sequelize.STRING
  }
});

module.exports = Catalog;
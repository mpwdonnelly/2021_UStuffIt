module.exports = (sequelize, Sequelize) => {
    const Catalog = sequelize.define("catalog", {
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
      person_contactInfo: {
        type: Sequelize.STRING
      },
      place_storedIn: {
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
      imgLink: {
        type: Sequelize.STRING
      }
    });
  
    return Catalog;
  };

  //change to test pivotalTracker
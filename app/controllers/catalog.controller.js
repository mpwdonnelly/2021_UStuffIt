//const { regexp } = require("sequelize/types/lib/operators");
const db = require("../models");
const Catalog = db.catalogs;
const Op = db.sequelize.Op;

//Create and save a catalog item
exports.create = (req,res) => {
    //validate the request
    if (!req.body.thing_label) {
        res.status(400).send({
            message: "Error - item label can NOT be empty!"
        });
        return;
    }

    //create catalog item
    const catalog = {
        thing_label: req.body.thing_label,
        thing_status: req.body.thing_status,
        thing_condition: req.body.thing_condition,
        person_role: req.body.person_role,
        person_contactInfo: req.body.person_contactInfo,
        place_storedIn: req.body.place_storedIn,
        category_label: req.body.category_label,
        hist_desc: req.body.hist_desc,
        hist_date: req.body.hist_date,
        artifact_type: req.body.artifact_type,
        imgLink: req.body.imgLink
    };

    //save to db
    Catalog.create(catalog)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
           message: err.message || "Error when trying to save to database!" 
        });
    });
};

//pull entire db
exports.findAll = (req,res) => {
    Catalog.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "An error occured while retrieving the data!"
        });
    });
};

//find one entry by id
exports.findOne = (req,res) => {
    const id = req.params.id;

    Catalog.findByPk(id)
    .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(400).send({
                message: `Can't locate a catalog item with an ID of ${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "There was an error retrieving a catalog item with the id of " + id
        });
    });
};

//delete everything in the db
exports.deleteAll = (req,res) => {
    Catalog.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({message: `${nums} catalogged items were deleted successfully!`})
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "An error was encountered while attempting to empty all database items!"
        });
    });
};

//delete by id
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Catalog.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: `Cataloged item with an id of ${id} was deleted successfully!`
          });
        } else {
          res.send({
            message: `Cannot delete cataloged item with an id of ${id}. The cataloged item may not exist.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete cataloged item with and id of " + id + "."
        });
      });
  };

  //update based on id
  exports.update = (req, res) => {
    const id = req.params.id;
  
    Catalog.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Cataloged item was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update cataloged item with an id of ${id}. The cataloged item may not exist.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating cataloged item with an id of " + id + "."
        });
      });
  };

  //change to test pivotalTracker
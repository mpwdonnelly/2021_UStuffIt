module.exports = app => {
    //constants
    const catalogs = require("../controllers/catalog.controller.js");
    
    //variables
    var router = require("express").Router();

    //create a new catalog item
    router.post("/", catalogs.create);

    //retrieve all cataloged items
    router.get("/", catalogs.findAll);

    //retrieve all cataloged items with an entered thing_label
    router.get("/getByLabel/:thing_label", catalogs.findAllByThingLabel);

    //retrieve a specific catalog item based on id
    router.get("/:id", catalogs.findOneById);

    //delete all items in the db
    router.delete("/", catalogs.deleteAll);

    //delete a specific item by id
    router.delete("/:id", catalogs.deleteById);

    //update one entry based on id
    router.put("/:id", catalogs.updateById);

    app.use('/api/catalogs', router);
};

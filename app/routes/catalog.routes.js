module.exports = app => {
    //constants
    const catalogs = require("../controllers/catalog.controller.js");
    
    //variables
    var router = require("express").Router();

    //create a new catalog item
    router.post("/", catalogs.create);

    //retrieve all cataloged items
    router.get("/", catalogs.findAll);

    //retrieve a specific catalog item based on id
    router.get("/:id", catalogs.findOne);

    //delete all items in the db
    router.delete("/", catalogs.deleteAll);

    //delete a specific item by id
    router.delete("/:id", catalogs.delete);

    //update one entry based on id
    router.put("/:id", catalogs.update);

    app.use('/api/catalogs', router);
};

//change to test pivotalTracker


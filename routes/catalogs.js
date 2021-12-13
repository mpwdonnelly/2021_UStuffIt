const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Catalog = require('../models/Catalog');
const Sequelize = require('sequelize');
const { json } = require('body-parser');
const { JSON } = require('sequelize');
const Op = Sequelize.Op;


// *************************************************
// ********** PURE PAGE RENDER ROUTES **************
// *************************************************

// Display add thing form
router.get('/add', (req, res) => res.render('add'));
//-----------------------------------------------------------------------------------END OF ROUTE


// *************************************************
// ************** PURE GET ROUTES ******************
// *************************************************

// GET ALL CATALOGS (THINGS)
router.get('/getAll', (req, res) => 
  Catalog.findAll()
    .then(catalogs => res.render('catalogs', { catalogs }))
    .catch(err => console.log(err)));
//-----------------------------------------------------------------------------------END OF ROUTE

// GET ALL CATALOGS (THINGS)
router.get('/getAllList', (req, res) => 
  Catalog.findAll()
    .then(catalogs => res.render('catalogsListView', { catalogs }))
    .catch(err => console.log(err)));
//-----------------------------------------------------------------------------------END OF ROUTE

// GET ALL CATALOGS (THINGS)
router.get('/getAllThumbs', (req, res) => 
  Catalog.findAll()
    .then(catalogs => res.render('catalogsThumbsView', { catalogs }))
    .catch(err => console.log(err)));
//-----------------------------------------------------------------------------------END OF ROUTE


// GET DETAILED CATALOG (THING) VIEW 
router.get('/getOne/:id', (req,res) => {
  let {id} = req.params;

  Catalog.findOne({
    where: {
      id: {
        [Op.eq]: parseInt(`${id}`)
      }
    }
  })
  .then(catalogs => res.render('catalogsDetail', { catalogs }))
})
//------------------------------------------------------------------------------------END OF ROUTE


// GLOBAL HOME PAGE SEARCH FOR THING 
router.get('/search', (req, res) => {
  let {term} = req.query;

  Catalog.findAll({ 
    where: { 
      [Op.or]: 
        [{thing_label: { [Op.iLike]: `%${term}%`}}, 
        {thing_status: { [Op.iLike]: `%${term}%`}},
        {thing_condition: { [Op.iLike]: `%${term}%`}},
        {person_role: { [Op.iLike]: `%${term}%`}},
        {person_contactInfo: { [Op.iLike]: `%${term}%`}},
        {place_storedIn: { [Op.iLike]: `%${term}%`}},
        {category_label: { [Op.iLike]: `%${term}%`}},
        {hist_desc: { [Op.iLike]: `%${term}%`}},       
        {hist_date: { [Op.iLike]: `%${term}%`}},
        {artifact_type: { [Op.iLike]: `%${term}%`}},
        {imgLink: { [Op.iLike]: `%${term}%`}},
        {moneyValue: { [Op.iLike]: `%${term}%`}},
        {approxSize: { [Op.iLike]: `%${term}%`}}
      ]}})
  .then(catalogs => res.render('catalogs', { catalogs }))
  .catch(err => console.log("Search string error: " + err))
});
//-----------------------------------------------------------------------------------END OF ROUTE


// SMART SEARCH FOR "ADVANCED SEARCH" PAGE 
router.get('/smartSearch', (req, res) => {

  // now handle the inputs once user presses SEARCH
  let { label, status, condition, person, contact, location, category } = req.query;

  Catalog.findAll({ 
    where: {
      thing_label: {
        [Op.iLike]: `%${label}%`
      },
      thing_status: {
        [Op.iLike]: `%${status}%`
      },
      thing_condition: {
        [Op.iLike]: `%${condition}%`
      },
      person_role: {
        [Op.iLike]: `%${person}%`
      },
      person_contactInfo: {
        [Op.iLike]: `%${contact}%`
      },
      place_storedIn: {
        [Op.iLike]: `%${location}%`
      },
      category_label: {
        [Op.iLike]: `%${category}%`
      },
    }
  })
  .then(catalogs => res.render('catalogs', { catalogs }))
  .catch(err => console.log("Search string error: " + err))
});
//-----------------------------------------------------------------------------------END OF ROUTE


// *************************************************
// *************** UPDATE ROUTES *******************
// *************************************************

// DISPLAY AND UPDATE THING FORM WITH SPECIFIC THING ATTRIBUTES TO PREPARE FOR EDITING 
router.get('/update/:id', function (req, res) {

  let {id} = req.params;

  Catalog.findOne({ 
    where: {
      id: {
        [Op.eq]: parseInt(`${id}`)
      }
    }
  }).then(function(catalogs){
    res.render('update', {
      catalogs: {
        id: catalogs.id,
        thing_label: catalogs.thing_label,
        thing_status: catalogs.thing_status,
        thing_condition: catalogs.thing_condition,
        hist_desc: catalogs.hist_desc,
        place_storedIn: catalogs.place_storedIn,
        category_label: catalogs.category_label,
        moneyValue: catalogs.moneyValue,
        approxSize: catalogs.approxSize,
        person_role: catalogs.person_role,
        person_contactInfo: catalogs.person_contactInfo,
        artifact_type: catalogs.artifact_type,
        imgLink: catalogs.imgLink
      }
    })
    return catalogs
  })
})
//-----------------------------------------------------------------------------------END OF ROUTE


// UPDATE A THING 
router.get('/updateRow/:id', (req, res) => {

  let {id} = req.params;
    
  let { thing_label,
    thing_status,
    thing_condition,
    hist_desc,
    place_storedIn,
    category_label,
    moneyValue,
    approxSize,
    person_role,
    person_contactInfo,
    artifact_type,
    imgLink
  } = req.query;

  // Insert into table
  Catalog.findOne({ 
    where: {
      id: {
        [Op.eq]: parseInt(`${id}`)
      }
    }
  }).then(record => {
    if (!record) {
      throw new Error('no record found')
    }
    console.log(`retrieved record ${id}`)

    let values = {
      id,
      thing_label,
      thing_status,
      thing_condition,
      hist_desc,
      place_storedIn,
      category_label,
      moneyValue,
      approxSize,
      person_role,
      person_contactInfo,
      artifact_type,
      imgLink
    }

    record.update(values).then( updatedRecord => {
      console.log(`updated record ${id}`)
    })

  }).then(res.redirect('/catalogs/getAll'))
  .catch(err => console.log(err));
  })
//-----------------------------------------------------------------------------------END OF ROUTE


// *************************************************
// *************** DELETE ROUTES *******************
// *************************************************

// DELETE A THING 
router.get('/delete/:id', (req,res) => {
  let {id} = req.params;

  Catalog.destroy({
    where: {
      id: {
        [Op.eq]: parseInt(`${id}`)
      }
    }
  })
  .then(res.redirect('/catalogs/getAll'))
})
//-----------------------------------------------------------------------------------END OF ROUTE


// *************************************************
// **************** POST ROUTES ********************
// *************************************************

// ADD A THING 
router.post('/add', (req, res) => {

  let { thing_label,
    thing_status,
    thing_condition,
    person_role,
    person_contactInfo,
    place_storedIn,
    category_label,
    hist_desc,
    hist_date, 
    artifact_type,
    imgLink,
    approxSize,
    moneyValue,
    createdAt,
    updatedAt } = req.body;

  let errorMsgs = [];

  // Required field validation
  if(thing_label == "") {
  errorMsgs.push({'error' : 'Please enter a label for your item.'})
  }

  if(errorMsgs != ""){
    res.render('errors', {errorMsgs})
  } else {

  // Insert into table
    Catalog.create({
      thing_label,
      thing_status,
      thing_condition,
      person_role,
      person_contactInfo,
      place_storedIn,
      category_label,
      hist_desc,
      hist_date, 
      artifact_type,
      imgLink,
      approxSize,
      moneyValue,
      createdAt,
      updatedAt
    })
      .then(catalogs => res.redirect('/catalogs/getAll'))
      .catch(err => console.log(err));
   }
});
//-----------------------------------------------------------------------------------END OF ROUTE


module.exports = router;
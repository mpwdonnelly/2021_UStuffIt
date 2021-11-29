const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Catalog = require('../models/Catalog');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// router.get('/', (req, res) => res.send('Catalog route checks out 2'));

// Get catalog
router.get('/', (req, res) => 
  Catalog.findAll()
    .then(catalogs => res.render('catalogs', { catalogs }))
    .catch(err => console.log(err)));


// Display add gig form
router.get('/add', (req, res) => res.render('add'));

// Add a gig
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
    createdAt,
    updatedAt } = req.body;

  // let errors = [];

// // do some validation
// TODO: Need to change all this to make it appropriate for our data
//   if(!title) {
//     errors.push({text: 'Please add a title'});
//   }
//   if(!technologies) {
//     errors.push({text: 'Please add technologies'});
//   }
//   if(!description) {
//     errors.push({text: 'Please add a description'});
//   }
//   if(!contact_email) {
//     errors.push({text: 'Please add a contact email'});
//   }

//   // Check for errors
//   if(errors.length > 0) {
//     res.render('add', {
//       errors,
//       title, 
//       technologies, 
//       budget, 
//       description, 
//       contact_email
//     });

//   } else {
//     if(!budget) {
//       budget = 'Unknown';
//     } else {
//       budget = `$${budget}`
//     }
//     // clean up the technologies input
//     technologies = technologies.toLowerCase().replace(/, /g, ',')

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
      createdAt,
      updatedAt
    })
      .then(catalogs => res.redirect('/catalog'))
      .catch(err => console.log(err));
  
}); // end add thing

// Search for item
// for some reason my parser is choking on the curly brax
// saying they're unpaired or some shit
// commenting out and putting in a dummy call for now
// TODO: make this GD search function work dammit
// router.get('/search', (req, res) => {
//   let { term } = req.query;
//   term = term.toLowerCase().trim();

//   Catalog.findAll({ where: { thing_label { [Op.like]: `%${term}%`}}})
//   .then(catalogs => res.render('catalogs', { catalogs }))
//   .catch(err => console.log("Search string error: " + err))
// }); // end search for thing

// dummy search, should just redirect. See above
router.get('/search', (req, res) => res.redirect('/catalog'));

module.exports = router;
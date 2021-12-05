const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Catalog = require('../models/Catalog');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// router.get('/', (req, res) => res.send('Catalog route checks out 2'));
router.get('/pdfindex', (req, res) =>
    Catalog.openPdf()
        .then(catalogs => res.render('catalogs', { catalogs}))
        .catch(err => console.log(err)));

// Get catalog
router.get('/', (req, res) => 
  Catalog.findAll()
    .then(catalogs => res.render('catalogs', { catalogs }))
    .catch(err => console.log(err)));


// Display add thing form
router.get('/add', (req, res) => res.render('add'));

// Add a thing
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
      .then(catalogs => res.redirect('/catalogs'))
      .catch(err => console.log(err));
  
}); // end add thing

router.get('/search', (req, res) => {
  let {term} = req.query;
  // term = term.toLowerCase().trim();

  Catalog.findAll({ where: { thing_label: { [Op.iLike]: `%${term}%`}}})
  .then(catalogs => res.render('catalogs', { catalogs }))
  .catch(err => console.log("Search string error: " + err))
}); // end search for thing


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
  

}); // end search for thing


module.exports = router;
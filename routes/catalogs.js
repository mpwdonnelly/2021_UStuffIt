const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Catalog = require('../models/Catalog');
const Sequelize = require('sequelize');
const { json } = require('body-parser');
const { JSON } = require('sequelize');
const Op = Sequelize.Op;

// router.get('/', (req, res) => res.send('Catalog route checks out 2'));

// router.get('/pdfindex', (req, res) =>
//     Catalog.openPdf()
//         .then(catalogs => res.render('catalogs', { catalogs}))
//         .catch(err => console.log(err)));

// Get catalog
router.get('/', (req, res) => 
  Catalog.findAll()
    .then(catalogs => res.render('catalogs', { catalogs }))
    .catch(err => console.log(err)));


// Display add thing form
router.get('/add', (req, res) => res.render('add'));

// Display & update thing form for updating
router.get('/update/:id', function (req, res) {

  let {id} = req.params;
  //console.log("updating form with id of " + parseInt({id}));

  Catalog.findOne({ 
    where: {
      id: {
        [Op.eq]: parseInt(`${id}`)
      }
    }
  }).then(function(catalogs){
    //console.log(catalogs.get({plain:true}))
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

//Delete a thing
router.get('/delete/:id', (req,res) => {
  let {id} = req.params;

  Catalog.destroy({
    where: {
      id: {
        [Op.eq]: parseInt(`${id}`)
      }
    }
  })
  .then(res.redirect('/catalogs'))
})


// Update a thing
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

  }).then(res.redirect('/catalogs'))
  .catch(err => console.log(err));
  }) 

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
    approxSize,
    moneyValue,
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
      approxSize,
      moneyValue,
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
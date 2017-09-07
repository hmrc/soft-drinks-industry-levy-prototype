var express = require('express')
var router = express.Router()

var session = {
	litresProduced : 0, // (volOwnBrand)
	copackedByOtherUk : 0, // (volViaCopacker)
	copacksForOthers : 0, // (volCopack)
	imports : false // (import)

	// litresMadeOwn : 0,
	// litresMadeCopack : 0,
	// litresProduced : function () {
	// 	return this.litresMadeOwn + this.litresMadeCopack
	// }

}

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// add your routes here

router.get('/', function (req, res) {
  res.send('Hello World!')
})


// Branching

// ------------------------
// Liability tool
// ------------------------

// Liability index page
router.get('/liability/manufacture-who', function (req, res) {
  //console.log('Setting the manufacturing types')
  // get the answer from the query string (eg. ?manufacture=false)
  var manufacture = req.query.manufacture

  if (manufacture === 'No') {
    // redirect to the relevant page
    res.redirect('copacked')
  } else {
    // if user manufactures liable drinks render page asking who they make them for.
    res.render('liability/manufacture-who')
  }
})

// Who do you manufacture for? (/liability/manufacture-who)
router.get('/liability/manufacture-route-step1', function (req, res) {
  var manufactureWho = req.query.manufactureWho

  if (manufactureWho[0] === 'Own brands') {
  	res.redirect('manufacture-own')
  } else {
    res.render('liability/manufacture-copack')
  }
  
})
router.get('/liability/manufacture-copack', function (req, res) {
  var manufactureStep2 = req.query.manufactureStep2
  if (manufactureStep2 === 'Own brands') {
  	res.redirect('copacked')
  } else {
    res.render('liability/manufacture-copack')
  }
  
})

// Do you use a co-packer?
router.get('/liability/copacked-volume', function (req, res) {
  // get the answer from the query string 
  var useCopacker = req.query.useCopacker

  if (useCopacker === 'No') {
    // redirect to the relevant page
    res.redirect('import')
  } else {
    res.render('liability/copacked-volume')
  }
})

module.exports = router

var express = require('express');
var router = express.Router();

const ApiService = require('../service/sqlService.js');

/* GET home page. */
router.get('/getMethod', async function(req, res, next) {
  //뷰를 보여준다
  //res.render('index', { title: 'Express' });

  //디비에서 사용자 정보를 가져온다.
  let fetchedUsers = await ApiService.getUsers();

  res.send({
    status : 0,
    fetchedUsers: fetchedUsers
  });
});

router.post('/postMethod', async function (req, res) {

  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;  
  let password = req.body.password;

  let queryResult = await ApiService.addUser(firstName, lastName, email, password);

  res.send({
    result : queryResult
  });
});




router.put('/putMethod/:id', async function (req, res) {

  let id = req.params.id;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;  
  let password = req.body.password;

  let queryResult = await ApiService.updateUser(id, firstName, lastName, email, password)

  res.send({
    result : queryResult
  });
});




router.delete('/deleteMethod/:id', async function (req, res) {

  let id = req.params.id;
  console.log("id: " + id);

  let queryResult = await ApiService.deleteUser(id);

  res.send({
    result : queryResult
  });
});


module.exports = router;

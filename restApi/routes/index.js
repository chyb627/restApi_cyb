var express = require('express');
var router = express.Router();

const ApiService = require('../service/sqlService.js');


//
router.get('/getMethod/:page', async function(req, res, next){
 
  let pageIndex = req.params.page  //지금 몇번째 페이지인지 알수 있다

  // 디비에서 사용자 정보를 가져온다 - 페이징
  let totalUserCount = await ApiService.getUserCount();

  let countPerPage = 3; // 몇개를 보여줄거냐? limit 부분
  let totalPageCount = Math.ceil(totalUserCount/countPerPage);

  let offset = 0;

  if  (pageIndex <=0){
    pageIndex = 1;
  } //언더 플로우 예외처리

  if(pageIndex > totalPageCount){
    pageIndex = totalPageCount;
  }  //오버플로우 예외처리

  if(pageIndex > 1){
    offset = (pageIndex - 1) * countPerPage;
  }



// 디비에서 해당 페이지의 데이터를 가져온다.
  let fetchedUsersPerPage = await ApiService.getUsersPerPage(offset, countPerPage);

  res.send({
    pageIndex : pageIndex,
    countPerPage : countPerPage,
    totalPageCount : totalPageCount,
    totalUserCount : totalUserCount,
    fetchedUsersPerPage : fetchedUsersPerPage
  });
});




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

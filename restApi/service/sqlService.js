//service는 데이터베이스와의 연결 부분

const models = require("../models"); 
//models에 있는것들을 가져오게된다

//사용자의 총 카운트를 가져온다
async function getUserCount(){
	console.log("getUserCount() -called");
	let userCount;
	await models.User.count()
	.then(count => {
		console.log("There are" + count + "projects!")
		userCount = count
		})

		//attributes: [models.sequelize.fm('count','*')],
		
	return userCount;

}   

// 디비에서 사용자 목록을 가져온다 -페이징
async function getUsersPerPage(offset, limit){
	console.log(`getUsers() called pffser: ${offset} / limit : ${limit}`);
	const users = await models.User.findAll({
		offset: offset,
		limit: limit,
	});
	console.log(users);
	return users;
}







//함수 정의
//디비에서 사용자 목록을 가져온다
async function getUsers(){
	const users = await models.User.findAll({
		//attributes: ['id','firstName'] //id, firstname만 호출
		//제이슨 데이터가 가져온다.
		raw: true //전부 호출
	});
	return users;
}

// 디비에 사용자를 추가한다
async function addUser(firstName, lastName, email, password){
	console.log(`sqlService.js - addUser() called / firstName: ${firstName}, lastName: ${lastName}, email: ${email}, password: ${password}`);
	const queryResult = await models.User.create({
		firstName: firstName, 
		lastName: lastName,
		email: email,
		password: password
	});
	return queryResult;
}

async function deleteUser(id){
	console.log(`sqlService.js - deleteUser() called / id: ${id}`);
	const queryResult = await models.User.destroy({
								firstName: firstName, 
								lastName: lastName,
								email: email,
								password: password
							},{ 
						where: {
							id: id
						}
					});
	return queryResult;
}

async function updateUser(id, firstName, lastName, email, password){
	console.log(`sqlService.js - updateUser() called / id: ${id}, firstName: ${firstName}, lastName: ${lastName}, email: ${email}, password: ${password}`);
	const queryResult = await models.User.update({ 
								firstName: firstName, 
								lastName: lastName,
								email: email,
								password: password
	},{
		where:{
			id: id
		}
	})
}



//밖에서 사용하기위해 exports를 해준다
module.exports.getUsers = getUsers; 
module.exports.addUser = addUser;
module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;

//페이징 관련
module.exports.getUserCount = getUserCount;
module.exports.getUsersPerPage = getUsersPerPage;
const models = require("../models"); 
//models에 있는것들을 가져오게된다

//함수 정의
//디비에서 사용자 목록을 가져온다
async function getUsers(){
	const users = await models.User.findAll({
		attributes: ['id','firstName'] //id, firstname만 호출
		//제이슨 데이터가 가져온다.
		//raw: true //전부 호출
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



module.exports.getUsers = getUsers;
module.exports.addUser = addUser;
module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;
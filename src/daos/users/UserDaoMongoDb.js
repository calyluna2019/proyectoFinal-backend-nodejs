const ContainerMongoDb = require("../../containers/containerMongoDb");
const User = require('../../models/User');

class UserDaoMongoDb extends ContainerMongoDb {
    constructor() {
        super(User);
    }

    static newUserDao() {
        return new UserDaoMongoDb();
    }
}

module.exports = UserDaoMongoDb;
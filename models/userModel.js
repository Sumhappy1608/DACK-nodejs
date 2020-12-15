const {db} = require('../database/db');
const { ObjectId} = require('mongodb');



exports.registration = async(user) => {
    const user_data = {
        user: user,
        isLock: 0,
        buy_id: ""
    }
    const userDatabase = db().collection('user');
    await userDatabase.insert(user_data);
    return 1;
}
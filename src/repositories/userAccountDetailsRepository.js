const dbClient = require('../db/client');

class UserAccountDetailsRepository {
    constructor() {
    }

    async insert(userId, accountDetails) {
        const sql = `INSERT INTO user_account_details (user_id, first_name, last_name, address_1, address_2, city, state, zip_code, phone_number, email)
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                     RETURNING *`;
        const values = [
            userId, 
            accountDetails.firstName, 
            accountDetails.lastName, 
            accountDetails.address1, 
            accountDetails.address2, 
            accountDetails.city, 
            accountDetails.state, 
            accountDetails.zipCode, 
            accountDetails.phoneNumber, 
            accountDetails.email
        ];
        const result = await dbClient.query(sql, values);
        return result.rows[0];
    }

    async update(userId, accountDetails) {
        const sql = `UPDATE user_account_details
                     SET first_name = $2, last_name = $3, address_1 = $4, address_2 = $5, city = $6, state = $7, zip_code = $8, phone_number = $9, email = $10
                     WHERE user_id = $1
                     RETURNING *`;
        const values = [
            userId, 
            accountDetails.firstName, 
            accountDetails.lastName, 
            accountDetails.address1, 
            accountDetails.address2, 
            accountDetails.city, 
            accountDetails.state, 
            accountDetails.zipCode, 
            accountDetails.phoneNumber, 
            accountDetails.email
        ];
        const result = await dbClient.query(sql, values);
        return result.rows[0];
    }

    async select(userId) {
        const sql = `SELECT * FROM user_account_details WHERE user_id = $1`;
        const values = [userId];
        const result = await dbClient.query(sql, values);
        return result.rows[0];
    }
}

module.exports = UserAccountDetailsRepository;
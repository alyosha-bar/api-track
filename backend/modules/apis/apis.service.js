const questPool = require('../../database/questdb')
const neonPool = require('../../database/db')

const GetAPIs = async (userID) => {
    try {
        query = 'SELECT * FROM apis WHERE user_id = $1'

        const result = await neonPool.query(query, [userID])
        return result.rows
    } catch (error) {
        console.error('Error fetching API', error)
        return {error: error.message}
    }
}

const GetAnalytics = async (apiID) => {
    try {
        query = 'SELECT * FROM api_traffic_log WHERE api_id = $1;'

        const result = await questPool.query(query, [apiID])
        return result.rows
    } catch (error) {
        console.error('API error:', error)
        return {error: error.message}
    }
}

const RegisterAPI = async (apiData) => {
    try {
        const query = `
            INSERT INTO apis 
            (title, description, project_name, base_url, user_id, api_token) 
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING *
        `;

        const values = [
            apiData.title,
            apiData.description,
            apiData.project_name,
            apiData.base_url,
            apiData.user_id,
            apiData.apiToken
        ];

        const result = await neonPool.query(query, values);

        return {
            success: true,
            data: result.rows[0],
            message: "API registered successfully."
        };
    } catch (error) {
        console.error("Error in RegisterAPI:", error);
        return {
            success: false,
            message: "Failed to register API.",
            error: error.message
        };
    }
};


module.exports = {
    GetAnalytics,
    GetAPIs,
    RegisterAPI
}
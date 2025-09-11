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
        query = 'SELECT * FROM api_traffic_log WHERE api_id = $1 AND deleted = false;'

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

const UpdateInfo = async (field, value, apiID) => {

    try {
        query = 'UPDATE apis SET $1 = $2 WHERE api_id = $3 ;'

        const result = await questPool.query(query, [field, value, apiID])
        return result.rows
    } catch (error) {
        console.error('API error:', error)
        return {error: error.message}
    }

    return 
}

const DeleteAPI = async (apiID) => {
    try {
        // Soft delete in QuestDB
        const queryQuest = 'UPDATE api_traffic_log SET deleted = true WHERE api_id = $1;'
        await questPool.query(queryQuest, [apiID])
    } catch (error) {
        console.error('Error deleting from QuestDB:', error)
        return { error: error.message }
    }

    try {
        // Still hard delete in Neon (based on your logic)
        const queryNeon = 'DELETE FROM apis WHERE id = $1;'
        await neonPool.query(queryNeon, [apiID])
    } catch (error) {
        console.error('Error deleting API in PostgreSQL:', error)
        return { error: error.message }
    }

    // Always return a success object if no errors
    return { success: true }
}

module.exports = { DeleteAPI }


module.exports = {
    GetAnalytics,
    GetAPIs,
    RegisterAPI,
    UpdateInfo,
    DeleteAPI
}
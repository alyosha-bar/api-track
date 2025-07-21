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


module.exports = {
    GetAnalytics,
    GetAPIs
}
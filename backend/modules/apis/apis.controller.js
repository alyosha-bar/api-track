// import API Service
const { generateToken } = require('../../util/token')
const ApiService = require('./apis.service')

const GetAPIs = async (req, res) => {
    const userID = req.user.id

    console.log(`Fetching APIs registered to: ${userID}`)

    const result = await ApiService.GetAPIs(userID)

    if (result.error != null) {
        res.status(500).json("Error fetching analytics")
    }
    
    res.status(200).json(result)
}


const RegisterAPI = async (req, res) => {
    // get the clerk_id of the user from middleware
    console.log(req.user.id)
    
    // get the info from body
    console.log(req.body)

    // generate token
    const token = generateToken()

    const apiData = {
        title: req.body.title,
        description: req.body.description,
        project_name: req.body.project_name,
        base_url: req.body.base_url,
        apiToken: token,
        user_id: req.user.id
    }

    try {
        // Insert into Neon
        const result = await ApiService.RegisterAPI(apiData);

        if (result.success) {
            // Return the token
            res.status(200).json({ apiToken: result.data.api_token });
        } else {
            res.status(500).json({ error: result.message });
        }
    } catch (error) {
        res.status(500).json({ error: 'Unexpected server error', details: error.message });
    }
}


// adjust to protect from OTHER LOGGED IN users
const GetAnalytics = async (req, res) => {
    const apiID = req.params.apiID

    console.log(`Fetching analytics for ID: ${apiID}`)

    const result = await ApiService.GetAnalytics(apiID)

    if (result.error != null) {
        res.status(500).json("Error fetching analytics")
    }
    
    res.status(200).json(result)

}

module.exports = {
    GetAPIs,
    GetAnalytics,
    RegisterAPI
}
// import API Service
const ApiService = require('./apis.service')


const GetAnalytics = async (req, res) => {
    const apiID = req.params.apiID

    console.log(`Fetching analytics for ID: ${apiID}`)

    const result = await ApiService.GetAnalytics(apiID)
    
    res.status(200).json(result)

}


module.exports = {
    GetAnalytics
}
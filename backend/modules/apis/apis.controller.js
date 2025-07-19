// import API Service


// controller functions
const TestAPI = async (req, res, next) => {
    console.log("Testing")

    // call service

    res.status(200).json("Testing")
}


module.exports = {
    TestAPI
}
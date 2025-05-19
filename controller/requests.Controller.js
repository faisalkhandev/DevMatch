


async function connection(req, res) {

    const userId = req.userId

    res.json({
        message: "Hello Connection"
    })
}




module.exports = {
    connection
}
var express = require('express')
var router = express()

let catchError = (error) => {
    console.error(error)
}

router.post('/', function(req, res) {
    let sql = "UPDATE logged SET logout = 1 WHERE userid = ?;"
    connection.query(sql, [req.session.connected.id], (error, pic) => {
        if (error) throw error
    })
    req.session.destroy()
    res.redirect('/')
})

module.exports = router
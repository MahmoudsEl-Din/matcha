let catchError = (error) => {
    console.error(error)
}

class User {
    static GetAllById(id){
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM users WHERE id = ?"
            connection.query(sql, id, (error, results) => {
                if (error)
                    reject(error)
                else if (results[0])
                    resolve(results[0])
                resolve(undefined)
            })
        })
    }
    
    static GetIdByUsername(username){
        return new Promise((resolve, reject) => {
            let sql = "SELECT id FROM users WHERE username = ?"
            connection.query(sql, username, (error, results) => {
                if (error)
                    reject(error)
                else if (results[0])
                    resolve(results[0]['id'])
                resolve(undefined)
            })
        })
    }
}

module.exports = User
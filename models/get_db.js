let catchError = (error) => {
    console.error(error)
}

class GetDb {
    static TagList(){
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM tag_list;"
            connection.query(sql, (error, results) => {
                if (error)
                    reject(error)
                else if (results[0])
                    resolve(results[0])
                else
                    resolve(undefined)
            })
        })
    }

}
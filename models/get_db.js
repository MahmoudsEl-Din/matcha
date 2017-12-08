var Tools = require('./tools')

let catchError = (error) => {
    console.error(error)
}

class GetDb {
    static TagList(str_search){
        console.log('str_search ' + str_search)
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM tag_list;"
            connection.query(sql, (error, results) => {
                if (error)
                    reject(error)
                else if (results[0]){
                    Tools.SelectInArray(results, 'tag_name', str_search)
                    .then((sorted_array) => {
                        console.log('sorted_array\n')                        
                        console.log(sorted_array)
                        resolve(sorted_array)
                    }).catch(catchError)
                }
                // else if (results[0])
                    // resolve(results)
                else
                    resolve(undefined)
            })
        })
    }
}

module.exports = GetDb
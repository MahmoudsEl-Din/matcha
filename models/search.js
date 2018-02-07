const fs = require('fs')
const Tools = require('./tools')
const AddDb = require('./add_db')
const Check = require('./check')
const publicIp = require('public-ip')
const where = require('node-where')
const User = require('./user')

let catchError = error => {
    console.error(error)
}

class Search extends User {
    
    static getAroundMe(ulat, ulng, gRange) {
        console.log(gRange)
        return new Promise((res,rej) => {
            const delta = gRange / (111.1 / Math.cos(ulat * 180 / Math.PI))
            let lngMax = ulng - delta
            let lngMin = ulng + delta
            const dist = gRange / 111.1
            let latMin = ulat - dist
            let latMax = ulat + dist
            let temp = undefined
            if (latMin > latMax) {
                temp = latMin
                latMin = latMax
                latMax = temp
            }
            if (lngMin > lngMax) {
                temp = lngMin
                lngMin = lngMax
                lngMax = temp
            }                                
            console.log()
            const geoArray = [ulat, ulng, latMin, latMax, lngMin, lngMax]
            res(geoArray) 
        })
    }

    static getOrder(order) {
        return new Promise ((res, rej) => {       
            let ret = undefined
            if (order == 0)
                ret = "ORDER BY pop"
            else if (order == 1)
                ret = "ORDER BY age ASC"
            else if (order == 2)
                ret = "ORDER BY age DESC"
            else if (order == 3)
                ret = "ORDER BY pop ASC"
            else if (order == 4)
                ret = "ORDER BY pop DESC"
            else if (order == 5)
                ret = "ORDER BY distance ASC"
            else if (order == 6)
                ret = "ORDER BY distance DESC"
            else if (order == 7)
                ret = "ORDER BY common_interest ASC"
            else if (order == 8)
                ret = "ORDER BY common_interest DESC"
            res(ret)
        })
    }

    static getMyTarget(genre, desire) {
        return new Promise (
            (res, rej) => {
                let target = undefined
                if (genre === 'M' && desire === 'M')
                    target = "(genre = 'M' AND (desire = 'M' OR desire = 'B'))"
                else if (genre === 'M' && desire === 'F')
                    target = "(genre = 'F' AND  (desire = 'M' OR desire = 'B'))"
                else if (genre === 'M' && desire === 'B')
                    target = "((genre = 'M' AND (desire = 'M' OR desire = 'B')) OR (genre = 'F' AND  (desire = 'M' OR desire = 'B')))"
                else if (genre === 'F' && desire === 'M')
                    target = "(genre = 'M' AND (desire = 'F' OR desire = 'B'))"
                else if (genre === 'F' && desire === 'F')
                    target = "(genre = 'F' AND (desire = 'F' OR desire = 'B'))"
                else if (genre === 'F' && desire === 'B')
                    target = "((genre = 'F' AND (desire = 'F' OR desire = 'B')) OR (genre = 'M' AND (desire = 'F' OR desire = 'B')))"
                // console.log(target)
                res(target)
            })
        }

    static theBigSearch(params, uid) {
        return new Promise((resolve, reject) => {
            User.GetAllById(uid)
            .then(user_info => {
                return Promise.all([
                    user_info, 
                    this.getAroundMe(user_info['lat'], user_info['lng'], params.geoRange), 
                    this.getMyTarget(user_info['genre'], user_info['desire']),
                    this.getOrder(params.order)
                ])
            }).then(misc => {
                const age = JSON.parse(params.ageRange)
                const pop = JSON.parse(params.popRange)
                const geoArray = misc[1]
                const sql2 = misc[2]
                params.order = misc[3]
                let sql = "\
                SELECT users.id, username, name, lastname, age, bio, genre, desire,\
                (6371 * acos(cos(radians(?)) * cos(radians(lat) ) * cos(radians(lng) - radians(?)) + sin(radians(?)) * sin(radians(lat)))) AS distance,\
                pop,\
                COALESCE((SELECT count(tag_name) FROM tags WHERE userid = users.id AND tag_name IN (SELECT tag_name FROM tags WHERE userid = ?) GROUP BY userid),0) AS common_interest\
                FROM users\
                INNER JOIN tags ON tags.userid = users.id\
                WHERE\
                 lat BETWEEN ? AND ?\
                 AND lng BETWEEN ? AND ?\
                 AND users.id != ? AND "
                
                let sql3 = "  \
                AND age BETWEEN ? AND ? \
                AND pop BETWEEN ? AND ? \
                GROUP BY users.id \
                HAVING distance < ? "
                + params.order + 
                " LIMIT ?;"
                
                console.log("\
                SELECT name, lastname, age, bio, genre, users.id, desire, \
                (6371 * acos(cos(radians("+geoArray[0]+")) * cos(radians(lat) ) * cos(radians(lng) - radians("+geoArray[1]+")) + sin(radians("+geoArray[0]+")) * sin(radians(lat)))) AS distance, \
                pop, \
                (SELECT count(tag_name) \
                FROM tags \
                WHERE userid = users.id AND tag_name IN \
                (SELECT tag_name WHERE userid ="+uid+") \
                GROUP BY userid) AS common_interest\
                FROM users \
                WHERE\
                 lat BETWEEN "+geoArray[2]+" AND "+geoArray[3]+" \
                 AND lng BETWEEN "+geoArray[4]+" AND "+geoArray[5]+" \
                 AND users.id != "+uid+" AND "+sql2+"  \
                 AND age BETWEEN "+age[0]+" AND "+age[1]+" \
                 AND pop BETWEEN "+pop[0]+" AND "+pop[1]+" \
                 HAVING distance < "+params.geoRange + 
                 + " " + params.order + 
                " LIMIT "+ params.page * 10 +";" + "\n")
              
                connection.query(sql + sql2 + sql3, 
                    [geoArray[0], geoArray[1], geoArray[0], uid, geoArray[2], geoArray[3], geoArray[4], geoArray[5], 
                    uid, age[0], age[1], pop[0], pop[1], params.geoRange, params.page * 10], 
                    (error, results) => {
                    if (error)
                        reject(error)
                    else if (!results || results.length == 0) {
                        resolve("Votre recherche ne match aucun profil")
                    } else
                        resolve(results)
                })
            }).catch(catchError)
        })
    }
}

module.exports = Search
var fs = require('fs')
var Tools = require('./tools')
var AddDb = require('./add_db')
var Check = require('./check')
const publicIp = require('public-ip');
var where = require('node-where');

let catchError = (error) => {
    console.error(error)
}

class User {

    static ChangeFirstName(userid, new_firstname) {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE users SET name = ? WHERE id = ?;"
            connection.query(sql, [new_firstname, userid], (error, results) => {
                if (error)
                    reject(error)
                resolve(true)
            })
        })
    }

    static ChangeLastName(userid, new_lastname) {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE users SET lastname = ? WHERE id = ?;"
            connection.query(sql, [new_lastname, userid], (error, results) => {
                if (error)
                    reject(error)
                resolve(true)
            })
        })
    }

    static ChangeEmail(userid, new_email) {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE users SET email = ? WHERE id = ?;"
            connection.query(sql, [new_email, userid], (error, results) => {
                if (error)
                    reject(error)
                resolve(true)
            })
        })
    }

    static ChangeGender(userid, new_gender) {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE users SET genre = ? WHERE id = ?;"
            connection.query(sql, [new_gender, userid], (error, results) => {
                if (error)
                    reject(error)
                resolve(true)
            })
        })
    }

    static ChangeDesire(userid, new_desire) {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE users SET desire = ? WHERE id = ?;"
            connection.query(sql, [new_desire, userid], (error, results) => {
                if (error)
                    reject(error)
                resolve(true)
            })
        })
    }

    static ChangeBio(userid, new_bio) {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE users SET bio = ? WHERE id = ?;"
            connection.query(sql, [new_bio, userid], (error, results) => {
                if (error)
                    reject(error)
                resolve(true)
            })
        })
    }

    static ChangePassword(userid, password){
        return new Promise((resolve, reject) => {
            Tools.HashPassword(password)
            .then((hash) => {
                let sql = "UPDATE users SET password = ? WHERE id = ?;"
                connection.query(sql, [hash, userid], (error, results) => {
                    if (error)
                        reject(error)
                    resolve(true)
                })
            })
        })
    }

    static ChangeAge(userid, new_age) {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE users SET name = ? WHERE id = ?;"
            connection.query(sql, [new_age, userid], (error, results) => {
                if (error)
                    reject(error)
                resolve(true)
            })
        })
    }

    static ResetEmail(id, link){
        return new Promise((resolve, reject) => {
            var code = Tools.RandomString()
            Tools.CreateCode(id, code, 2)
            .then((status) => {
                if (status){
                    return User.GetAllById(id)
                }
                reject()
            }).then((user) => {
                Tools.SendMail(user['email'], "Matcha: password reset","Hi " + user['username'] + ",\nTo reset your password click this link :\n" + link + code)
                resolve(true)
            }).catch(catchError)
        })
    }

    static IdExists(id) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM users WHERE id = ?"
            connection.query(sql, id, (error, results) => {
                if (error)
                    reject(error)
                else if (results[0])
                    resolve(true)
                else
                    resolve(false)
            })
        })
    }

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

    static GetIdByEmail(email){
        return new Promise((resolve, reject) => {
            let sql = "SELECT id FROM users WHERE email = ?"
            connection.query(sql, email, (error, results) => {
                if (error)
                    reject(error)
                else if (results[0])
                    resolve(results[0]['id'])
                resolve(undefined)
            })
        })
    }

    static GetIdByUsername(username){
        return new Promise((resolve, reject) => {
            let sql = "SELECT id FROM users WHERE username = ?"
            connection.query(sql, [username], (error, results) => {
                if (error)
                    reject(error)
                else if (results[0])
                    resolve(results[0]['id'])
                resolve(undefined)
            })
        })
    }

    static GetTags(id){
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM tags WHERE userid = ?"
            connection.query(sql, [id], (error, results) => {
                if (error)
                    reject(error)
                else if (results[0])
                    resolve(results)
                resolve(undefined)
            })
        })
    }

    static HasTag(userid, tag_name){
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM tags WHERE userid = ? AND tag_name = ?"
            connection.query(sql, [userid, tag_name], (error, results) => {
                if (error)
                    reject(error)
                else if (results[0])
                    resolve(true)
                resolve(false)
            })
        })
    }

    static AddTag(new_tag, userid){
        return new Promise((resolve, reject) => {
            this.HasTag(userid, new_tag)
            .then((has_tag) => {
                if (has_tag === false) {
                    let sql = "INSERT INTO tags VALUES(null, ?, ?);"
                    connection.query(sql, [userid, new_tag], (error, results) => {
                        if (error)
                        reject(error)
                        else {
                            AddDb.NewTagListIfNotExists(new_tag)
                            .then((new_tag_in_list) => {
                                if (new_tag_in_list)
                                    resolve([true, 'new_list'])
                                else
                                    resolve([true, 'same_list'])
                            }).catch(catchError)
                        }
                    })
                }
                else 
                    resolve([false, ''])
            }).catch(catchError)
            
        })
    }

    static DelTag(tag_name, userid){
        return new Promise((resolve, reject) => {
            this.HasTag(userid, tag_name)
            .then((has_tag) => {
                if (has_tag === true) {
                    let sql = "DELETE FROM tags WHERE userid = ? AND tag_name = ?;"
                    connection.query(sql, [userid, tag_name], (error, results) => {
                        if (error)
                        reject(error)
                        else                         
                            resolve([true, tag_name])
                    })
                }
                else 
                    resolve([false, ''])
            }).catch(catchError)
        })
    }

    static GetAllPictures(userid) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM pictures WHERE userid = ? ORDER BY position;"
            connection.query(sql, [userid], (error, results) => {
                if (error)
                reject(error)
                else                         
                    resolve(results)
            })
        })
    }
    
    static AddPicture(userid, filename){
        return new Promise((resolve, reject) => {
            this.GetAllPictures(userid)
            .then((results) => {
                let position = results.length + 1;
                if (position > 5) {
                    fs.unlink(__dirname.replace('models', 'public/pictures/') + filename, function(error){
                        if (error) throw error
                    })
                    return resolve([false, "Already 5 pictures"])
                }
                else {
                    let sql = "INSERT INTO pictures VALUES(null, ?, ?, ?);"
                    connection.query(sql, [userid, filename, position], (error, results) => {
                        if (error)
                            reject(error)
                        else                         
                            resolve([true, position])
                    })
                }
                console.log(results)
            }).catch(catchError)
        })
    }

    static RemovePicture(userid, position) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM pictures WHERE position = ? AND userid = ?;"
            connection.query(sql, [position, userid], (error, pic) => {
                if (error)
                    reject(error)
                else if (pic[0]){  
                    let sql = "DELETE FROM pictures WHERE position = ? AND userid = ?;"
                    connection.query(sql, [position, userid], (error, results) => {
                        if (error)
                            reject(error)
                        else {                         
                            fs.unlink(__dirname.replace('models', 'public/pictures/') + pic[0]['picture_name'], function(error){
                                if (error) throw error
                            })
                            for(var i = position; i <= 5; i++) {
                                console.log('i = '+i+'\n')
                                let sql = "UPDATE pictures SET position = ? WHERE position = ? AND userid = ?;"
                                connection.query(sql, [i - 1, i, userid], (error, results) => {
                                    if (error)
                                        reject(error)
                                })
                            }
                            resolve(true)
                        }
                    })
                }
                else
                    reject()
            })
        })
    }

    static SetProfilPicture(userid, position) {
        return new Promise((resolve, reject) => {
            console.log(position)
            Check.PictureExists(userid, position)
            .then((exists) => {
                if (!exists)
                    return resolve([false, null])
                let sql = "UPDATE pictures SET position = 10 WHERE position = 1 AND userid = ?;"
                connection.query(sql, [userid], (error, pic) => {
                    if (error)
                        reject(error)
                    else {
                        let sql = "UPDATE pictures SET position = 1 WHERE position = ? AND userid = ?;"
                        connection.query(sql, [position, userid], (error, pic) => {
                            if (error)
                                reject(error)
                            else {
                                let sql = "UPDATE pictures SET position = ? WHERE position = 10 AND userid = ?;"
                                connection.query(sql, [position, userid], (error, pic) => {
                                    if (error)
                                        reject(error)
                                    else
                                        resolve([true, null])        
                                })
                            }
                        })  
                    }
                })
            }).catch(catchError)
        })
    }

    static SetPosByIp(userid) {
        return new Promise((resolve, reject) => {
            publicIp.v4()
            .then(ip => {
                where.is(ip, function(err, result) {
                    if (result) {
                      console.log('Lat: ' + result.get('lat'));
                      console.log('Lng: ' + result.get('lng'));
                      let lat = result.get('lat')                      
                      let lng = result.get('lng')
                      let sql = "UPDATE users SET lat = ?, lng = ? WHERE id = ?;"
                      connection.query(sql, [lat, lng, userid], (error, pic) => {
                          if (error)
                              reject(error)
                          else {
                              resolve(true);
                          }
                      })
                    }
                  });
            }).catch(catchError)
        })
    }

    static SetPosByCoord(userid, lat, lng) {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE users SET lat = ?, lng = ? WHERE id = ?;"
            connection.query(sql, [lat, lng, userid], (error, pic) => {
                if (error)
                    reject(error)
                else {
                    resolve(true);
                }
            })
        })
    }

    static ResetTimer(userid) {
        if (userid) {
            let time = (new Date).getTime();
            let sql = "UPDATE logged SET time = ?, logout = 0 WHERE userid = ?;"
            connection.query(sql, [time, userid], (error, pic) => {
                if (error) throw error
            })            
        }
    }

    static IsBlocked(uid, uid_target) {
        return new Promise((resolve, reject) => {
            if (uid && uid_target) {
                let sql = "SELECT * FROM blocked WHERE uid = ? AND uid_target = ?;"
                connection.query(sql, [uid, uid_target], (error, result) => {
                    if (error) throw error
                    if (result[0])
                        resolve(true)
                    else
                        resolve(false)
                })            
                    
            }
        })
    }

    static GetTime(uid) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM logged WHERE userid = ?;"
            connection.query(sql, [uid], (error, result) => {
                if (error) throw error
                if (result[0])
                    resolve(result)
                else
                    resolve(undefined)
            })            
        })
    }

    static ReportBlock(uid, uid_target, type) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM " + type + " WHERE uid = ? AND uid_target = ?;"
            connection.query(sql, [ uid, uid_target], (error, result) => {
                if (error) throw error
                if (result[0])
                    return resolve([false, 'User already ' + type])
                let sql = "INSERT INTO " + type +" VALUES(NULL, ?, ?);"
                connection.query(sql, [uid, uid_target], (error, result) => {
                    if (error) throw error
                    resolve([true, undefined])
                })         
            })
        })
    }

    static IsLiking(uid, uid_target) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM likes WHERE uid = ? AND uid_target = ?;"
            connection.query(sql, [uid, uid_target], (error, result) => {
                if (error) throw error
                if (result[0])
                    resolve(true)
                else
                    resolve(false)
            })
        })
        
    }

    static Like(uid, uid_target) {
        return new Promise((resolve, reject) => {
            let ret = undefined
            let sql = "SELECT * FROM pictures WHERE userid = ? AND position = 1;"                    
            connection.query(sql, [uid], (error, result) => {
                console.log(result)
                if (!result[0])
                    return resolve('You have no profile picture')
                this.IsLiking(uid, uid_target)
                .then((liking) => {
                let sql = undefined
                if (liking) {
                    sql = "DELETE FROM likes WHERE uid = ? AND uid_target = ?;"                    
                    ret = [true, 'User already']
                    return [sql, ret]                            
                }
                else {
                    sql = "INSERT INTO likes VALUES(NULL, ?, ?);"                    
                    ret = [false, 'User already']
                    return [sql, ret]                                    
                }
                }).then((ret) => {
                    connection.query(ret[0], [uid, uid_target], (error, result) => {
                        if (error) throw error
                        resolve(ret[1])
                })         
                }).catch(catchError)
            })
        })
    }

    static getMyChoice(uid) {
        return new Promise((resolve, reject) => {
            this.GetAllById(uid)
            .then(user_info => {
                let sql2 = undefined
                if (user_info['desire'] === 'M' && user_info['genre'] === 'M')
                    sql2 = '(genre = "M" AND (desire = "M" OR desire = "B"))) AS B;'
                else if (user_info['desire'] === 'F' && user_info['genre'] === 'M')
                    sql2 = '(genre = "F" AND (desire = "M" OR desire = "B"))) AS B;'
                else if (user_info['desire'] === 'F' && user_info['genre'] === 'F')
                    sql2 = '(genre = "F" AND (desire = "F" OR desire = "B"))) AS B;'
                else if (user_info['desire'] === 'M' && user_info['genre'] === 'F')
                    sql2 = '(genre = "M" AND (desire = "F" OR desire = "B"))) AS B;'
                else if (user_info['desire'] === 'B' && user_info['genre'] === 'M')
                    sql2 = '((genre = "F" AND (desire = "M" OR desire = "B")) OR (genre = "M" AND (desire = "M" OR desire = "B")))) AS B;'
                else if (user_info['desire'] === 'B' && user_info['genre'] === 'F')
                    sql2 = '((genre = "F" AND (desire = "F" OR desire = "B")) OR (genre = "M" AND (desire = "F" OR desire = "B")))) AS B;'
                return (sql2)
            })
            .catch(catchError)
        })
    }
    
    static getAroundMe(ulat, ulng, range, uid) {
        console.log("getAroundMe")
        return new Promise((resolve, reject) => {
            this.getMyChoice(uid)
            .then(sql2 => {
                console.log("hey there")
                const delta = range / (Math.abs((Math.cos((ulat * Math.PI / 180) * 111))))
                const lngMin = ulng - delta
                const lngMax = ulng + delta
                const dist = range / 111
                const latMin = ulat - dist
                const latMax = ulat + dist
                console.log(lngMin + ' ' + lngMax + ' ' + latMin + ' ' + latMax)
                let sql = "SELECT * , (6371 * acos(cos(radians(?)) * cos(radians(lat) ) * cos(radians(lng) - radians(?)) + sin(radians(?)) * sin(radians(lat)))) AS distance FROM users WHERE lat BETWEEN ? AND ? AND lng BETWEEN ? AND ?  AND WHERE HAVING distance < ? ORDER BY distance, SELECT WHERE;"
                connection.query(sql, [ulng, ulat, ulng, latMin, latMax, lngMin, lngMax, range], (error, results) => {
                    if (error) {
                        console.log(error)
                        reject(error)
                    }
                    else if (results[0]) {
                        console.log(results)
                        resolve(results[0])
                    }
                    resolve(undefined)
                })
            })
            .catch(catchError)
        })
    }

    static GetPopularity(uid) {
        return new Promise((resolve, reject) => {    
            this.getMychoiced(uid)
            .then(sql2 => {
                let sql = "SELECT A.field/B.field AS pop FROM (SELECT count(*) AS field FROM likes WHERE uid_target = ?) AS A, (SELECT count(*) AS field FROM users WHERE "
                if (sql2 != undefined) {
                    connection.query(sql + sql2, [uid], (error, result) => {
                        if (error) throw error
                        if (Number(result[0].pop) > 1)
                            result[0].pop = 1
                        resolve(result[0])
                    })
                }
                else
                    resolve("Has to select a genre")
            })
        })
    }
}

module.exports = User
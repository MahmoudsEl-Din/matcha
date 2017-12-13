var fs = require('fs')
var Tools = require('./tools')
var AddDb = require('./add_db')
var Check = require('./check')
const publicIp = require('public-ip');

var geoip = require('geoip-lite');


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
            publicIp.v4().then(ip => {
                var geo = geoip.lookup(ip);
                
                console.log('\n GEOIP:' + geo.ll);
                
                console.log('\n SATELIZE:');                
                satelize.satelize({ip:ip}, function(err, payload) {
                    console.log(payload)
                  });
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
            })
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
}

module.exports = User
import { v4 } from 'public-ip'
const sqlLoader = require("sql-loader")

class init_db {
    constructor() {
        this.mysql = require('mysql')
        this.connection = this.mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : 'qwerty'
        })

        this.connection.connect((error) => {
            if (error) throw error
        })

        this.connection.query('CREATE DATABASE IF NOT EXISTS matcha_db;', (error) => {
            if (error) throw error
        })
        this.connection.query('USE matcha_db;', (error) => {
            if (error) throw error
        })

        this.connection.query('CREATE TABLE IF NOT EXISTS users('
            + 'id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
            + 'username VARCHAR(250) NOT NULL,'
            + 'name VARCHAR(250) NOT NULL,'
            + 'password VARCHAR(250) NOT NULL,'
            + 'lastname VARCHAR(250) NOT NULL,'
            + 'email VARCHAR(250) NOT NULL,'
            + 'genre VARCHAR(2) NOT NULL,'
            + 'desire VARCHAR(2) NOT NULL,'
            + 'bio VARCHAR(250) NOT NULL,'
            + 'age INT NOT NULL,'            
            + 'lat decimal(38, 16) NOT NULL,'
            + 'lng decimal(38, 16) NOT NULL,'
            + 'pop INT, CHECK (pop BETWEEN 0 AND 100)'
            + ');', (error) => {
                if (error) throw error
        })
      
        this.connection.query('CREATE TABLE IF NOT EXISTS code('
            + 'id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
            + 'userid INT NOT NULL,'
            + 'code VARCHAR(250) NOT NULL,'
            + 'type INT NOT NULL'
            + ');', (error) => {
                if (error) throw error
        })

        this.connection.query('CREATE TABLE IF NOT EXISTS tags('
        + 'id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
        + 'userid INT NOT NULL,'
        + 'tag_name VARCHAR(250) NOT NULL'
        + ');', (error) => {
            if (error) throw error
        })

        this.connection.query('CREATE TABLE IF NOT EXISTS tag_list('
        + 'id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
        + 'tag_name VARCHAR(250) NOT NULL'
        + ');', (error) => {
            if (error) throw error
        })

        this.connection.query('CREATE TABLE IF NOT EXISTS pictures('
        + 'id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
        + 'userid INT NOT NULL,'        
        + 'picture_name VARCHAR(250) NOT NULL,'
        + 'position INT NOT NULL'
        + ');', (error) => {
            if (error) throw error
        })

        this.connection.query('CREATE TABLE IF NOT EXISTS logged('
        + 'id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
        + 'userid INT NOT NULL,'        
        + 'time BIGINT NOT NULL,'
        + 'logout INT NOT NULL'
        + ');', (error) => {
            if (error) throw error
        })

        this.connection.query('CREATE TABLE IF NOT EXISTS blocked('
        + 'id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
        + 'uid INT NOT NULL,'        
        + 'uid_target INT NOT NULL'
        + ');', (error) => {
            if (error) throw error
        })

        this.connection.query('CREATE TABLE IF NOT EXISTS reported('
        + 'id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
        + 'uid INT NOT NULL,'        
        + 'uid_target INT NOT NULL'
        + ');', (error) => {
            if (error) throw error
        })

        this.connection.query('CREATE TABLE IF NOT EXISTS likes('
        + 'id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
        + 'uid INT NOT NULL,'   
        + 'uid_target INT NOT NULL'
        + ');', (error) => {
            if (error) throw error
        })

        let sql = "SELECT * FROM users;"
        this.connection.query(sql, (error, results) => {
            if (error) throw error
            if (results.length === 0) {
                sql = sqlLoader("./user.sql")
                this.connection.query(sql, (error) => {
                    if (error) throw error
                })
                sql = "INSERT INTO `tag_list` (`tag_name`) VALUES ('sexy'), ('cheum'), ('bardot'), ('hashtag'), ('boucherie')" +
                ";" 
                this.connection.query(sql, (error) => {
                if (error) throw error
            })
            }
        })
        global.connection = this.connection
    }
}

module.exports = init_db
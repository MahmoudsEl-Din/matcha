
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
            + 'lng decimal(38, 16) NOT NULL'
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

        this.connection.query('CREATE TABLE IF NOT EXISTS notif('
        + 'id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
        + 'uid INT NOT NULL,'   
        + 'uid_sender INT,'
        + 'type INT NOT NULL,'
        + 'data VARCHAR(250),'
        + 'shown INT NOT NULL'
        + ');', (error) => {
            if (error) throw error
        })

        this.connection.query('CREATE TABLE IF NOT EXISTS sockets('
        + 'id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
        + 'uid INT NOT NULL,'   
        + 'socket_id VARCHAR(50) NOT NULL,'
        + 'session_id VARCHAR(50) NOT NULL'
        + ');', (error) => {
            if (error) throw error
        })

        this.connection.query('CREATE TABLE IF NOT EXISTS history('
        + 'id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
        + 'uid INT NOT NULL,'   
        + 'uid_visitor INT NOT NULL'
        + ');', (error) => {
            if (error) throw error
        })

        let sql = "SELECT * FROM users;"
        this.connection.query(sql, (error, results) => {
            if (error) throw error
            if (results.length === 0) {
                sql = "INSERT INTO `users` (`id`, `username`, `name`, `password`, `lastname`, `email`, `genre`, `desire`, `bio`, `age`, `lat`, `lng`) VALUES" +
                    "(1, 'bgdu75', 'Kev', 'e8bf9bc2b848f897f3c3471a4a9a1ebe571d3fb386081a9e048dde4981000d974c0bcfe43eefec1b244471e9cb193e8b0331209e0007bae607c1b977eb079ebc', 'Dupont', 'emailtest@gmail.com', 'M', 'F', 'It is a test of a bio written by a test user', 19,45.745725, 4.839478)," +
                    "(2, 'jm', 'Jean Miche', '3fa8f47591f813a163493ba2e89c611e021975203aae23c25da91bfa65e9561f508b6ea672c47f7cfce7d1d93a8921caae6cd4d2464dac8add911480cabdbfc4', 'Sabourin', 'jean_miche@mailinator.com', 'M', 'B', 'I would like to meet nice girls or men', 56,45.845725, 4.939478)," + //mdp = Test1234
                    "(3, 'XXXchodasseXXX', 'Larmina', '7ed9b47667f9fce65267d084dc295a1a95cdba72cc5529df6fc0c585f75f28d8641b49a00d2d31f4fe3744647b620b898d5d2c6952bc410597ed6171dbeba2e8', 'Patel', 'larmina@mailinator.com', 'F', 'B', 'Meuf chaude de ta région au 83232', 24,45.74525, 4.834478)," + //mdp = Larmina777       
                    "(4, 'Nature66', 'Sylvestre', '5c19f94a0621832c5cb0c206b2395497c2692a1942466b9b909d477833b9ec76af0cfb5a1787b87a68c9bb5097e13e7dbf4d7db36b128068117ce0b3f1d04c8b', 'Foret', 's.foret@mailinator.com', 'M', 'F', 'Les arbres et le quinoa et pourquoi pas des femmelles de la foret', 32,45.74525, 4.834478)," + //mdp = rAtOnLAVEUR888
                    "(5, 'Lucielaouf', 'Lucie', 'f5df468b0b927da659265c05988bdb8b8ed54e1abc21770215e6f381feaaa6080d06ac3e3ec7a9ab0d7bdab953849ea2151752f3b66c04fb11f1e94c0aaa7a5a', 'Mailly', 'lucie@mailinator.com', 'F', 'F', 'Coucou, moi c lucie je cherche des filles sympa pour discuter et peut etre plus. Bisous', 27,45.74545, 4.834478)," + //mdp = Lulu123456789                                               
                    "(6, 'Botozo', 'Audric', '876b1d2a8ff6ed427770d3351d824a4e2230d52a5cd73f4bd979cb600a2df87da55601e242d792fa255befcad8fc59a23df859f448ae66ada580a7f6cb3522b5', 'Proulx', 'botozo78@mailinator.com', 'M', 'M', 'Cherche partenaire serieux pour choses', 45,45.764043, 4.835759)," + //mdp = Lolcat78                                               
                    "(7, 'LeaPassionCheval', 'Lea', '450a3792b22bfdae3bd8c144507d90ac08f4368168d63871b90187bb06ed59ab55dbf099a73f8b37f293353e5302fc967d57612766bc72e203392296548978dc', 'Blanc', 'cheval.love@mailinator.com', 'F', 'M', 'Si t un cheval like moi', 24,43.593909, 4.468983)" + //mdp = ChevalAmour6                                                                
                    // "(8, 'Chocovore', 'Nestor', 'a5cb4fbf5ee800aa767fc246cf2cbf441001de79bb57cf9b96ca6504c0daf9b43771c30529f6bb8ac56907f47606c5b8b6b5bc62e69e9006c08514c4afb09c28', 'Voisine', 'nestle@mailinator.com', 'F', 'M', 'Si t un cheval like moi', 24,45.764043, 4.835659)," + //mdp = ChevalAmour6                                                                
                    // "(9, 'Chocovore', 'Nestor', 'a5cb4fbf5ee800aa767fc246cf2cbf441001de79bb57cf9b96ca6504c0daf9b43771c30529f6bb8ac56907f47606c5b8b6b5bc62e69e9006c08514c4afb09c28', 'Voisine', 'nestle@mailinator.com', 'F', 'M', 'Si t un cheval like moi', 24,45.764043, 4.835659)" + //mdp = ChevalAmour6                                                                                    
                    ";" 
                this.connection.query(sql, (error) => {
                    if (error) throw error
                })

                sql = "INSERT INTO `tag_list` (`tag_name`) VALUES ('sexy'), ('cheum'), ('ivrogne'), ('hashtag'), ('boucherie'), ('blonde'), ('brune'), ('ROUSSE'), ('Jacques')" +
                ";" 
                this.connection.query(sql, (error) => {
                    if (error) throw error
                })

                sql = "INSERT INTO `notif` VALUES"+
                    "(1, 6, 2, 1, NULL, 1)," +
                    "(2, 6, 2, 2, NULL, 0)" +                    
                ";" 
                this.connection.query(sql, (error) => {
                    if (error) throw error
                })
                
                sql = "INSERT INTO `sockets` VALUES"+
                    "(1, 1, 'fffff', 'fffff')," +
                    "(2, 2, 'fffff', 'fffff')," +
                    "(3, 3, 'fffff', 'fffff')," +
                    "(4, 4, 'fffff', 'fffff')," +
                    "(5, 5, 'fffff', 'fffff')," +
                    "(6, 6, 'fffff', 'fffff')," +
                    "(7, 7, 'fffff', 'fffff')" +                    
                ";" 
                this.connection.query(sql, (error) => {
                    if (error) throw error
                })

                sql = "INSERT INTO `logged` VALUES" +
                    "(1, 1, 0, 1)," +
                    "(2, 2, 0, 1)," +
                    "(3, 3, 0, 1)," +
                    "(4, 4, 0, 1)," +
                    "(5, 5, 0, 1)," +
                    "(6, 6, 0, 1)," +
                    "(7, 7, 0, 1)" +
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
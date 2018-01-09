
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

        let sql = "SELECT * FROM users;"
        this.connection.query(sql, (error, results) => {
            if (error) throw error
            if (results.length === 0) {
                sql = "INSERT INTO `users` (`id`, `username`, `name`, `password`, `lastname`, `email`, `genre`, `desire`, `bio`, `age`, `lat`, `lng`) VALUES" +
                "(1, 'bgdu75', 'Kev', 'e8bf9bc2b848f897f3c3471a4a9a1ebe571d3fb386081a9e048dde4981000d974c0bcfe43eefec1b244471e9cb193e8b0331209e0007bae607c1b977eb079ebc', 'Dupont', 'emailtest@gmail.com', 'M', 'F', 'It is a test of a bio written by a test user', 19, 48.842368, 2.366695)," + //Paris
                "(2, 'jm', 'Jean Miche', '3fa8f47591f813a163493ba2e89c611e021975203aae23c25da91bfa65e9561f508b6ea672c47f7cfce7d1d93a8921caae6cd4d2464dac8add911480cabdbfc4', 'Sabourin', 'jean_miche@mailinator.com', 'M', 'B', 'I would like to meet nice girls or men', 56, 48.863829, 2.368069)," + //mdp = Test1234 Paris
                "(3, 'XXXchodasseXXX', 'Larmina', '7ed9b47667f9fce65267d084dc295a1a95cdba72cc5529df6fc0c585f75f28d8641b49a00d2d31f4fe3744647b620b898d5d2c6952bc410597ed6171dbeba2e8', 'Patel', 'larmina@mailinator.com', 'F', 'B', 'Meuf chaude de ta région au 83232', 24, 48.785675, 2.543335)," + //mdp = Larmina777 Chatou     
                "(4, 'Nature66', 'Sylvestre', '5c19f94a0621832c5cb0c206b2395497c2692a1942466b9b909d477833b9ec76af0cfb5a1787b87a68c9bb5097e13e7dbf4d7db36b128068117ce0b3f1d04c8b', 'Foret', 's.foret@mailinator.com', 'M', 'F', 'Les arbres et le quinoa et pourquoi pas des femelles de la foret', 32, 45.232651, 5.196533)," + //mdp = rAtOnLAVEUR888 Lyon
                "(5, 'Lucielaouf', 'Lucie', 'f5df468b0b927da659265c05988bdb8b8ed54e1abc21770215e6f381feaaa6080d06ac3e3ec7a9ab0d7bdab953849ea2151752f3b66c04fb11f1e94c0aaa7a5a', 'Mailly', 'lucie@mailinator.com', 'F', 'F', 'Coucou, moi c lucie je cherche des filles sympa pour discuter et peut etre plus. Bisous', 27, 43.587613, 1.446247)," + //mdp = Lulu123456789 Toulouse (musee des augustins suce moi)                                              
                "(6, 'Botozo', 'Audric', '876b1d2a8ff6ed427770d3351d824a4e2230d52a5cd73f4bd979cb600a2df87da55601e242d792fa255befcad8fc59a23df859f448ae66ada580a7f6cb3522b5', 'Proulx', 'botozo78@mailinator.com', 'M', 'M', 'Cherche partenaire serieux pour choses', 45, 45.764043, 4.835759)," + //mdp = Lolcat78  Lyon Cordeliers                                             
                "(7, 'LeaPassionCheval', 'Lea', '450a3792b22bfdae3bd8c144507d90ac08f4368168d63871b90187bb06ed59ab55dbf099a73f8b37f293353e5302fc967d57612766bc72e203392296548978dc', 'Blanc', 'cheval.love@mailinator.com', 'F', 'M', 'Si t un cheval like moi', 24, 43.593909, 4.468983)," + //mdp = ChevalAmour6 Arles Parc Naturel regional de Camargues
                "(8, 'Coucou', 'Hello', '1455336ca87d3d07e7885ba9808f2a44171eef95bdbeeb16266e0d13afe9aeff21786e8bf81a790d328b896ca602ea5cc62fecefdb5a5d9878db6bf9cda3710a', 'tamere', 'coucou.hello@mailinator.com', 'H', 'F', 'Je veux des petites', 65, 48.8582, 2.3387)" + // test user pass ArthurestunC0n 42    
                ";" 
                this.connection.query(sql, (error) => {
                    if (error) throw error
                })
                sql = "INSERT INTO `tag_list` (`tag_name`) VALUES ('sexy'), ('cheum'), ('tesson de bouteille'), ('hashtag'), ('boucherie')" +
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
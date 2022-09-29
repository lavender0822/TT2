var config = {
    //KYDB数据库
    KYDB_mysql_config: {
        host: '127.0.0.1',
        port: 3306,
        database: 'KYDB_NEW',
        user: 'nodejs',
        password: '8TU*#iwEOWziDEkr',
        connectionLimit: 20,
        charset: 'utf8mb4',
        dateStrings: true,
        multipleStatements: true
    },
    //Order_record数据库
    Order_record_mysql_config: {
        host: '127.0.0.1',
        port: 3306,
        database: 'orders_record',
        user: 'nodejs',
        password: '8TU*#iwEOWziDEkr',
        connectionLimit: 20,
        charset: 'utf8mb4',
        dateStrings: true,
        multipleStatements: true
    }
}
module.exports = config;

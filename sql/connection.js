const mysql = require('mysql2')

class Connection {
  constructor() {
    if (!this.pool) {
      console.log('creating connection...')
      this.pool = mysql.createPool({
        connectionLimit: 100,
        host: '34.174.32.67',
        user: 'root',
        password: '+]R,U>L%[CU4Kk_[',
        database: 'admin',
        multipleStatements: true
      })

      return this.pool
    }

    return this.pool
  }
}

const instance = new Connection()

module.exports = instance;
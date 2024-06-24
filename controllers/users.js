const mysql = require('mysql2')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const getAllUsers = (req, res) => {
  // SELECT ALL USERS
  pool.query("SELECT * FROM users u LEFT JOIN usersContact uc ON u.id = uc.user_id LEFT JOIN usersAddress ua ON u.id = ua.user_id", (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getUserById = (req, res) => {
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  let sql = "SELECT * FROM ?? WHERE ?? = ?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ["users", "id", req.params.id])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}



const createUser = (req, res) => {
  
  let sql = "INSERT INTO ?? (??, ??) VALUES (?, ?); SET @userId = LAST_INSERT_ID(); INSERT INTO ?? (??, ??, ??, ??, ??, ??, ??) VALUES (?, @userId, ?, ?, ?, ?, ?); INSERT INTO ?? (??, ??, ??, ??, ??) VALUES (?, @userId, ?, ?, ?)"
  
  sql = mysql.format(sql, ["users", "first_name", "last_name", "The", "Woman", "usersAddress", "id", "user_id", "address", "city", "county", "state", "zip", 787, "100 Scary House", "Glasgow", "Lanarkshire", "Scotland", 40917, "usersContact", "id", "user_id", "phone1", "phone2", "email", 878, "455-456-0987", "463-366-4321", "UGoneNow@abyss.com"])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

// const createUser = (req, res) => {
//   // INSERT INTO USERS FIRST AND LAST NAME 
//   let sql = "INSERT INTO ?? (??, ??) VALUES (?, ?)"
//   // WHAT GOES IN THE BRACKETS
//   sql = mysql.format(sql, ["users", "first_name", "last_name", "Bob", "Loblaw"])

//   pool.query(sql, (err, results) => {
//     if (err) return handleSQLError(res, err)
//     return res.json({ newId: results.insertId });
//   })
// }

const updateUserById = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  let sql = "UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ["users", "first_name", "Lily", "last_name", "Gladstone", "id", req.params.id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteUserByFirstName = (req, res) => {
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
  let sql = "DELETE FROM ?? WHERE ?? = ?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ["users", "first_name", req.params.first_name])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  })
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserByFirstName
}
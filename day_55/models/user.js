/*
//Tư duy model
- Mỗi model sẽ tương ứng với 1 table
- 1 controller có thể có nhiều model
*/

const sql = require("../utils/db");

module.exports = {
  all: (status, keyword) => {
    let filter = sql`WHERE name IS NOT NULL`;
    if (status === "active" || status === "inactive") {
      filter = sql`WHERE status=${status === "active" ? true : false}`;
    }

    if (keyword) {
      filter = sql`${filter} AND (name ILIKE ${
        "%" + keyword + "%"
      } OR email ILIKE ${"%" + keyword + "%"})`;
    }
    return sql`SELECT * FROM users ${filter} ORDER BY id DESC`;
  },

  checkEmail: (value) => {
    console.log("check email");
    return sql`SELECT email FROM users WHERE email ILIKE '%${value}%'`;
  },

  add: (body) => {
    const { name, email, status } = body;
    return sql`INSERT INTO users(name, email, status) VALUES (${name}, ${email}, ${status})`;
  },

  edit: (body, id) => {
    const { name, email, status } = body;
    return sql`UPDATE users SET name = ${name}, email = ${email}, status = ${status}, update_at = now() WHERE id = ${id}`;
  },

  delete: (id) => {
    console.log("xóa users");
    return sql`DELETE FROM users WHERE id = ${id}`;
  },
};

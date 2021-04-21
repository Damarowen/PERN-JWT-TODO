const router = require("express").Router();
const pool = require("../db");


//* render all users
router.get("/allusers", async (req, res) => {
  try {
    const user = await pool.query(
      "select * from users ",
    );

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


//* search route
router.get("/users", async (req, res) => {
  try {
    const {
      username
    } = req.query;

    //first_name last_name => %{}%
    //"Henry Ly" => %ly%
    // || => OR SQL || => Concat

    //   const users = await pool.query(
    //     "SELECT * FROM users WHERE first_name || ' ' || last_name ILIKE $1",
    //     [`%${name}%`]
    //   );

    const users = await pool.query(
      "SELECT * FROM users WHERE user_name LIKE $1",
      [username]
    );

    res.json(users.rows);
  } catch (err) {
    console.error(err.message);
  }
});


//* get single users
router.get("/user/:username", async (req, res) => {
  try {

    let name = req.params.username

    const user = await pool.query(
      "SELECT u.user_name, t.todo_id, t.description, t.user_id FROM users AS u LEFT JOIN todos AS t ON u.user_id = t.user_id WHERE u.user_name = $1 ORDER BY date ASC",
      [name]
    );
    res.json(user);

  } catch (err) {
    console.error(err.message);
  }
});


module.exports = router;
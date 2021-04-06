const router = require("express").Router();
const pool = require("../db");

router.get("/allusers", async (req, res) => {
  try {

    const user = await pool.query(
      "select user_email, user_name from users ",
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
      const { username } = req.query;
  
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

  module.exports = router;

const express = require('express');
const db = require('./dbconnect.js');
const app = express();
const dotenv = require('dotenv');
const port = process.env.PORT;
const cors = require('cors');
app.use(cors());
const jwt = require('jsonwebtoken');
const secretKey = process.env.AUTH_KEY;

dotenv.config();
app.use(express.json());

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');
    console.log(token)
    if (!token) 
        return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

app.post("/login-user", async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await db.query("SELECT uid,name,address,mob_number,email FROM users WHERE email=($1) AND password=($2)", [email, password]);
        const user = result.rows[0];
        console.log(user)
        if (user) {
            const token = jwt.sign({ uid: user.uid,name:user.name,address:user.address,mobile:user.mobile,email:user.email}, secretKey);
            const responseObj = {
                "token": token,
            };
  
            return res.status(200).json(responseObj);
        }
        return res.status(400).json({ "message": 400 });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ error: err.message });
    }
  });

  app.post("/add-user", async (req, res) => {
    try {
        const { name, email, mob_number, address, password } = req.body;
        const query =  `INSERT INTO users (name, email, mob_number, address, password)
                        VALUES ($1, $2, $3, $4, $5);`;
        const values = [name, email, mob_number, address, password]; 
        const result = await db.query(query, values);
        console.log("Successfully Inserted");
        return res.status(200).json({message: "Succesfully inserted"});
    } catch (err) {
        return res.status(404).json({ error: err.message });
    }
});

app.get('/get-order/:uid', authenticateJWT, async (req, res) => {
    try {
        const uid = req.params.uid;
        const result = await db.query(`SELECT * FROM orders WHERE uid = $1`, [uid]); 
        console.log(result);
        return res.status(200).json({ data: result.rows }); 
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: err.message }); 
    }
});

    app.post('/add-order', async (req, res) => {
        const { uid, type, quantity, total_price } = req.body;
        try {
        const { rows } = await db.query('INSERT INTO orders (uid, type, quantity, total_price, order_date) VALUES ($1, $2, $3, $4, CURRENT_DATE) RETURNING *', [uid, type, quantity, total_price]);
        res.status(200).json(rows[0]);
        } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal server error' });
        }
    });

app.get('/users', async(req, res) => {
    try {
        const allItems = await db.query(
            'SELECT * FROM users'
        );
        res.json({ allItems });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
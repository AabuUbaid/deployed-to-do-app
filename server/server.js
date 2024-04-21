import express from "express";
import pg from "pg";
import env from "dotenv";
import cors from "cors";
import {v4 as uuidv4} from "uuid";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
const port = 8000
env.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())

app.use(cors())
const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });
  db.connect();


app.get('/todos/:userEmail', async (req, res) => {
    console.log(req)
    const {userEmail} = req.params
    try {
        const todos = await db.query('SELECT * FROM todos WHERE user_email = $1',[userEmail])
        res.json(todos.rows)
    }catch (err){
        console.error(err)
    }
})

app.post('/todos', async(req,res)=>{
    const { user_email, title, progress, date } = req.body;
    console.log( user_email, title, progress, date)
    const id = uuidv4()
    try{
      const newToDo = await db.query('INSERT INTO todos(id, user_email, title, progress, date) VALUES($1,$2,$3,$4,$5)',
    [id, user_email, title, progress, date]);
    res.json(newToDo)
    }catch (err){
        console.error(err)
    }
})

app.put('/todos/:id', async(req, res) =>{
  const {id} = req.params
  const { user_email, title, progress, date } = req.body;
   try{
   const editToDo = 
   await db.query('UPDATE todos SET user_email = $1, title =$2, progress = $3, date = $4 WHERE id = $5;',
    [ user_email, title, progress, date, id]);
    res.json(editToDo)
   } catch(err) {
    console.error(err)
   }
})

app.delete('/todos/:id', async(req, res) => {
   const {id} = req.params
   try {
   const deletedToDo = 
   await db.query('DELETE FROM todos WHERE id = $1;',
   [id]);
   res.json(deletedToDo)
   }catch(err) {
    console.error(err)
   }
})


app.post('/signup', async(req, res) => {
    const { email, pass} = req.body;
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(pass, salt)

    try {
      const signUp =  await db.query(`INSERT INTO users (email, hashed_password) VALUES ($1, $2)`,
    [email, hashedPassword])

    const token = jwt.sign({email}, 'secret',{expiresIn: '1hr'})

    res.json({email, token})

    } catch(err) {
        console.error(err)
        if (err) {
            res.json({detail: err.detail})
        }
    }
})

app.post('/login', async(req, res) => {
    const { email, pass} = req.body;
    try {
        const users =  await db.query(`SELECT * FROM users WHERE email = $1`, [email])

        if(!users.rows.length) return res.json({detail: 'User does not exist'})

        const success = await bcrypt.compare(pass, users.rows[0].hashed_password)
        const token = jwt.sign({email}, 'secret',{expiresIn: '1hr'})

        if (success) {
            res.json({'email' : users.rows[0].email, token})
        } else {
            res.json({ detail: "Login failed"})
        }
    } catch(err) {
        console.error(err)
        
    }
})

app.listen(port, ( )=> console.log(`Sever running on PORT ${port}` ));
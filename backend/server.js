const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./Models/Todo');
require('dotenv').config();


const app = express();

app.use(express.json());
app.use(cors());

app.get('/todos', async(req,res) => {
    const todos = await Todo.find();
    res.json(todos);
})

app.post('/todo/new',async(req,res)=>{
  const todo = new Todo({
    text:req.body.text
  })
  todo.save();

  res.json(todo);
});

app.delete('/todo/delete/:id', async(req, res)=>{
  const result = await Todo.findByIdAndDelete(req.params.id);

  res.json(result);
})

app.put('/todo/complete/:id', async(req, res)=>{
  const todo = await Todo.findById(req.params.id);

  todo.complete = !todo.complete;
  todo.save();
  res.json(todo);
})







mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to Database");
    
    // Add your app.listen here to ensure it starts only after the database connection is established.
    app.listen(3001, () => console.log("Server started on port 3001"));
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });



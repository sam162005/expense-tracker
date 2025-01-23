// const http = require('http');

// const port = 8000;

// http.createServer((req, res) => {
//     res.end('Vanakam Nanba');
// }).listen(port, () => {
//     console.log(Server is running on http://localhost:${port});
// });

// const express = require('express');
// const app = express();
// app.get('/', (req, res) => {
//     const { id } = req.query;

//     if (id) {
//         res.json(Hello World ${id});
//     }
//     res.json('Hellooooo World');
// });

// const port = 8001;
// app.listen(port, () => {
//   console.log(Server is running on port ${port});
// });

// app.get('/:id/:name/:age', (req, res) => {
//     const { id,name,age } = req.params;

//     if (id) {
//         res.json(Hello World ${id} and ${name} age is ${age});
//     }

//     res.json('Hellooooo World');
// });

// app.listen(PORT, () => {
//      console.log(Server is running on port ${PORT});
//  });

// const mongourl = "mongodb://localhost:27017/practice";
// mongoose
// .connect(mongourl)
// .then(() => {
//     console.log("MongoDB connected");
// app.listen(PORT, () => {
//     console.log(Server is running on port ${PORT});
// });
// })

const express = require("express");
const app = express();
app.use(express.json());
const PORT = 8000;
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const mongourl = "mongodb+srv://samgiftson563:samgiftson16@cluster0.pcx1z.mongodb.net/tracker";

mongoose.connect(mongourl).then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});

const expenseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
});

const expenseModel = mongoose.model("expense-tracker", expenseSchema); //cln name,schema name

app.post("/api/expenses", async (req, res) => {
  const { title, amount } = req.body;
  const newExpense = new expenseModel({
    id: uuidv4(),
    title: title,
    amount: amount,
  });
  const savedExpense = await newExpense.save();
  res.status(200).json(savedExpense);
});

//get

app.get("/api/expenses", async (req, res) => {
  try {
    const expenses = await expenseModel.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch expenses", details: err });
  }
});

//  get by id

app.get("/api/expenses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const expenses = await expenseModel.findOne({ id });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch expenses", details: err });
  }
});

//get by index

// app.get("/api/expenses/:index",async(req,res)=>{
//     try{
//         const{index}=req.params;
//         const expenses = await expenseModel.find().skip(index-1).limit(1);
//         res.json(expenses);
//     } catch (err) {
//         res.status(500).json({ error: "Failed to fetch expenses", details: err });
//     }
// });

app.put("/api/expenses/:id", async (req, res) => {
  const { id } = req.params;
  const { title, amount } = req.body;
  const updatedExpense = await expenseModel.findOneAndUpdate(
    {
      id: id,
    },
    {
      title: title,
      amount: amount,
    }
  );
  

  res.status(200).json(updatedExpense);
});

app.delete("/api/expenses/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const expenses = await expenseModel.deleteOne({id});
      res.json(expenses);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch expenses", details: err });
    }
  });

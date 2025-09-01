const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb+srv://gowthamsivakumar001_db_user:sgm2006@cluster0.nu37wb6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() => console.log("MongoDB Atlas connected"))
.catch(err => console.log("MongoDB connection error",err));

const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
});
const Expense = mongoose.model("Expense", expenseSchema);

app.post('/addExpense', insertExpense);
app.get('/getExpenses', getExpense);
app.delete('/deleteExpense', deleteExpense);
app.put('/updateExpense', updateExpense);

async function updateExpense(req, res) {
    try {
        const { id, title, amount } = req.body;
        console.log(req.body);
        
        await Expense.findByIdAndUpdate(id, { title, amount }, {new : true});
        res.send("Expense updated");
    } catch (error) {
        res.status(500).send("Error in updating expense");
    }
}

async function deleteExpense(req, res) {
    try {
        const { id } = req.body;
        await Expense.findByIdAndDelete(id);
        res.send("Expense deleted");
    } catch (error) {
        res.status(500).send("Error in deleting expense");
    }
}

async function getExpense(req, res) {
    try {
        const expenses = await Expense.find();
        console.log(expenses);
        res.send(expenses);
    } catch (error) {
        res.status(500).send("Error in fetching expenses");
    }
}

async function insertExpense(req, res) {
    try {
        const newExpense = new Expense(req.body);
        await newExpense.save();
        res.send("expense added");
    } catch (error) {
        res.send("Error in adding response");
    }
}
app.listen(3000);
const TodoModel = require("../models/Todo");

//get all todos
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.status(200).json(todos);
  } catch (error) {
    console.log(error);
  }
};

//create todos
exports.createTodos = async (req, res) => {
  try {
    const todo = await TodoModel.create(req.body);
    res.status(200).json({ message: "Todo created Successfullt" });
  } catch (error) {
    console.log(error);
  }
};

//update todo
exports.updateTodos = async (req, res) => {
  const { _id, text } = req.body;
  try {
    const todo = await TodoModel.findByIdAndUpdate(_id, { text });
    if (todo) {
      res.status(200).json({ message: "Updated Successfully" });
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

//delete todo
exports.deleteTodos = async (req, res) => {
  const { _id } = req.body;
  try {
    const todo = await TodoModel.findByIdAndDelete(_id);
    res.status(200).json({ message: "Deleted Succesfully" });
  } catch (error) {
    console.log(error);
  }
};

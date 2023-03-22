import pool from "../../db";
import { Request, Response } from "express";

const getTodos = async (req: Request, res: Response) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    if (allTodos.rows.length === 0) {
      res.status(404).json({ message: "No todos found" });
    }
    res.json(allTodos.rows);
  } catch (err: unknown) {
    console.error(err);
    res.status(404).json({ message: "Something went wrong" });
  }
};

const getTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE id = $1", [id]);
    if (todo.rows.length === 0) {
      res.status(404).json({ message: "No todo found" });
    }
    res.json(todo.rows[0]);
  } catch (err: unknown) {
    console.error(err);
    res.status(404).json({ message: "Something went wrong" });
  }
};

const createTodo = async (req: Request, res: Response) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err: unknown) {
    console.error(err);
    res.status(404).json({ message: "Something went wrong" });
  }
};

const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE id = $2",
      [description, id]
    );
    if (updateTodo.rowCount === 0) {
      res.status(404).json({ message: "No todo found" });
    }
    res.json("Todo was updated!");
  } catch (err: unknown) {
    console.error(err);
    res.status(404).json({ message: "Something went wrong" });
  }
};

const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE id = $1", [id]);
    res.json("Todo was deleted!");
  } catch (err: unknown) {
    console.error(err);
    res.status(404).json({ message: "Something went wrong" });
  }
};

export { getTodos, getTodo, createTodo, updateTodo, deleteTodo };

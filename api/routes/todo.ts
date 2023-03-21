import { Router } from "express";
import {
  createTodo,
  getTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todo";

const todoRouter = Router();

todoRouter.get("/todos", getTodos);
todoRouter.get("/todo/:id", getTodo);
todoRouter.post("/todo", createTodo);
todoRouter.put("/todo/:id", updateTodo);
todoRouter.delete("/todo/:id", deleteTodo);

export default todoRouter;

import React from "react";
import { CheckCircle, Circle } from "lucide-react";


export default function TodoItem({ todo, onDelete, onToggle }) {
    return (
      <div className="todo-item">
        <div className="left-section" onClick={() => onToggle(todo.id)}>
          {todo.completed ? (
            <CheckCircle size={20} color="green" />
          ) : (
            <Circle size={20} color="gray" />
          )}
          <span className={`todo-title ${todo.completed ? "completed" : ""}`}>
            {todo.title}
          </span>
        </div>
  
        <button className="delete-button" onClick={() => onDelete(todo.id)}>
          Delete
        </button>
      </div>
    );
  }
  


import "./App.css";
import React, { useEffect, useState } from "react";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
function App() {
  const [isCompleteScreen, setISCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditItem, setCurrentEditedItem] = useState("");
  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    console.log(updatedTodoArr);
    localStorage.setItem("todoList", JSON.stringify(updatedTodoArr));
  };
  const handleDeleteTodo = (index) => {
    let redusedTodo = [...allTodos];
    redusedTodo.splice(index);
    localStorage.setItem("todoList", JSON.stringify(redusedTodo));
    setTodos(redusedTodo);
  };
  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() * 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn =
      dd + "-" + mm + "-" + yyyy + "at " + h + ":" + m + ":" + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };
    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedArr));
  };
  const handleDeleteCompletedTodo = (index) => {
    let redusedTodo = [...completedTodos];
    redusedTodo.splice(index);
    localStorage.setItem("completedTodos", JSON.stringify(redusedTodo));
    setCompletedTodos(redusedTodo);
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todoList"));
    let savedcompleatedTodo = JSON.parse(
      localStorage.getItem("completedTodos")
    );
    if (savedTodo) {
      setTodos(savedTodo);
    }
    if (savedcompleatedTodo) {
      setCompletedTodos(savedcompleatedTodo);
    }
  }, []);

  const handleEdit = (ind, item) => {
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
  };
  const handleUpdateTitle = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, title: value };
    });
  };
  const handleUpdateDescription = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, description: value };
    });
  };
  const handleUpdateTodo = () => {
    let newTodo = [...allTodos];
    newTodo[currentEdit] = currentEditItem;
    setTodos(newTodo);
    setCurrentEdit("");
  };
  return (
    <div className="App">
      <h1>Todo App</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="what's the task title? "
            ></input>
          </div>

          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="what's the task Description? "
            ></input>
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primaryBtn"
            >
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleteScreen === false && "active"}`}
            onClick={() => setISCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && "active"}`}
            onClick={() => setISCompleteScreen(true)}
          >
            Completed
          </button>
        </div>
        <div className="Todo-list">
          {isCompleteScreen === false &&
            allTodos.map((item, index) => {
              if (currentEdit === index) {
                return (
                  <div className="edit_wrapper" key={index}>
                    <input
                      placeholder="Update Title"
                      onChange={(e) => handleUpdateTitle(e.target.value)}
                      value={currentEditItem.title}
                    />

                    <textarea
                      placeholder="Update Title"
                      rows={4}
                      onChange={(e) => handleUpdateDescription(e.target.value)}
                      value={currentEditItem.description}
                    />
                    <button
                      type="button"
                      onClick={handleUpdateTodo}
                      className="primaryBtn"
                    >
                      Update
                    </button>
                  </div>
                );
              } else {
                return (
                  <div className="todo-list-item" key={index}>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                    <div>
                      <MdDeleteOutline
                        className="deleteIcon"
                        onClick={() => handleDeleteTodo(index)}
                        title="Delete?"
                      />
                      <FaCheck
                        className="checkIcon"
                        onClick={() => handleComplete(index)}
                        title="Complete?"
                      />
                      <MdOutlineEdit
                        className="checkIcon"
                        onClick={() => handleEdit(index, item)}
                        title="Edit?"
                      />
                    </div>
                  </div>
                );
              }
            })}

          {isCompleteScreen === true &&
            completedTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>
                      <small> Completed on: {item.completedOn}</small>
                    </p>
                  </div>
                  <div>
                    <MdDeleteOutline
                      className="deleteIcon"
                      onClick={() => handleDeleteCompletedTodo(index)}
                      title="Delete?"
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;

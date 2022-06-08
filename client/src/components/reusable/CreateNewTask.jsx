import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTaskToUser } from "../../redux/actions";
import { Primary, Input, File } from "../styles/Buttons";
import LoginController from "./LoginController";

const AddTaskToUser = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const header = LoginController();
  const [task, setTask] = useState({
    name: "",
    description: "",
    priority: "",
  });
  const [error, setError] = useState({});

  function validateInput(input) {
    let error = {};
    if (!input.name) {
      error.name = "name is required";
    }
    if (!input.description) {
      error.description = "description is required";
    }
    if (!input.priority) {
      error.priority = "priority is required";
    }
    return error;
  }
  console.log(error);

  function handleChange(e) {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
    setError(
      validateInput({
        ...task,
        [e.target.name]: e.target.value,
      })
    );
  }
  console.log(task);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTaskToUser(id));
    navigate("/");
  };

  return (
    <>
      <h2>Add new Task to: </h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Title of task:</label>
        <input
          type="text"
          name="name"
          placeholder="Title..."
          value={task.name}
          className={Input()}
          onChange={(e) => handleChange(e)}
        />
        {error.name && <p className="">{error.name}</p>}
        <label>Description</label>
        <input
          type="text"
          name="description"
          placeholder="Briefe description of the task..."
          value={task.description}
          className={`${Input()} pb-10`}
          onChange={(e) => handleChange(e)}
        />
        {error.description && <p className="">{error.description}</p>}
        <label>Priority</label>
        <select
          name="priority"
          value={task.priority}
          className={Input()}
          onChange={(e) => handleChange(e)}
        >
          <option value="">Select...</option>
          <option value="Urgent">Urgent</option>
          <option value="High">High</option>
          <option value="Regular">Regular</option>
          <option value="Low">Low</option>
        </select>
        {error.priority && <p className="">{error.priority}</p>}
        <button type="submit" className={Primary()}>
          Add Task
        </button>
      </form>
    </>
  );
};

export default AddTaskToUser;
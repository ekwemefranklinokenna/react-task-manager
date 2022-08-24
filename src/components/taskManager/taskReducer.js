export const taskReducer = (state, action) => {
  if (action.type === "EMPTY_FIELDS") {
    return {
      ...state,
      isAlertOpen: true,
      alertContent: "Please Enter Name and Date",
      alertClass: "danger",
    };
  }
  if (action.type === "CLOSE_ALERT") {
    return { ...state, isAlertOpen: false };
  }
  if (action.type === "ADD_TASK") {
    const allTasks = [...state.tasks, action.payload];
    //update task in local storage
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    return {
      ...state,
      tasks: allTasks,
      isAlertOpen: true,
      alertContent: "Task added successfully",
      alertClass: "success",
    };
  }
  if (action.type === "OPEN_EDIT_MODAL") {
    console.log(action.payload);
    return {
      ...state,
      taskID: action.payload,
      isEditModalOpen: true,
      modalTitle: "Edit Task",
      modalMsg: "You are about to edit this task",
      modalActionText: "Edit",
    };
  }
  if (action.type === "CLOSE_MODAL") {
    return {
      ...state,
      isEditModalOpen: false,
      isDeleteModalOpen: false,
    };
  }

  if (action.type === "EDIT_TASK") {
    return { ...state, isEditing: true };
  }

  if (action.type === "UPDATE_TASK") {
    const updatedTask = action.payload;
    const id = action.payload.id;

    // Find the task index
    const taskIndex = state.tasks.findIndex((task) => {
      return task.id === id;
    });
    // Replace the task by it index
    if (taskIndex !== -1) {
      state.tasks[taskIndex] = updatedTask;
    }
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
    return {
      ...state,
      isEditing: false,
      isAlertOpen: true,
      alertContent: "Task Edited Successfully",
      alertClass: "success",
    };
  }

  if (action.type === "OPEN_DELETE_MODAL") {
    // console.log(action.payload);
    return {
      ...state,
      taskID: action.payload,
      isDeleteModalOpen: true,
      modalTitle: "Delete Task",
      modalMsg: "You are about to Delete a task",
      modalActionText: "Delete",
    };
  }
  if (action.type === "DELETE_TASK") {
    const id = action.payload;
    const newTasks = state.tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    return {
      ...state,
      tasks: newTasks,
      isAlertOpen: true,
      alertContent: "Task Deleted successfully",
      alertClass: "success",
      isDeleteModalOpen: false,
    };
  }

  if (action.type === "COMPLETE_TASK") {
    // console.log(action.payload);
    const id = action.payload;
    const taskIndex = state.tasks.findIndex((task) => {
      return task.id === id;
    });
    //  console.log(taskIndex)
    let updatedTask = {
      id,
      name: state.tasks[taskIndex].name,
      date: state.tasks[taskIndex].date,
      complete: true,
    };
    if (taskIndex !== -1) {
      state.tasks[taskIndex] = updatedTask;
    }
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
    return {
      ...state,
      isAlertOpen: true,
      alertContent: "Task Completed",
      alertClass: "success",
    };
  }
  return state;
};

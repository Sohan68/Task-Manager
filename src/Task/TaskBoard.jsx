import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import SearchTask from "./SearchTask";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";

const TaskBoard = () => {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React",
    description:
      "I want to learn React such than I can threat it like my slave and make i do whatever I want to do .",
    tags: ["web", "js", "react"],
    priyority: "High",
    isFavorite: true,
  };
  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const hangleAddEditTask = (newTask, isAdd) => {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        }),
      );
    }
    setShowAddModal(false);
  };

  const handleEditTask = (task) => {
    setTaskToUpdate(task);
    setShowAddModal(true);
  };
  const handleCloseClick = () => {
    setShowAddModal(false);
  };
  const handleDeleteTask = (taskId) => {
    const nonDeleteTask = tasks.filter((task) => task.id !== taskId);
    setTasks(nonDeleteTask);
  };
  return (
    <>
      <section className="mb-20" id="tasks">
        {showAddModal && (
          <AddTaskModal
            onSave={hangleAddEditTask}
            onCloseClick={handleCloseClick}
            taskToUpdate={taskToUpdate}
          />
        )}
        <div className="container mx-auto">
          {/* Search Box  */}
          <div className="p-2 flex justify-end">
            <SearchTask />
          </div>
          {/* TaskBoard  */}
          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <TaskAction
              onAddTask={() => {
                setTaskToUpdate(null);
                setShowAddModal(true);
              }}
            />
            <TaskList
              tasks={tasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default TaskBoard;

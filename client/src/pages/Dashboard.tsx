import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import api from "../api/axios";
import {
  changeTaskStatus,
  removeTask,
  setTasks,
} from "../store/user/taskSlice";
import type { TaskItem, TaskStatus } from "../types/task";
import { toast } from "react-toastify";
import TaskForm from "../components/TaskForm";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.task);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskItem, setTsakItem] = useState<TaskItem | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const responce = await api.get("/all");
        console.log(responce);
        dispatch(setTasks(responce.data.allTask));
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
        console.log("logout error");
      }
    };
    fetchTasks();
  }, [dispatch]);

  const pendingTasks = tasks.filter((task) => task.status === "pending");
  const ongoingTasks = tasks.filter((task) => task.status === "ongoing");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  const handleStatusChange = async (taskId: string, nextStatus: TaskStatus) => {
    try {
      await api.patch(`/update/${taskId}/status`, {
        status: nextStatus,
      });
      dispatch(changeTaskStatus({ id: taskId, status: nextStatus }));
      toast.success(`Moved to ${nextStatus}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      console.log("logout error");
    }
  };
  const handleDelete = async (taskId: string) => {
    try {
      const responce = await api.delete(`/delete/${taskId}`);
      dispatch(removeTask(taskId));
      toast.success(responce.data.message);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      console.log("logout error");
    }
  };
  const handleEdit = (task: TaskItem) => {
    setTsakItem(task);
    setShowTaskForm(true);
    try {
    } catch (error) {}
  };
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">My Tasks</h1>
        <button
          type="button"
          onClick={() => {
            setShowTaskForm(true);
            setTsakItem(null);
          }}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 active:scale-95"
        >
          + Add Task
        </button>
      </div>

      {/* 3-Column Board */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Column 1: Pending */}
        <section className="flex flex-col rounded-xl border border-slate-200 bg-slate-100/70 p-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
                Pending
              </h2>
            </div>
            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
              0
            </span>
          </div>

          <div className="space-y-3">
            {pendingTasks.length === 0 ? (
              <p className="py-6 text-center text-xs text-slate-400">
                No pending tasks
              </p>
            ) : (
              pendingTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onStatusChange={handleStatusChange}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        </section>

        {/* Column 2: Ongoing */}
        <section className="flex flex-col rounded-xl border border-slate-200 bg-slate-100/70 p-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
                Ongoing
              </h2>
            </div>
            <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
              0
            </span>
          </div>

          <div className="space-y-3">
            {ongoingTasks.length === 0 ? (
              <p className="py-6 text-center text-xs text-slate-400">
                No pending tasks
              </p>
            ) : (
              ongoingTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onStatusChange={handleStatusChange}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        </section>

        {/* Column 3: Completed */}
        <section className="flex flex-col rounded-xl border border-slate-200 bg-slate-100/70 p-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
                Completed
              </h2>
            </div>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
              0
            </span>
          </div>

          <div className="space-y-3">
            {completedTasks.length === 0 ? (
              <p className="py-6 text-center text-xs text-slate-400">
                No pending tasks
              </p>
            ) : (
              completedTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onStatusChange={handleStatusChange}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        </section>
      </div>
      {showTaskForm && (
        <TaskForm
          task={taskItem}
          onClose={() => {
            setShowTaskForm(false);
            setTsakItem(null);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;

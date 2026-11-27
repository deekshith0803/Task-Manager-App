import type { TaskCardProps, TaskStatus } from "../types/task";

const statusStyles: Record<TaskStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  ongoing: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
};

const TaskCard = (props: TaskCardProps) => {
  const dateText = props.task.createdAt
    ? new Date(props.task.createdAt).toLocaleDateString("en-IN")
    : "";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <h2
          className={`text-lg font-semibold text-slate-800 dark:text-slate-100 ${
            props.task.status === "completed"
              ? "line-through text-slate-500 dark:text-slate-400"
              : ""
          }`}
        >
          {props.task.title}
        </h2>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
            statusStyles[props.task.status]
          }`}
        >
          {props.task.status}
        </span>
      </div>

      <p className="mt-3 line-clamp-3 text-sm text-slate-600 dark:text-slate-400">
        {props.task.description}
      </p>

      {/* Status Buttons */}
      <div className="mt-4 flex flex-wrap gap-2">
        {(["pending", "ongoing", "completed"] as TaskStatus[]).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => props.onStatusChange?.(props.task._id, item)}
            className={`rounded-md px-2.5 py-1 text-xs font-medium capitalize ${
              props.task.status === item
                ? "bg-slate-800 text-white dark:bg-indigo-600"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Footer & Actions */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
        <span className="text-xs text-slate-400 dark:text-slate-500">
          {dateText}
        </span>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => props.onEdit?.(props.task)}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => props.onDelete?.(props.task._id)}
            className="text-sm font-medium text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

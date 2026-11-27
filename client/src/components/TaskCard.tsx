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
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h2
          className={`text-lg font-semibold text-slate-800 ${
            props.task.status === "completed"
              ? "line-through text-slate-500"
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

      <p className="mt-3 line-clamp-3 text-sm text-slate-600">
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
                ? "bg-slate-800 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Footer & Actions */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-xs text-slate-400">{dateText}</span>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => props.onEdit?.(props.task)}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => props.onDelete?.(props.task._id)}
            className="text-sm font-medium text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

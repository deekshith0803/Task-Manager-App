import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../api/axios";
import { useAppDispatch } from "../store/hooks";
import { addTask, editTask } from "../store/user/taskSlice";
import { toast } from "react-toastify";
import type { TaskFormProps } from "../types/task";

const taskFormSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters")
    .required("Title is required"),

  description: Yup.string()
    .trim()
    .min(5, "Description must be at least 5 characters")
    .max(500, "Description cannot exceed 500 characters")
    .required("Description is required"),
});

const TaskForm = ({ task, onClose }: TaskFormProps) => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      title: task?.title || "",
      description: task?.description || "",
    },
    validationSchema: taskFormSchema,
    onSubmit: async (values) => {
      try {
        if (task) {
          const responce = await api.put(`/update/${task._id}`, values);
          dispatch(editTask(responce.data.updatedTask));
          toast.success(responce.data.message);
        } else {
          const responce = await api.post("/create", values);
          dispatch(addTask(responce.data.task));
          toast.success(responce.data.message);
        }
        onClose();
      } catch (error: unknown) {
        toast.error("Failed to create task");
        if (error instanceof Error) {
          console.log(error.message);
        }
        console.log("create task error in TaskForm");
      }
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 px-4 py-6">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            Task Details
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Fill in the details below and save.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              placeholder="Enter task title"
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:ring-indigo-900"
            />
            {formik.touched.title && formik.errors.title && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {formik.errors.title}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              rows={4}
              placeholder="Enter task description"
              className="w-full resize-none rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:ring-indigo-900"
            />
            {formik.touched.description && formik.errors.description && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {formik.errors.description}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          <button
            onClick={onClose}
            type="button"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 active:scale-95"
          >
            Save Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;

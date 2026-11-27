export type TaskStatus = "pending" | "ongoing" | "completed";

export interface TaskItem {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  user: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TaskState {
  tasks: TaskItem[];
}

export interface TaskCardProps {
  task: TaskItem;
  onStatusChange?: (taskId: string, nextStatus: TaskStatus) => void;
  onEdit?: (task: TaskItem) => void;
  onDelete?: (taskId: string) => void;
}

export interface TaskFormProps {
  task?: TaskItem | null;
  onClose: () => void;
}

import { defineStore } from 'pinia';

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [] as Array<{
      id: number;
      title: string;
      description: string;
      status: string;
      createdAt: string;
      updatedAt: string;
    }>,
  }),
  actions: {
    createTask(task: { title: string; description: string; status: string }) {
      const newTask = {
        id: Date.now(),
        title: task.title,
        description: task.description,
        status: task.status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.tasks.push(newTask);
    },
    updateTask(id: number, updatedFields: Partial<typeof this.tasks[0]>) {
      const taskIndex = this.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = {
          ...this.tasks[taskIndex],
          ...updatedFields,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    deleteTask(id: number) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },
  },
});

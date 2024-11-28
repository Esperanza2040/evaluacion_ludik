<template>
    <div class="h-dvh bg-blue-500 text-black ">   
        <div class="p-4">
            <div class="font-bold text-xl mb-2">Lista de Tareas</div>  

            <div
            class="relative flex flex-col w-full h-full   text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
                <table class="w-full text-left table-auto min-w-max">
                    <thead>
                        <tr>
                            <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                    Titulo
                                </p>
                            </th>
                            <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                    Descripción
                                </p>
                            </th>
                            <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                    Acciones
                                </p>
                            </th> 
                        </tr>
                    </thead>
                    <tbody v-for="task in tasks" :key="task.id">
                        <tr>
                            <td class="p-4 border-b border-blue-gray-50">
                                <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    {{ task.title }} 
                                </p>
                            </td>
                            <td class="p-4 border-b border-blue-gray-50">
                                <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    {{ task.status }}
                                </p>
                            </td> 
                            <td class="p-4 border-b border-blue-gray-50">
                                <button class="text-slate-600 hover:text-slate-800" @click="navigateToEditTask(task.id)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon><line x1="3" y1="22" x2="21" y2="22"></line></svg>
                                </button>
                                <button class="text-slate-600 hover:text-slate-800" @click="handledeleteTask(task.id)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                </button>
                            </td> 
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="p-4">
            <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" @click="navigateToCreateTask">Crear Tarea</button>
        </div>
    </div>
</template>

  
<script setup>
    import { ref, onMounted } from 'vue';
    import { getTasks, createTask, updateTask, deleteTask } from '@/services/api.js';
  
    const tasks = ref([]);
    const router = useRouter();
  
    // Cargar las tareas cuando el componente se monte
    onMounted(async () => {
        tasks.value = await getTasks();
    });
    // Redirigir a la página de crear tarea
    const navigateToCreateTask = () => {
        router.push('/new');
    };

    const navigateToEditTask = (id) => {
        router.push(`/edit/${id}`);
    };
  
    const handledeleteTask = async (id) => {
        const success = await deleteTask(id);
        if (success) {
            tasks.value = tasks.value.filter(t => t.id !== id);
        }
    };
</script>
  
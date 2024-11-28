<template>
    <div class="h-dvh bg-blue-500 text-black ">   
        <div class="p-4">
            <div class="font-bold text-xl mb-2">Crear Nueva Tarea</div> 
            <form @submit.prevent="handleSubmit" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"> 
                
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="title">Título</label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" v-model="newTask.title" type="text" placeholder="Título de la tarea" required />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="description">Descripción</label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" v-model="newTask.description" type="text" placeholder="Descripción de la tarea" required />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="status">Estado</label>
                    <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="status" v-model="newTask.status">
                        <option value="Pendiente">Pendiente</option>
                        <option value="En Progreso">En Progreso</option>
                        <option value="Completada">Completada</option>
                    </select>
                </div>
                <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded" type="submit">Crear Tarea</button>
                
            </form>
            <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" @click="goBack">Volver</button>
        </div>
    </div>
</template>
  
<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { createTask } from '@/services/api.js';
  
    const newTask = ref({
        title: '',
        description: '',
        status: 'Pendiente',
    });
  
    const router = useRouter();
  
    const handleSubmit = async () => {
        try {
            const task = await createTask(newTask.value);
            // Redirigir a la página principal después de crear la tarea
            router.push('/');
        } catch (error) {
            console.error('Error al crear la tarea:', error.message);
            // Aquí puedes mostrar un mensaje de error si es necesario
        }
    };
    // Función para volver a la lista de tareas
    const goBack = () => {
        router.push('/'); // Regresar a la vista principal
    };
</script>
  
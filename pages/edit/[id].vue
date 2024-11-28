<template>
  <div class="h-dvh bg-blue-500 text-black ">   
      <div class="p-4">
          <div class="font-bold text-xl mb-2">Editar Tarea</div> 
          <form @submit.prevent="handleSubmit" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"> 
              
              <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="title">Título:</label>
                  <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="title"
                  v-model="task.title"
                  placeholder="Título de la tarea"
                  required
                  />
              </div>
              <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="description">Descripción:</label>
                  <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  id="description"
                  v-model="task.description"
                  placeholder="Descripción de la tarea"
                  required
                  />
              </div>
              <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="status">Estado:</label>
                  <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                  v-model="task.status" required>
                      <option value="Pendiente">Pendiente</option>
                      <option value="En Progreso">En Progreso</option>
                      <option value="Completada">Completada</option>
                  </select>
              </div>
              <button class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 border border-orange-700 rounded" type="submit">Actualizar Tarea</button>
              
          </form>
          <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" @click="goBack">Volver</button>
      </div>
  </div>
</template> 
  
<script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { getTask, updateTask } from '@/services/api.js';
  
  const router = useRouter();
  const route = useRoute();
  
  // State para almacenar los datos de la tarea
  const task = ref({
    title: '',
    description: '',
    status: 'Pendiente'
  });
  
  // Cargar la tarea al montar el componente
  onMounted(async () => {
    const taskId = route.params.id; // Obtener el ID de la tarea desde la URL
    task.value = await getTask(taskId); // Llamar a la API para obtener la tarea
  });
  
  // Función para enviar la tarea actualizada al backend
  const handleSubmit = async () => {
    const updatedTask = await updateTask(route.params.id, task.value);
    if (updatedTask) {
      router.push('/'); // Redirigir a la lista de tareas
    } else {
      console.error('Error al actualizar la tarea');
    }
  };
  
  // Función para volver a la lista de tareas
  const goBack = () => {
    router.push('/'); // Regresar a la vista principal
  };
</script>
  
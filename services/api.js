export const getTasks = async () => {
    const apiUrl = process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3001';  // Usar NUXT_PUBLIC_ para acceso público
  
    const response = await fetch(`${apiUrl}/items`);
    return await response.json();
};

  // Obtener un item por su ID
export const getTask = async (id) => {
    const apiUrl = process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3001';  // Usar NUXT_PUBLIC_ para acceso público
    try {
  
      const response = await fetch(`${apiUrl}/items/${id}`);
      return await response.json();
    } catch (error) {
      console.error('Error al obtener la tarea:', error);
      throw error;
    }
};

export const createTask = async (newTask) => {
    const apiUrl = process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3001';
        try {
        const response = await fetch(`${apiUrl}/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        });
        if (!response.ok) {
            const errorText = await response.text(); // Obtener la respuesta como texto
            throw new Error(`Error al crear la tarea: ${errorText}`);
        }
    
        // Si la respuesta es OK, parsear el JSON
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Error al crear la tarea:', error.message);
        throw error; // Volver a lanzar el error para manejarlo en el componente
    }
};
  
export const updateTask = async (id, updatedTask) => {
    const apiUrl = process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3001';
  
    const response = await fetch(`${apiUrl}/items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });
    return await response.json();
};
  
export const deleteTask = async (id) => {
    const apiUrl = process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3001';
  
    const response = await fetch(`${apiUrl}/items/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
};
  
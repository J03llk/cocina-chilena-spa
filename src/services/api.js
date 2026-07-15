export const obtenerPlatosChilenos = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Chile');
  if (!response.ok) {
    throw new Error('Error al conectar con la API de TheMealDB');
  }
  
  const data = await response.json();
  
  // Transformación de Datos (Mapping)
  return data.meals.map(plato => ({
    ...plato,
    precio: 0,
    disponible: true
  }));
};
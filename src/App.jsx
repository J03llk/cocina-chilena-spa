import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MenuPizarra from './components/MenuPizarra';
import { obtenerPlatosChilenos } from './services/api';
import './App.css';

const App = () => {
  // Estado Inicial Perezoso con Control de Errores
  const [menu, setMenu] = useState(() => {
    try {
      const saved = localStorage.getItem('cocina_chilena_menu');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error cargando persistencia:", error);
      return [];
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargarDatosExternos = async () => {
    setLoading(true);
    setError(null);
    try {
      const platosHidratados = await obtenerPlatosChilenos();
      setMenu(platosHidratados);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Hidratación inicial solo si el menú está vacío
  useEffect(() => {
    if (menu.length === 0) {
      cargarDatosExternos();
    }
  }, []);

  // Sincronización con useEffect para persistencia reactiva
  useEffect(() => {
    localStorage.setItem('cocina_chilena_menu', JSON.stringify(menu));
  }, [menu]);

  // Operación UPDATE Inmutable
  const handleEdit = (plato) => {
    const input = prompt(`Ingrese el nuevo precio para ${plato.strMeal}:`, plato.precio);
    if (input === null) return; 

    const nuevoPrecio = Number(input);

    // Validación Defensiva
    if (Number.isNaN(nuevoPrecio) || nuevoPrecio < 0) {
      alert("Error: El precio ingresado no es válido. Debe ser un número positivo.");
      return;
    }

    const menuActualizado = menu.map(item => 
      item.idMeal === plato.idMeal 
        ? { ...item, precio: nuevoPrecio } 
        : item
    );
    
    setMenu(menuActualizado);
  };

  // Operación DELETE Inmutable
  const handleDelete = (idMeal) => {
    if (window.confirm("¿Desea eliminar este plato del menú?")) {
      const menuFiltrado = menu.filter(item => item.idMeal !== idMeal);
      setMenu(menuFiltrado);
    }
  };

  return (
    <div>
      <Navbar />
      <main>
        {loading && <p style={{textAlign: 'center', padding: '20px'}}>Sincronizando con la red (Loading)...</p>}
        
        {error && (
          <div className="error-box">
            <p>Error: {error}</p>
            <button className="btn btn-edit" onClick={cargarDatosExternos}>Reintentar conexión</button>
          </div>
        )}

        {!loading && !error && (
          <MenuPizarra 
            platos={menu} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        )}
      </main>
    </div>
  );
};

export default App;
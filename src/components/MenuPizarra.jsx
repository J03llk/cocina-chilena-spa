import React from 'react';
import PlatoCard from './PlatoCard';

const MenuPizarra = ({ platos, onEdit, onDelete }) => {
  return (
    <section className="menu-pizarra">
      {platos.map(plato => (
        <PlatoCard 
          key={plato.idMeal} 
          plato={plato} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </section>
  );
};

export default MenuPizarra;
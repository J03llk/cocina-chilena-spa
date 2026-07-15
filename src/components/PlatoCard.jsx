import React from 'react';

const PlatoCard = ({ plato, onEdit, onDelete }) => {
  return (
    <article className="plato-card">
      <img src={plato.strMealThumb} alt={plato.strMeal} />
      <h3>{plato.strMeal}</h3>
      <p>Precio: ${plato.precio}</p>
      <p>Estado: {plato.disponible ? 'Disponible' : 'Agotado'}</p>
      
      <div className="card-actions">
        <button className="btn btn-edit" onClick={() => onEdit(plato)}>Editar Precio</button>
        <button className="btn btn-delete" onClick={() => onDelete(plato.idMeal)}>Eliminar</button>
      </div>
    </article>
  );
};

export default PlatoCard;
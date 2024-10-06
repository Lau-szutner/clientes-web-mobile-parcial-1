import React from 'react';

const InputForm = ({ userlog }) => {
  return (
    <div className="container mx-auto flex justify-center">
      <form className="grid bg-gray-200 p-10 rounded-xl w-6/12 gap-5">
        <label htmlFor="name" className="text-xl">
          Ingrese su email
        </label>
        <input
          type="email"
          name="name"
          id="name"
          placeholder="lautaroszutner@hotmail.com"
          className="p-2 rounded-md"
          required // Añade required para validar que se llene este campo
        />
        <label htmlFor="password" className="text-xl">
          Ingrese su contraseña
        </label>
        <input
          type="password" // Cambiado a "password" para ocultar la entrada
          name="password"
          id="password"
          placeholder="facebook123"
          className="p-2 rounded-md"
          required // Añade required para validar que se llene este campo
        />
        <button
          type="button" // Asegúrate de especificar el tipo del botón
          className="bg-blue-500 p-3 rounded-md text-white"
          onClick={(e) => {
            e.preventDefault(); // Previene el envío del formulario
            userlog(); // Llama a la función userlog
          }}
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default InputForm;

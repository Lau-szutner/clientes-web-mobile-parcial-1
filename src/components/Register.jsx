
import React, { useState } from 'react';
import { auth } from '../services/firebase'; // Importa la configuración de Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = ({userRegister, isRegistered}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Usuario registrado con éxito!');
      // Aquí puedes redirigir al usuario o mostrar un mensaje

      userRegister(); // Llamamos a userLog solo si es una función
    } catch (err) {
      setError(err.message); // Manejo de errores
    }
  };
  const registered = () =>{
    isRegistered();
  }
  return (
    <div className="container mx-auto flex justify-center h-full items-center">
      <div className="bg-zinc-200 rounded-xl w-6/12 p-10">
        <h2 className='text-center text-4xl'>Registro de Usuario</h2>
        <form onSubmit={handleRegister} className='grid bg-gray-200  rounded-xl  gap-5 h-fit'>
          <div className='flex flex-col gap-5 '>
            <label className='text-xl'>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder='emailexample@hotmail.com'
              className='p-2 rounded-md h-fit w-full'
            />
          </div>
          <div className='flex flex-col gap-5 '>
            <label className='text-2xl w-3/12'>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
               className='p-2 rounded-md h-fit w-full'
               placeholder='ingrese su contraseña'
            />
          </div>
          <button type="submit" className='bg-zinc-800 text-white p-3 rounded-xl w-full'>Registrar</button>
          <button className='bg-amber-600 p-3 rounded-xl w-full' onClick={registered}>Iniciar Sesion</button>
        </form>
        {error && <p>{error}</p>} {/* Muestra errores */}
      </div>
    </div>
  );
};

export default Register;



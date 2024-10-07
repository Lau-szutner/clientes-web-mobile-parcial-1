import React, { useState } from 'react';
import { collection, doc, setDoc, addDoc } from 'firebase/firestore';
import { db, auth } from '../services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = ({ loginFirst }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log('Usuario registrado con éxito!', user.uid);

      // Usa setDoc para establecer el documento con el ID igual a user.uid
      await addDoc(collection(db, 'users'), {
        email: user.email,
        id: user.uid,
        // Agrega otros campos que necesites para gestionar los posteos del usuario
        // posts: [], // Inicializa un array para los posteos, si es necesario
      });

      // Aquí puedes agregar más lógica, como redirigir al usuario o limpiar el formulario
    } catch (err) {
      console.error('Error en el registro:', err);
      setError(
        err.code === 'auth/email-already-in-use'
          ? 'El correo ya está en uso.'
          : 'Error al registrarse. Intente de nuevo.'
      );
    }
  };

  return (
    <div className="container mx-auto flex justify-center h-full items-center">
      <div className="bg-zinc-200 rounded-xl w-6/12 p-10">
        <h2 className="text-center text-4xl">Registro de Usuario</h2>
        <form
          onSubmit={handleRegister}
          className="grid bg-gray-200 rounded-xl gap-5 h-fit"
        >
          <div className="flex flex-col gap-5">
            <label className="text-xl">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="emailexample@hotmail.com"
              className="p-2 rounded-md h-fit w-full"
            />
          </div>
          <div className="flex flex-col gap-5">
            <label className="text-2xl w-3/12">Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-2 rounded-md h-fit w-full"
              placeholder="ingrese su contraseña"
            />
          </div>
          <button
            type="submit"
            className="bg-zinc-800 text-white p-3 rounded-xl w-full"
          >
            Registrar
          </button>
          <button
            type="button"
            className="bg-amber-600 p-3 rounded-xl w-full"
            onClick={loginFirst}
          >
            Iniciar Sesion
          </button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Register;

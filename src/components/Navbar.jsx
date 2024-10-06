// Importa el archivo JSON
import React from 'react';
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../services/firebase';

const NavBar = () => {
  const handleNewPost = async () => {
    try {
      // Aquí defines en qué colección quieres guardar los datos
      const newPost = await addDoc(collection(db, 'posts'), {
        author: 'catalina',
        content: 'te amo',
        date: new Date(),
        likes: '0',
        title: 'aprendiendo a amarte',
      });
      console.log('Documento escrito con ID: ', newPost.id);
    } catch (e) {
      console.error('Error al agregar el documento: ', e);
    }
  };

  return (
    <>
      <nav className="text-white flex justify-around w-full py-5 bg-zinc-900">
        <h1 className="text-3xl">Reddot .</h1>
        <ul className="flex text-xl gap-10 items-center">
          <li>Home</li>
          <li>Posteos</li>
          <li>Foros</li>
          <button onClick={() => handleNewPost()}>Crear</button>
        </ul>
        <div className="bg-blue-500 h-10 w-10"></div>
      </nav>
    </>
  );
};

export default NavBar;

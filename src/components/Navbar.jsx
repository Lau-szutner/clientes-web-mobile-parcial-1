import React, { useEffect, useState } from 'react'; // Importa useEffect
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import { signOut } from 'firebase/auth';
import perfil from '../img/fotoperfil.jpg';
import { onAuthStateChanged } from 'firebase/auth';
import NewPostForm from './NewPostForm';

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [newPost, setNewPost] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log('Usuario logeado:', user);
        console.log('UID:', user.uid);
        console.log('Email:', user.email);
        console.log(user);
      } else {
        console.log('No hay usuario logeado');
      }
    });

    // Cleanup del suscriptor para evitar fugas de memoria
    return () => unsubscribe();
  }, []); // Dependencias vacías, se ejecuta solo al montar el componente

  const handleNewPost = async () => {
    if (!user) {
      console.error('no hay usuario logeado');
      return;
    }

    try {
      // users/${user.id}/posts
      const newPost = await addDoc(collection(db, `posts`), {
        author: 'prueba 1',
        content:
          'React es una biblioteca de JavaScript para construir interfaces de usuario. En este post, exploraré los conceptos básicos de React.',
        date: new Date(),
        likes: '10',
        title: 'Title prueba',
      });
      console.log('Documento escrito con ID: ', newPost.id);
    } catch (e) {
      console.error('Error al agregar el documento: ', e);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      console.log('Usuario deslogueado');
    } catch (error) {
      console.error('Error al desloguear:', error);
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
          <button
            // onClick={() => handleNewPost()}
            onClick={() => setNewPost(true)}
          >
            Crear
          </button>
        </ul>
        <div className="flex gap-5">
          <img src={perfil} alt="" className="h-10 rounded-full" />
          <button
            className="bg-red-500 h-10 w-fit p-2 rounded-md"
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
      </nav>

      {newPost && <NewPostForm cerrarFormulario={() => setNewPost(false)} />}
    </>
  );
};

export default NavBar;

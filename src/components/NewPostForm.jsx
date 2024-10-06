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

const NewPostForm = () => {
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

  return <></>;
};

export default NewPostForm;

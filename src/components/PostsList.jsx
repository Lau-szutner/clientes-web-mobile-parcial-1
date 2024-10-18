import React, { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../services/firebase';

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState({}); // Objeto para almacenar los comentarios de cada post

  // Función para obtener los posts
  const fetchPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const postsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      {
      }

      setPosts(postsArray);

      // Para cada post, obtener los comentarios
      postsArray.forEach(async (post) => {
        const commentsSnapshot = await getDocs(
          query(
            collection(db, `posts/${post.id}/comments`),
            orderBy('createdAt')
          )
        );

        const postComments = commentsSnapshot.docs.map((doc) => doc.data());
        {
          // console.log;
        }
        // Actualizar el estado de comentarios con los comentarios de cada post
        setComments((prevState) => ({
          ...prevState,
          [post.id]: postComments,
        }));
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Función para agregar un nuevo comentario
  const handleAddComment = async (postId) => {
    if (!newComment.trim()) return; // Verifica que el comentario no esté vacío
    try {
      await addDoc(collection(db, `posts/${postId}/comments`), {
        user: 'lautaro',
        content: newComment,
        createdAt: new Date().getTime,
      });

      // Después de agregar el comentario, actualizar los comentarios en la UI
      fetchComments(postId); // Vuelve a cargar los comentarios para el post

      setNewComment(''); // Limpia el campo de comentario
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  // Función para obtener los comentarios de un post
  const fetchComments = async (postId) => {
    try {
      const commentsSnapshot = await getDocs(
        query(collection(db, `posts/${postId}/comments`), orderBy('createdAt'))
      );
      const postComments = commentsSnapshot.docs.map((doc) => doc.data());

      // Actualiza los comentarios del post correspondiente
      setComments((prevState) => ({
        ...prevState,
        [postId]: postComments,
      }));
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  return (
    <div className="text-white rounded-md flex flex-col items-center">
      <h1 className="text-3xl text-center">Lista de Posteos</h1>
      <div className="grid p-10 gap-5 lg:w-5/12">
        {posts.map((post) => (
          <div
  key={post.id}
  className="bg-zinc-600 rounded-md p-5 hover:bg-zinc-700 ease-in-out duration-300 flex flex-col lg:w-6/12"
>
  {/* Título con truncamiento y puntos suspensivos */}
  <h2 className="text-2xl truncate">{post.title}</h2>

  <div className="flex gap-10 my-5 items-center">
    <p className="text-xl">{post.author}</p>
    <p>{post.date.toDate().toLocaleString('es-ES')}</p>
  </div>

  <div className="bg-black h-20 w-20"></div>

  {/* Contenido con ajuste de palabras largas */}
  <p className="text-2xl break-words">{post.content}</p>

  <div className="flex gap-5">
    <p className="bg-zinc-500 rounded-md w-fit py-2 px-4 my-5">
      Me gusta: {post.likes}
    </p>
  </div>

  {/* Mostrar los comentarios */}
  <div>
    <h2>Comentarios:</h2>
    <ul>
      {comments[post.id]?.length > 0 ? (
        comments[post.id].map((comment, index) => (
          <li key={index} className="bg-zinc-900 p-2 rounded-md my-2">
            <div className="flex">
              <div className="bg-blue-500 h-10 w-10 mr-5 rounded-full"></div>
              {comment.user} - {''}
              {new Date(comment.createdAt.toDate()).toLocaleString('es-ES')}
            </div>
            <div className="break-words">{comment.content}</div>
          </li>
        ))
      ) : (
        <li>No hay comentarios</li>
      )}
    </ul>
  </div>

  {/* Formulario para agregar comentarios */}
  <div>
    <input
      type="text"
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
      placeholder="Escribe un comentario..."
      className="w-full p-2 rounded-md bg-zinc-800 text-white"
    />
    <button
      onClick={() => handleAddComment(post.id)}
      className="bg-zinc-500 rounded-md w-fit py-2 px-4 mt-2"
    >
      Agregar Comentario
    </button>
  </div>
</div>

        ))}
      </div>
    </div>
  );
};

export default PostsList;

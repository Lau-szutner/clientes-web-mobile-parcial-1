// Importa el archivo JSON
import { collection } from 'firebase/firestore';
import React from 'react';

const NavBar = () => {
  const handleNewPost = async () => {
    // try {
    //     await addDoc(collection(db, ))
    // }
  };

  return (
    <>
      <nav className="text-white flex justify-around w-full py-5 bg-zinc-900">
        <h1 className="text-3xl">Reddot .</h1>
        <ul className="flex text-xl gap-10 items-center">
          <li>Home</li>
          <li>Posteos</li>
          <li>Foros</li>
          <button>Crear</button>
        </ul>
        <div className="bg-blue-500 h-10 w-10"></div>
      </nav>
    </>
  );
};

export default NavBar;

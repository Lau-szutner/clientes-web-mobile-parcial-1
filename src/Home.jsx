import React, { useState } from 'react';
import './css/styles.css';
import InputForm from './components/InputForm';
import NavBar from './components/Navbar';
import PostsList from './components/PostsList'; // Asegúrate de ajustar la ruta si es necesario

const Home = () => {
  const [form, setForm] = useState(true);

  function logedIn() {
    setForm(false);
  }

  return (
    <section className="flex flex-col gap-10 h-full bg-zinc-800">
      {/* {form && <InputForm userlog={logedIn} />} */}
      <NavBar></NavBar>
      <PostsList></PostsList>
    </section>
  );
};

export default Home;

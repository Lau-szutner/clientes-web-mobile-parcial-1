import React, { useState } from 'react';
import './css/styles.css';
import InputForm from './components/InputForm';
import NavBar from './components/Navbar';
import PostsList from './components/PostsList'; // Asegúrate de ajustar la ruta si es necesario
import Register from './components/Register';
const Home = () => {
  const [form, setForm] = useState(false);
  const [posts, setPosts] = useState(false);
  const [register, setRegister] = useState(true);
  function handleLogin() {
    setForm(false);
    setPosts(true);
  }

  function handleRegister() {
    setForm(true);   
    setRegister(false);
  }
  return (
    <section className="flex flex-col gap-10 h-screen bg-zinc-800">
      <NavBar></NavBar>
      {form && <InputForm userLog={handleLogin} />}

      {register && <Register userRegister={handleRegister} isRegistered={handleRegister}/>}
      {/* {posts && <PostsList />} */}
    </section>
  );
};

export default Home;

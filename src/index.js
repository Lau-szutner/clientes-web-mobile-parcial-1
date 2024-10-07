import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
const App = () => {
  return (
    <section className=" bg-zinc-800">
      <Home></Home>
    </section>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

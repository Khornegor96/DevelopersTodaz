// frontend/src/pages/index.js
import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Country Info App</h1>
      <Link href="/countries">View Countries</Link>
    </div>
  );
};

export default Home;

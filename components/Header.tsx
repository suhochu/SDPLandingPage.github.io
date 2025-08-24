
import React from 'react';

const Header: React.FC = () => {
  return (
    <header 
      className="text-center py-24 px-5 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `linear-gradient(rgba(2, 10, 26, 0.8), rgba(2, 10, 26, 1)), url('https://picsum.photos/seed/alpaka/1200/800')` }}
    >
      <h1 className="font-orbitron text-5xl md:text-6xl text-alpaka-accent mb-2.5 tracking-wider [text-shadow:0_0_15px_#00f0ff]">
        ALPAKA
      </h1>
      <p className="text-lg text-alpaka-subtext max-w-3xl mx-auto mb-8">
        Alpha in Mobility. We design space logic within movement.
      </p>
    </header>
  );
};

export default Header;

import React from 'react';
import TypewriterComponent from 'typewriter-effect';

const Header = () => {
  return (
    <>
      <nav className="p-4 bg-transparent flex items-center  justify-between">
        <h1 className="text-2xl font-bold text-white">URLGuardian</h1>
      </nav>
      <div className="text-white font-bold py-20 text-center space-y-5 ">
        <div className="space-y-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold ">
          <h1>The best Url tool</h1>
          <div className="text-transparent bg-clip-text bg-gradient-to-r  from-purple-400 to-pink-600">
            <TypewriterComponent
              options={{
                strings: ['URL Status', 'SSL Certificate', 'Roboto.txt'],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
        </div>
        <div className="text-sm md-text-xl font-light text-zinc-400">
          Get information of website using URL
        </div>
      </div>
    </>
  );
};

export default Header;

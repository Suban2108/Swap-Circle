import React from 'react';
import Banner_Image from '../../assets/Item-page-Banner.webp';

const HeroSection = () => {
  return (
    <section
      className="relative mt-18 w-full h-[400px] md:h-[500px] flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${Banner_Image})`,
      }}
    >
      {/* Gradient overlay - made slightly darker */}
      <div className="absolute inset-0 bg-black opacity-65"></div>

      <div className="relative z-10 text-center text-white px-4 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          Explore & Barter Unique Items
        </h1>
        <p className="text-lg md:text-xl mb-6 drop-shadow-md">
          Discover great deals, donate unused goods, or swap with others in your
          community.
        </p>
        <a
          href="#items"
          className="inline-block bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition"
        >
          Browse Items
        </a>
      </div>
    </section>
  );
};

export default HeroSection;

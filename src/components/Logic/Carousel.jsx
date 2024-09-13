import React, { useState, useEffect, useCallback } from 'react';
import { carouselData } from '../../data/Header/carouselData';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { CarouselSlide } from '../Ui/CarouselComponents';

const CarouselThumbnails = ({ data, currentIndex, setCurrentIndex }) => (
  <div className="absolute bottom-4 sm:bottom-8 lg:bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-4">
    {data.map((item, index) => (
      <div
        key={item.id}
        className={`w-24 sm:w-32 lg:w-36 h-36 sm:h-44 lg:h-52 rounded-lg overflow-hidden cursor-pointer transition-all ${
          index === currentIndex ? 'ring-2 ring-white' : 'opacity-50 hover:opacity-75'
        }`}
        onClick={() => setCurrentIndex(index)}
      >
        <div className="relative w-full h-full">
          <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent pt-8 pb-2 px-2">
            <h4 className="text-xs sm:text-sm font-medium text-white truncate">{item.title}</h4>
            <p className="text-xs text-gray-300 truncate">{item.topic}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const CarouselArrows = ({ prevSlide, nextSlide }) => (
  <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 sm:px-8">
    <button
      onClick={prevSlide}
      className="w-10 h-10 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-colors flex items-center justify-center"
      aria-label="Previous slide"
    >
      <ChevronLeft size={24} />
    </button>
    <button
      onClick={nextSlide}
      className="w-10 h-10 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-colors flex items-center justify-center"
      aria-label="Next slide"
    >
      <ChevronRight size={24} />
    </button>
  </div>
);

const ProgressBar = ({ progress }) => (
  <div className="absolute top-0 left-0 w-full h-1 bg-orange-500">
    <div
      className="h-full bg-white transition-all duration-[7000ms] ease-linear"
      style={{ width: `${progress}%` }}
    />
  </div>
);

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselData.length) % carouselData.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    let interval;
    if (isAutoPlaying && isPlaying) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            nextSlide();
            return 0;
          }
          return prevProgress + (100 / 7000) * 100; 
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, isPlaying, nextSlide]);

  const handleSeeMore = () => {
    console.log('Navigating to more content');
  };

  const handleSubscribe = () => {
    console.log('Opening subscription form');
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying((prev) => !prev);
    setIsPlaying((prev) => !prev);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <div className="relative h-screen overflow-hidden bg-black text-white font-poppins">
      {carouselData.map((slide, index) => (
        <CarouselSlide
          key={slide.id}
          slide={slide}
          isActive={index === currentIndex}
          onSeeMore={handleSeeMore}
          onSubscribe={handleSubscribe}
          isPlaying={isPlaying}
          isMuted={isMuted}
          onTogglePlay={togglePlay}
          onToggleMute={toggleMute}
        />
      ))}
      <CarouselThumbnails
        data={carouselData}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
      <CarouselArrows prevSlide={prevSlide} nextSlide={nextSlide} />
      <ProgressBar progress={progress} />
      <button
        onClick={toggleAutoPlay}
        className="absolute top-4 right-4 w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-75 transition-colors"
      >
        {isAutoPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
    </div>
  );
};

export default Carousel;
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const CarouselSlide = ({ slide, onSeeMore, onSubscribe }) => (
  <div className="absolute inset-0">
    <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-black bg-opacity-50" />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6 text-center sm:text-left">
        <h3 className="text-sm sm:text-base font-bold tracking-widest">{slide.author}</h3>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">{slide.title}</h2>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-orange-500">{slide.topic}</h2>
        <p className="text-base sm:text-lg max-w-2xl">{slide.description}</p>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 justify-center sm:justify-start">
          <button 
            onClick={onSeeMore}
            className="px-6 py-2 bg-white text-black font-medium tracking-wider hover:bg-gray-200 transition-colors"
          >
            SEE MORE
          </button>
          <button 
            onClick={onSubscribe}
            className="px-6 py-2 border border-white font-medium tracking-wider hover:bg-white hover:text-black transition-colors"
          >
            SUBSCRIBE
          </button>
        </div>
      </div>
    </div>
  </div>
);

export const CarouselThumbnails = ({ data, currentIndex, setCurrentIndex }) => (
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
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent pt-8 pb-2 px-2">
            <h4 className="text-xs sm:text-sm font-medium text-white truncate">{item.title}</h4>
            <p className="text-xs text-gray-300 truncate">{item.topic}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const CarouselArrows = ({ prevSlide, nextSlide }) => (
  <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 sm:px-8">
    <button
      onClick={prevSlide}
      className="w-10 h-10 rounded-full bg-white bg-opacity-25 text-white hover:bg-opacity-100 hover:text-black transition-colors flex items-center justify-center"
      aria-label="Previous slide"
    >
      <ChevronLeft size={24} />
    </button>
    <button
      onClick={nextSlide}
      className="w-10 h-10 rounded-full bg-white bg-opacity-25 text-white hover:bg-opacity-100 hover:text-black transition-colors flex items-center justify-center"
      aria-label="Next slide"
    >
      <ChevronRight size={24} />
    </button>
  </div>
);

export const ProgressBar = ({ isAutoPlaying }) => (
  <div className="absolute top-0 left-0 w-full h-1 bg-orange-500">
    <div
      className="h-full bg-white transition-all duration-[7000ms] ease-linear"
      style={{ width: isAutoPlaying ? '100%' : '0%' }}
    />
  </div>
);
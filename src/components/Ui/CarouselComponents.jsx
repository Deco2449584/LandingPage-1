import React, { useRef, useState, useEffect } from 'react';
import { VolumeX, Volume2, Play, Pause } from 'lucide-react';

export const CarouselSlide = ({ slide, isActive, onSeeMore, onSubscribe }) => {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isActive) {
      videoRef.current.play();
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      audioRef.current.pause();
      videoRef.current.currentTime = 0;
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [isActive]);

  useEffect(() => {
    audioRef.current.muted = isMuted;
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
      audioRef.current.pause();
    } else {
      videoRef.current.play();
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
      isActive ? 'opacity-100' : 'opacity-0'
    }`}>
      <video
        ref={videoRef}
        src={slide.video}
        className="w-full h-full object-cover"
        loop
        muted
        playsInline
      />
      <audio
        ref={audioRef}
        src={slide.audio}
        loop
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6 text-center sm:text-left">
          <h3 className="text-sm sm:text-base font-bold tracking-widest">{slide.author}</h3>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">{slide.title}</h2>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-orange-500">{slide.topic}</h2>
          <p className="text-base sm:text-lg max-w-2xl line-clamp-3">{slide.description}</p>
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
      <div className="absolute bottom-4 right-4 flex space-x-2">
        <button
          onClick={togglePlayPause}
          className="w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-75 transition-colors"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button
          onClick={toggleMute}
          className="w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-75 transition-colors"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>
    </div>
  );
};
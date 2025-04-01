'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Prototype {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  objectFit?: 'contain' | 'cover'; // Optional property defaulting to 'contain'
  padding?: string;
}

interface PrototypeStoriesProps {
  prototypes: Prototype[];
}

const PrototypeStories: React.FC<PrototypeStoriesProps> = ({ prototypes }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(-1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const previousVideoRef = useRef<HTMLVideoElement>(null);
  const nextVideoRef = useRef<HTMLVideoElement>(null);
  const loadingTimeoutRef = useRef<NodeJS.Timeout>();
  const isHovering = useRef(false);
  const lastUpdateTime = useRef(0);
  const UPDATE_INTERVAL = 100;
  const [showOverlays, setShowOverlays] = useState(false);
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);
  const [supportsHover, setSupportsHover] = useState(false);

  // Check if device supports hover
  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover)');
    setSupportsHover(mediaQuery.matches);

    const updateHoverSupport = (e: MediaQueryListEvent) => {
      setSupportsHover(e.matches);
    };

    mediaQuery.addListener(updateHoverSupport);
    return () => mediaQuery.removeListener(updateHoverSupport);
  }, []);

  // Preload next video
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % prototypes.length;
    if (nextVideoRef.current) {
      nextVideoRef.current.src = prototypes[nextIndex].videoUrl;
      nextVideoRef.current.load();
    }
  }, [currentIndex, prototypes]);

  const handleVideoLoadStart = () => {
    // Clear any existing timeout
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }
    
    // Only show loading state if video takes more than 100ms to start playing
    loadingTimeoutRef.current = setTimeout(() => {
      const video = videoRef.current;
      if (video && (video.readyState < 3 || video.networkState === video.NETWORK_LOADING)) {
        setIsLoading(true);
        setLoadingProgress(0);
      }
    }, 100);
  };

  const handleVideoProgress = (e: ProgressEvent) => {
    if (e.lengthComputable) {
      const progress = (e.loaded / e.total) * 100;
      setLoadingProgress(progress);
    }
  };

  const handleVideoCanPlay = () => {
    // Clear loading timeout if it exists
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }
    setIsLoading(false);
  };

  // Add readyState check on mount and video change
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // If video is already loaded enough, don't show loading state
    if (video.readyState >= 3) {
      setIsLoading(false);
    }

    // Add loadeddata event listener
    const handleLoadedData = () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
      setIsLoading(false);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [currentIndex]); // Re-run when video changes

  const goToNext = () => {
    setPreviousIndex(currentIndex);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % prototypes.length);
    setIsTransitioning(true);
  };

  const goToPrevious = () => {
    setPreviousIndex(currentIndex);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + prototypes.length) % prototypes.length);
    setIsTransitioning(true);
  };

  const handleEnded = () => {
    if (!isHovering.current) {
      goToNext();
    }
  };

  const handleNextClick = () => {
    goToNext();
  };

  const handlePreviousClick = () => {
    goToPrevious();
  };

  const handleMouseEnter = () => {
    if (!supportsHover) return;
    isHovering.current = true;
    setShowOverlays(true);
    videoRef.current?.pause();
  };

  const handleMouseLeave = () => {
    if (!supportsHover) return;
    isHovering.current = false;
    setShowOverlays(false);
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play().catch(error => {
        console.error("Error attempting to play video on hover leave:", error);
      });
    }
  };

  const handleTimeUpdate = useCallback(() => {
    const now = Date.now();
    if (now - lastUpdateTime.current >= UPDATE_INTERVAL) {
      if (videoRef.current) {
        const { currentTime, duration } = videoRef.current;
        if (duration) {
          const progress = (currentTime / duration) * 100;
          setVideoProgress(progress);
        }
      }
      lastUpdateTime.current = now;
    }
  }, []);

  const handleOverlayMouseEnter = (side: 'left' | 'right') => {
    if (!supportsHover) return;
    setHoveredSide(side);
  };

  const handleOverlayMouseLeave = () => {
    if (!supportsHover) return;
    setHoveredSide(null);
  };

  // Handle touch interactions for mobile
  const handleTouch = (e: React.TouchEvent) => {
    e.preventDefault(); // Prevent click event from firing
    if (supportsHover) return;
    
    const container = e.currentTarget as HTMLDivElement;
    const rect = container.getBoundingClientRect();
    const x = e.touches[0].clientX;
    const relativeX = x - rect.left;
    
    if (relativeX < rect.width / 3) {
      goToPrevious();
    } else {
      goToNext();
    }
  };

  // Handle video transitions
  useEffect(() => {
    if (isTransitioning) {
      // Reset progress
      setVideoProgress(0);
      
      // Start playing the new video
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(error => {
          console.error("Error attempting to play video:", error);
        });
      }

      // After transition duration, clean up
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 400); // Match this with CSS transition duration

      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  if (!prototypes || prototypes.length === 0) {
    return null;
  }

  const currentPrototype = prototypes[currentIndex];
  const previousPrototype = previousIndex >= 0 ? prototypes[previousIndex] : null;

  // Determine if we should animate the progress bar
  const getProgressBarStyle = (index: number) => ({
    ...styles.progressBarFill,
    width: `${index === currentIndex ? videoProgress : (index < currentIndex ? 100 : 0)}%`,
    // Only apply transition when the current video is playing, not when switching videos
    transition: isTransitioning ? 'none' : 'width 0.3s linear',
  });

  return (
    <div 
      className="prototype-story-container" 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouch}
      style={{ position: 'relative', touchAction: 'none' }}
    >
      <div className="prototype-video-container" style={{ ...styles.videoContainer, aspectRatio: '16 / 9' }}>
        <div style={styles.progressBarsContainer}>
          {prototypes.map((_, index) => (
            <div key={index} style={styles.progressBarBackground}>
              <div style={getProgressBarStyle(index)} />
            </div>
          ))}
        </div>

        {/* Loading overlay */}
        {isLoading && (
          <div style={styles.loadingOverlay}>
            <div style={styles.loadingSpinner} />
          </div>
        )}

        {/* Video layers for transition */}
        <div style={styles.videoWrapper}>
          {/* Previous video layer */}
          {previousPrototype && isTransitioning && (
            <video
              key={`prev-${previousPrototype.id}`}
              ref={previousVideoRef}
              src={previousPrototype.videoUrl}
              style={{
                ...styles.videoElement,
                ...styles.absoluteVideo,
                opacity: 0,
                objectFit: previousPrototype.objectFit || 'contain',
                padding: previousPrototype.padding,
              }}
              muted
              playsInline
            />
          )}
          
          {/* Current video layer */}
          <video
            key={currentPrototype.id}
            ref={videoRef}
            src={currentPrototype.videoUrl}
            autoPlay
            muted
            playsInline
            onEnded={handleEnded}
            onTimeUpdate={handleTimeUpdate}
            onLoadStart={handleVideoLoadStart}
            onProgress={(e) => handleVideoProgress(e as any)}
            onCanPlay={handleVideoCanPlay}
            style={{
              ...styles.videoElement,
              ...styles.absoluteVideo,
              opacity: 1,
              objectFit: currentPrototype.objectFit || 'contain',
              padding: currentPrototype.padding,
            }}
            aria-label={currentPrototype.title}
          >
            Your browser does not support the video tag.
          </video>

          {/* Hidden next video for preloading */}
          <video
            ref={nextVideoRef}
            style={{ display: 'none' }}
            muted
            playsInline
          />
        </div>

        {/* Navigation Overlays - Only shown on hover-capable devices */}
        {supportsHover && (
          <>
            <div 
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              onMouseEnter={() => handleOverlayMouseEnter('left')}
              onMouseLeave={handleOverlayMouseLeave}
              style={{
                ...styles.navigationOverlay,
                ...styles.prevOverlay,
                opacity: showOverlays ? 1 : 0,
              }}
              aria-label="Previous story"
            >
              <div style={{
                ...styles.arrowContainer,
                transform: hoveredSide === 'left' ? 'translateX(-4px)' : 'translateX(0)',
                transition: 'transform 0.2s ease-out',
              }}>
                <ChevronLeft size={32} color="white" strokeWidth={1.5} />
              </div>
            </div>
            <div 
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              onMouseEnter={() => handleOverlayMouseEnter('right')}
              onMouseLeave={handleOverlayMouseLeave}
              style={{
                ...styles.navigationOverlay,
                ...styles.nextOverlay,
                opacity: showOverlays ? 1 : 0,
              }}
              aria-label="Next story"
            >
              <div style={{
                ...styles.arrowContainer,
                transform: hoveredSide === 'right' ? 'translateX(4px)' : 'translateX(0)',
                transition: 'transform 0.2s ease-out',
              }}>
                <ChevronRight size={32} color="white" strokeWidth={1.5} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Update styles
const styles = {
  progressBarsContainer: {
    position: 'absolute' as const,
    top: '12px',
    left: '24px',
    right: '24px',
    display: 'flex',
    gap: '4px',
    zIndex: 2,
    height: '2px',
  },
  progressBarBackground: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '1px',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '1px',
  },
  videoContainer: { 
    overflow: 'hidden', 
    position: 'relative' as const,
    borderRadius: '24px',
    transform: 'translateZ(0)', // Force GPU acceleration to fix border radius artifacts
    border: '2px solid var(--border-primary)',
  },
  videoWrapper: {
    position: 'relative' as const,
    width: '100%',
    height: '100%',
    backgroundColor: '#000', // Ensure wrapper also has dark background
    borderRadius: '24px', // Match parent border radius
    overflow: 'hidden', // Ensure content doesn't overflow
  },
  videoElement: { 
    display: 'block',
    width: '100%', 
    height: '100%',
  },
  absoluteVideo: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    transition: 'opacity 0.4s ease-in-out',
  },
  navigationOverlay: {
    position: 'absolute' as const,
    top: 0,
    bottom: 0,
    width: '30%',
    cursor: 'pointer',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    background: 'linear-gradient(to right, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 100%)',
    transition: 'opacity 0.2s ease-in-out',
    opacity: 0,
  },
  prevOverlay: {
    left: 0,
    justifyContent: 'flex-start',
    background: 'linear-gradient(to right, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 100%)',
  },
  nextOverlay: {
    right: 0,
    justifyContent: 'flex-end',
    background: 'linear-gradient(to left, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 100%)',
  },
  arrowContainer: {
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingOverlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },
  loadingSpinner: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    borderTopColor: 'white',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    color: 'white',
    marginTop: '12px',
    fontSize: '14px',
    fontWeight: 500,
  },
};

// Add keyframes for loading spinner
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
document.head.appendChild(styleSheet);

export default PrototypeStories; 
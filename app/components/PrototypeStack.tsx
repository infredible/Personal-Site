'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

type Prototype = {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  date: string;
};

type PrototypeStackProps = {
  prototypes: Prototype[];
};

export default function PrototypeStack({ prototypes }: PrototypeStackProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Initialize video refs
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, prototypes.length);
  }, [prototypes.length]);

  // Update container width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Setting video ref without linter errors
  const setVideoRef = (el: HTMLVideoElement | null, index: number) => {
    videoRefs.current[index] = el;
  };

  // Handle mouse enter
  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    
    // Play the video of the hovered card
    const video = videoRefs.current[index];
    if (video) {
      video.play().catch(error => console.log('Error playing video:', error));
    }
  };

  // Handle mouse leave
  const handleMouseLeave = (index: number) => {
    setHoveredIndex(null);
    
    // Pause and reset the video
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <div className="prototype-stack-container" ref={containerRef}>
      <div className="prototype-stack">
        {prototypes.map((prototype, index) => {
          // Calculate transformations based on hover state
          const isHovered = hoveredIndex === index;
          
          // Calculate horizontal spread based on container width
          const totalItems = prototypes.length;
          const spreadWidth = Math.min(containerWidth * 0.8, totalItems * 140); // Cap the spread width
          const itemWidth = spreadWidth / totalItems;
          const horizontalOffset = (index - (totalItems - 1) / 2) * itemWidth;
          
          // Consistent rotation for all items
          const rotationY = -30; // Same rotation for all cards
          
          // Stack depth increases with index
          const stackDepth = index * 8;
          
          // Style calculation based on hover state
          const style = {
            transform: `
              translateX(${horizontalOffset}px)
              ${isHovered 
                ? `
                  rotateY(-10deg) 
                  rotateX(0deg)
                  translateY(-40px)
                ` 
                : `
                  rotateY(${rotationY}deg) 
                  rotateX(8deg)
                `
              }
              translateZ(${stackDepth}px)
            `,
            opacity: hoveredIndex !== null ? (isHovered ? 1 : 0.1) : 1,
            zIndex: isHovered ? 50 : totalItems - index,
            transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
          };

          return (
            <div
              key={prototype.id}
              className="prototype-thumbnail"
              style={style}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <Link href={`/prototypes/${prototype.id}`} className="prototype-link">
                <div className="thumbnail-wrapper">
                  <div className="video-thumbnail">
                    <video
                      ref={(el) => setVideoRef(el, index)}
                      src={prototype.videoUrl}
                      muted
                      playsInline
                      loop
                      className="prototype-video"
                    />
                  </div>
                  {/* <div className="prototype-info">
                    <h3>{prototype.title}</h3>
                    <p>{prototype.description}</p>
                  </div> */}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
} 
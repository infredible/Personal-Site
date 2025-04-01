# Personal Portfolio Website

A minimalist portfolio website built with Next.js and TypeScript.

## Technologies Used
- Next.js
- TypeScript
- Tailwind CSS

## Getting Started

1. Clone the repository

## Video Performance Optimization

The site uses optimized videos for the prototype stories component. To maintain good performance:

### Video Optimization

1. Place source videos in `public/projects/` directory
2. Run the optimization script:
   ```bash
   ./scripts/optimize-videos.sh
   ```
   This will:
   - Scale videos to 720p while maintaining aspect ratio
   - Use h.264 codec for maximum compatibility
   - Optimize quality/size balance (CRF 28)
   - Limit video bitrate to 1.5M
   - Strip audio (videos are muted)
   - Enable fast start for quicker playback

   Requirements:
   - ffmpeg must be installed (`brew install ffmpeg` on macOS)

### Performance Features

The PrototypeStories component includes several performance optimizations:

1. Loading States:
   - Shows loading overlay with spinner
   - Displays loading progress percentage
   - Smooth transitions between states

2. Video Preloading:
   - Automatically preloads next video
   - Uses hidden video element for efficient preloading
   - Maintains smooth playback between transitions

3. Resource Hints:
   - Preconnect hints for faster initial connections
   - DNS prefetch for faster domain resolution
   - Preload hints for common video paths

### Best Practices

When adding new videos:

1. Keep videos short and focused (ideally under 10 seconds)
2. Use the optimization script before committing
3. Test on slow connections (can use Chrome DevTools network throttling)
4. Verify smooth loading states and transitions
5. Check video quality after optimization

### Video Format Guidelines

For best results, source videos should be:

- Format: MP4 (h.264)
- Resolution: 1080p or 720p
- Framerate: 30fps or 60fps
- No audio required (will be stripped)
- High quality source (will be compressed)

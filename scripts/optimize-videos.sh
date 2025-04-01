#!/bin/bash

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "ffmpeg is required but not installed. Please install it first."
    exit 1
fi

# Directory containing source videos
SOURCE_DIR="public/projects"

# Create optimized directory if it doesn't exist
mkdir -p "${SOURCE_DIR}/optimized"

# Function to optimize video
optimize_video() {
    local input_file="$1"
    local filename=$(basename "$input_file")
    local output_file="${SOURCE_DIR}/optimized/${filename}"
    
    echo "Optimizing: $filename"
    
    # Optimize video with the following settings:
    # - Scale to 720p while maintaining aspect ratio
    # - Use h.264 codec for maximum compatibility
    # - Use CRF 28 for good quality/size balance
    # - Use 'fast' preset for reasonable encoding speed
    # - Limit video bitrate to 1.5M
    # - Strip audio (these are muted videos anyway)
    ffmpeg -i "$input_file" \
        -vf "scale=-1:720" \
        -c:v libx264 \
        -preset fast \
        -crf 28 \
        -maxrate 1.5M \
        -bufsize 2M \
        -an \
        -movflags +faststart \
        -y \
        "$output_file"
    
    # Get file sizes for comparison
    original_size=$(ls -lh "$input_file" | awk '{print $5}')
    optimized_size=$(ls -lh "$output_file" | awk '{print $5}')
    
    echo "Original size: $original_size"
    echo "Optimized size: $optimized_size"
    echo "-------------------"
}

# Find and optimize all MP4 files
find "$SOURCE_DIR" -type f -name "*.mp4" -not -path "*/optimized/*" | while read -r video; do
    optimize_video "$video"
done

echo "Video optimization complete!" 
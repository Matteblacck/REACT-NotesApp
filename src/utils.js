export const fluidText = (max, min) => {
    const maxViewportWidth = 1280;
    const minViewportWidth = 360;
  
    const maxSize = max / 16;
    const minSize = min / 16;
    const maxWidth = maxViewportWidth / 16;
    const minWidth = minViewportWidth / 16;
  
    const slope = (maxSize - minSize) / (maxWidth - minWidth);
    const yAxisIntersection = -minWidth * slope + minSize;
  
    return `clamp(${minSize}rem, ${yAxisIntersection}rem + ${slope * 100}vw, ${maxSize}rem)`;
  };
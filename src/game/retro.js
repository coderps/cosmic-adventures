import React, { useEffect, useRef, useState } from 'react';
import '../static/css/basic.css'; // Import the CSS file

const RetroGame = ({ canvasWidth = 640, canvasHeight = 480, boxSize = 20 }) => {
  const canvasRef = useRef(null);
  const [boxPosition, setBoxPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const drawGame = () => {
      ctx.fillStyle = '#9bbc0f'; // Retro light green
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      ctx.fillStyle = '#0f380f'; // Retro dark green
      ctx.fillRect(boxPosition.x, boxPosition.y, boxSize, boxSize);
    };

    drawGame();

    const handleKeyDown = (e) => {
      setBoxPosition((prev) => {
        let newX = prev.x;
        let newY = prev.y;

        switch (e.key) {
          case 'ArrowLeft':
            newX = Math.max(0, prev.x - 5);
            break;
          case 'ArrowRight':
            newX = Math.min(canvasWidth - boxSize, prev.x + 5);
            break;
          case 'ArrowUp':
            newY = Math.max(0, prev.y - 5);
            break;
          case 'ArrowDown':
            newY = Math.min(canvasHeight - boxSize, prev.y + 5);
            break;
          default:
            break;
        }

        return { x: newX, y: newY };
      });
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [boxPosition, canvasWidth, canvasHeight, boxSize]);

  return (
    <div className="game-container">
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className="game-canvas pixel-art"
      />
    </div>
  );
};

export default RetroGame;
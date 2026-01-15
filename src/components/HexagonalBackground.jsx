import { useEffect, useRef } from 'react';

const HexagonalBackground = ({ opacity = 0.1 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const drawHexagon = (x, y, size) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const hx = x + size * Math.cos(angle);
        const hy = y + size * Math.sin(angle);
        if (i === 0) {
          ctx.moveTo(hx, hy);
        } else {
          ctx.lineTo(hx, hy);
        }
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(0, 230, 230, ${opacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const hexSize = 50;
      const hexWidth = hexSize * 2;
      const hexHeight = Math.sqrt(3) * hexSize;

      for (let row = -1; row < canvas.height / hexHeight + 1; row++) {
        for (let col = -1; col < canvas.width / hexWidth + 1; col++) {
          const x = col * hexWidth * 0.75;
          const y = row * hexHeight + (col % 2 === 0 ? 0 : hexHeight / 2);
          drawHexagon(x, y, hexSize);
        }
      }
    };

    drawGrid();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawGrid();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

export default HexagonalBackground;

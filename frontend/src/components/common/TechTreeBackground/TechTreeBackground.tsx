import React, { useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';

const TechTreeBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Node class for creating points in the tree
    class Node {
      x: number;
      y: number;
      connections: Node[];
      speed: number;
      angle: number;
      size: number;
      opacity: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.connections = [];
        this.speed = Math.random() * 0.05 + 0.02;
        this.angle = Math.random() * Math.PI * 2;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.5;
      }

      update() {
        // Move in a circular pattern
        this.angle += this.speed * 0.002;
        this.x += Math.cos(this.angle) * 0.2;
        this.y += Math.sin(this.angle) * 0.2;

        // Keep within bounds
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        // Draw connections
        this.connections.forEach(node => {
          const gradient = ctx.createLinearGradient(this.x, this.y, node.x, node.y);
          gradient.addColorStop(0, `rgba(205, 246, 131, ${this.opacity * 0.15})`);
          gradient.addColorStop(1, `rgba(205, 246, 131, ${node.opacity * 0.15})`);
          
          ctx.beginPath();
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1;
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(node.x, node.y);
          ctx.stroke();
        });

        // Draw node with glow effect
        ctx.beginPath();
        const glowGradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
        glowGradient.addColorStop(0, `rgba(205, 246, 131, ${this.opacity * 0.5})`);
        glowGradient.addColorStop(0.5, `rgba(205, 246, 131, ${this.opacity * 0.3})`);
        glowGradient.addColorStop(1, `rgba(205, 246, 131, 0)`);
        
        ctx.fillStyle = glowGradient;
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw the actual node
        ctx.beginPath();
        ctx.fillStyle = `rgba(205, 246, 131, ${this.opacity * 0.8})`;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      connectTo(other: Node) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          if (!ctx) return;
          const gradient = ctx.createLinearGradient(this.x, this.y, other.x, other.y);
          gradient.addColorStop(0, `rgba(205, 246, 131, ${this.opacity * 0.2})`);
          gradient.addColorStop(0.5, `rgba(205, 246, 131, ${(this.opacity + other.opacity) * 0.15})`);
          gradient.addColorStop(1, `rgba(205, 246, 131, ${other.opacity * 0.2})`);

          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = Math.min(3, (150 - distance) / 25);
          ctx.stroke();
        }
      }
    }

    // Create nodes
    const nodes: Node[] = [];
    const numNodes = Math.floor((canvas.width * canvas.height) / 20000); // Adjust density based on screen size
    for (let i = 0; i < numNodes; i++) {
      nodes.push(new Node(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      ));
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(205, 246, 131, 0.005)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      nodes.forEach(node => {
        node.update();
        node.draw();
      });

      // Draw connections
      nodes.forEach(node => {
        nodes.forEach(other => {
          if (node !== other) {
            node.connectTo(other);
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <Box
      as="canvas"
      ref={canvasRef}
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={0}
      opacity={0.6}
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default TechTreeBackground;

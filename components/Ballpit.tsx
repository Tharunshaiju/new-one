'use client';

import React, { useEffect, useRef } from 'react';

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

interface BallpitProps {
  count?: number;
  gravity?: number;
  friction?: number;
  wallBounce?: number;
  followCursor?: boolean;
  colors?: string[];
  className?: string;
  style?: React.CSSProperties;
}

export default function Ballpit({
  count = 50,
  gravity = 0,
  friction = 0.9975,
  wallBounce = 0.95,
  followCursor = false,
  colors = ["#ff00dd", "#ae00ff", "#ffffff", "#cd1aff"],
  className = '',
  style = {}
}: BallpitProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ballsRef = useRef<Ball[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize balls
    const initBalls = () => {
      ballsRef.current = [];
      for (let i = 0; i < count; i++) {
        const radius = Math.random() * 20 + 10;
        ballsRef.current.push({
          x: Math.random() * (canvas.width - radius * 2) + radius,
          y: Math.random() * (canvas.height - radius * 2) + radius,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          radius,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };
    initBalls();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    if (followCursor) {
      canvas.addEventListener('mousemove', handleMouseMove);
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ballsRef.current.forEach((ball, i) => {
        // Apply gravity
        ball.vy += gravity;

        // Apply friction
        ball.vx *= friction;
        ball.vy *= friction;

        // Follow cursor
        if (followCursor) {
          const dx = mouseRef.current.x - ball.x;
          const dy = mouseRef.current.y - ball.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 200) {
            const force = (200 - distance) / 200;
            ball.vx += (dx / distance) * force * 0.5;
            ball.vy += (dy / distance) * force * 0.5;
          }
        }

        // Update position
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Wall collision
        if (ball.x - ball.radius < 0) {
          ball.x = ball.radius;
          ball.vx *= -wallBounce;
        }
        if (ball.x + ball.radius > canvas.width) {
          ball.x = canvas.width - ball.radius;
          ball.vx *= -wallBounce;
        }
        if (ball.y - ball.radius < 0) {
          ball.y = ball.radius;
          ball.vy *= -wallBounce;
        }
        if (ball.y + ball.radius > canvas.height) {
          ball.y = canvas.height - ball.radius;
          ball.vy *= -wallBounce;
        }

        // Ball to ball collision
        for (let j = i + 1; j < ballsRef.current.length; j++) {
          const other = ballsRef.current[j];
          const dx = other.x - ball.x;
          const dy = other.y - ball.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const minDist = ball.radius + other.radius;

          if (distance < minDist) {
            // Collision detected
            const angle = Math.atan2(dy, dx);
            const sin = Math.sin(angle);
            const cos = Math.cos(angle);

            // Rotate ball positions
            let x1 = 0;
            const y1 = 0;
            let x2 = dx * cos + dy * sin;
            const y2 = dy * cos - dx * sin;

            // Rotate ball velocities
            let vx1 = ball.vx * cos + ball.vy * sin;
            const vy1 = ball.vy * cos - ball.vx * sin;
            let vx2 = other.vx * cos + other.vy * sin;
            const vy2 = other.vy * cos - other.vx * sin;

            // Collision reaction
            const vxTotal = vx1 - vx2;
            vx1 = ((ball.radius - other.radius) * vx1 + 2 * other.radius * vx2) / (ball.radius + other.radius);
            vx2 = vxTotal + vx1;

            // Update positions to avoid overlap
            const absV = Math.abs(vx1) + Math.abs(vx2);
            const overlap = (ball.radius + other.radius) - Math.abs(x2 - x1);
            x1 += vx1 / absV * overlap;
            x2 += vx2 / absV * overlap;

            // Rotate positions back
            const x1Final = x1 * cos - y1 * sin;
            const y1Final = y1 * cos + x1 * sin;
            const x2Final = x2 * cos - y2 * sin;
            const y2Final = y2 * cos + x2 * sin;

            other.x = ball.x + x2Final;
            other.y = ball.y + y2Final;
            ball.x = ball.x + x1Final;
            ball.y = ball.y + y1Final;

            // Rotate velocities back
            ball.vx = vx1 * cos - vy1 * sin;
            ball.vy = vy1 * cos + vx1 * sin;
            other.vx = vx2 * cos - vy2 * sin;
            other.vy = vy2 * cos + vx2 * sin;
          }
        }

        // Draw ball
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        
        // Add subtle gradient for depth
        const gradient = ctx.createRadialGradient(
          ball.x - ball.radius * 0.3,
          ball.y - ball.radius * 0.3,
          0,
          ball.x,
          ball.y,
          ball.radius
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.1)');
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (followCursor) {
        canvas.removeEventListener('mousemove', handleMouseMove);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [count, gravity, friction, wallBounce, followCursor, colors]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={style}
    />
  );
}

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, AlertTriangle, ShieldCheck, Trophy, Activity } from "lucide-react";

// ── Constants ──────────────────────────────────────────────────────────────
const GRAVITY = 0.55;
const JUMP_FORCE = -11;
const INITIAL_SPEED = 6;
const MAX_SPEED = 12;
const SPAWN_CHANCE = 0.015;
const FLOOR_Y = 24;
const PLAYER_SIZE = 36;

interface Obstacle {
  id: number;
  x: number;
  width: number;
  height: number;
  type: 'SPIKE' | 'WALL' | 'GLITCH';
}

export default function BotDefenseGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(INITIAL_SPEED);
  
  const [playerY, setPlayerY] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  
  const gameRef = useRef(0);
  const scoreRef = useRef(0);

  useEffect(() => {
    const saved = localStorage.getItem("botmate_runner_highscore");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const gameOver = useCallback(() => {
    setIsPlaying(false);
    setIsGameOver(true);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);

    if (scoreRef.current > highScore) {
      setHighScore(scoreRef.current);
      localStorage.setItem("botmate_runner_highscore", scoreRef.current.toString());
    }
  }, [highScore]);

  const start = () => {
    setIsPlaying(true);
    setIsGameOver(false);
    setIsShaking(false);
    setScore(0);
    scoreRef.current = 0;
    setObstacles([]);
    setPlayerY(0);
    setVelocity(0);
    setGameSpeed(INITIAL_SPEED);
  };

  const jump = useCallback(() => {
    if (!isPlaying) {
      start();
      return;
    }
    if (playerY === 0) setVelocity(JUMP_FORCE);
  }, [isPlaying, playerY]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [jump]);

  const update = useCallback(() => {
    setPlayerY((y) => {
      let newVel = velocity + GRAVITY;
      let newY = y - newVel;
      if (newY <= 0) {
        newY = 0;
        newVel = 0;
      }
      setVelocity(newVel);
      return newY;
    });

    setObstacles((prev) => {
      const moved = prev.map(o => ({ ...o, x: o.x - gameSpeed })).filter(o => o.x > -100);

      const playerCX = 40 + PLAYER_SIZE/2;
      const playerCY = FLOOR_Y + playerY + PLAYER_SIZE/2;
      const radius = PLAYER_SIZE/2 - 4;

      for (const o of moved) {
        const closestX = Math.max(o.x, Math.min(playerCX, o.x + o.width));
        const closestY = Math.max(FLOOR_Y, Math.min(playerCY, FLOOR_Y + o.height));
        const dx = playerCX - closestX;
        const dy = playerCY - closestY;

        if (dx*dx + dy*dy < radius*radius) {
          gameOver();
          return moved;
        }
      }

      if (Math.random() < SPAWN_CHANCE) {
        moved.push({
          id: Date.now(),
          x: 500,
          width: 30,
          height: 30,
          type: 'SPIKE'
        });
      }

      return moved;
    });

    scoreRef.current += 1;
    setScore(Math.floor(scoreRef.current / 10));

    gameRef.current = requestAnimationFrame(update);
  }, [velocity, playerY, gameSpeed, gameOver]);

  useEffect(() => {
    if (isPlaying && !isGameOver) {
      gameRef.current = requestAnimationFrame(update);
    } else {
      cancelAnimationFrame(gameRef.current);
    }
    return () => cancelAnimationFrame(gameRef.current);
  }, [isPlaying, isGameOver, update]);

  return (
    <motion.div
      animate={isShaking ? { x: [-5,5,-5,5,0] } : {}}
      className="w-full h-52 rounded-2xl border border-cyan-500/20 bg-[#040609] relative overflow-hidden cursor-pointer"
      onClick={jump}
    >

      {/* PLAYER */}
      <motion.div
        className="absolute left-10 w-9 h-9 z-20"
        style={{ bottom: `${FLOOR_Y + playerY}px` }}
        animate={playerY > 0 ? { rotate: playerY * 4 } : { rotate: 0 }}
      >
        {/* 🔥 UPDATED IMAGE */}
        <motion.img
          src="https://res.cloudinary.com/dh6ibke5w/image/upload/v1777274506/Robodino_for_Game_pyf3tu.png"
          alt="Robo Dino"
          className="w-full h-full object-contain"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      </motion.div>

      {/* OBSTACLES */}
      {obstacles.map(o => (
        <div
          key={o.id}
          className="absolute bg-red-500"
          style={{
            left: o.x,
            bottom: FLOOR_Y,
            width: o.width,
            height: o.height
          }}
        />
      ))}

      {/* UI */}
      <div className="absolute top-3 left-3 text-white text-sm">
        Score: {score}
      </div>

      <AnimatePresence>
        {!isPlaying && (
          <motion.div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white">
            Tap / Space to Start
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isGameOver && (
          <motion.div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/90 text-white">
            <AlertTriangle />
            <p>Game Over</p>
            <button onClick={start}>Restart</button>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
import { motion } from "framer-motion";

interface Props {
  size: number;
  className?: string;
  delay?: number;
}

export default function FloatingTooth({ size, className, delay = 0 }: Props) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className ?? ""}`}
      animate={{
        opacity: [0.3, 0.6, 0.3],
        y: [0, -30, 0],
        rotate: [0, 10, -5, 0],
      }}
      transition={{ duration: 6, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <defs>
          <linearGradient id={`tg-${size}-${delay}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(210 100% 40% / 0.3)" />
            <stop offset="100%" stopColor="hsl(165 100% 43% / 0.3)" />
          </linearGradient>
        </defs>
        <path
          d="M50 10C35 10 25 20 25 35C25 50 20 65 25 80C30 95 35 90 40 85C45 80 45 70 50 70C55 70 55 80 60 85C65 90 70 95 75 80C80 65 75 50 75 35C75 20 65 10 50 10Z"
          fill={`url(#tg-${size}-${delay})`}
          stroke="hsl(210 100% 40% / 0.4)"
          strokeWidth="1"
        />
        <ellipse cx="50" cy="35" rx="15" ry="10" fill="white" fillOpacity="0.4" />
      </svg>
    </motion.div>
  );
}

import { motion } from "framer-motion";

interface AtsScoreProps {
  score: number;
  size?: number;
  showLabel?: boolean;
  keywords?: string[];
  missing?: string[];
}

const AtsScore = ({ score, size = 120, showLabel = true, keywords = [], missing = [] }: AtsScoreProps) => {
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(score / 100) * circumference} ${circumference}`;
  
  const getColor = () => {
    if (score >= 80) return 'hsl(var(--success))';
    if (score >= 60) return 'hsl(var(--primary))';
    return 'hsl(var(--destructive))';
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke="hsl(var(--muted))" strokeWidth="8"
          />
          <motion.circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke={getColor()} strokeWidth="8"
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="font-extrabold font-display"
            style={{ fontSize: size * 0.25, color: getColor() }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {score}%
          </motion.span>
        </div>
      </div>
      {showLabel && (
        <p className="text-sm font-semibold text-muted-foreground">Score ATS</p>
      )}
      {keywords.length > 0 && (
        <div className="w-full">
          <p className="text-xs font-bold text-success mb-2">✓ Mots-clés détectés</p>
          <div className="flex flex-wrap gap-1.5">
            {keywords.map((k, i) => (
              <span key={i} className="px-2 py-0.5 rounded-full bg-success/10 text-success text-xs font-medium">{k}</span>
            ))}
          </div>
        </div>
      )}
      {missing.length > 0 && (
        <div className="w-full">
          <p className="text-xs font-bold text-destructive mb-2">✗ Mots-clés manquants</p>
          <div className="flex flex-wrap gap-1.5">
            {missing.map((k, i) => (
              <span key={i} className="px-2 py-0.5 rounded-full bg-destructive/10 text-destructive text-xs font-medium">{k}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AtsScore;

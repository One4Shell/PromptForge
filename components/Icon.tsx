
import React from 'react';
import { Terminal, PenTool, BarChart, Drama, Sparkles, Copy, Check, Cpu, Zap, Feather, Sun, Moon, LayoutTemplate, BookOpen, X } from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

const Icon: React.FC<IconProps> = ({ name, className, size = 20 }) => {
  const icons: Record<string, React.ElementType> = {
    Terminal,
    PenTool,
    BarChart,
    Drama,
    Sparkles,
    Copy,
    Check,
    Cpu,
    Zap,
    Feather,
    Sun,
    Moon,
    LayoutTemplate,
    BookOpen,
    X
  };

  const IconComponent = icons[name] || Sparkles;

  return <IconComponent className={className} size={size} />;
};

export default Icon;

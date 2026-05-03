import { useState } from 'react';
import type { LucideIcon } from 'lucide-react'; // Just for some nice icons
import { ChevronRight } from 'lucide-react'; // Just for some nice icons

// 1. The TypeScript "Contract" (Interface)
// This ensures every time we use this component, we provide the right data.
interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  category: 'Development' | 'Design' | 'Marketing';
}

export const FeatureCard = ({ title, description, icon: Icon, category }: FeatureCardProps) => {
  // 2. Logic & Interactivity
  const [isExpanded, setIsExpanded] = useState(false);

  // A bit of "Logic" to determine the badge color based on the category
  const badgeColors = {
    Development: 'bg-blue-100 text-blue-700',
    Design: 'bg-purple-100 text-purple-700',
    Marketing: 'bg-green-100 text-green-700',
  };

  return (
    // 3. JSX & Tailwind (The "Body")
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className="group cursor-pointer rounded-xl border border-slate-200 max-w-lg bg-white p-6 transition-all hover:shadow-lg active:scale-[0.98]"
    >
      <div className="flex items-start justify-between">
        {/* Using a component as a variable (Icon) */}
        <div className="rounded-lg bg-slate-50 p-3 group-hover:bg-slate-200 transition-colors">
          <Icon className="h-6 w-6 text-slate-600" />
        </div>

        <span className={`text-xs font-bold px-2 py-1 rounded-full ${badgeColors[category]}`}>
          {category}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>

      {/* 4. Conditional Rendering (State in Action) */}
      <p className={`mt-2 text-slate-600 transition-all ${isExpanded ? 'line-clamp-none' : 'line-clamp-2'}`}>
        {description}
      </p>

      <div className="mt-4 flex items-center text-sm font-medium text-blue-600">
        {isExpanded ? 'Show less' : 'Read more'}
        <ChevronRight className={`ml-1 h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
      </div>
    </div>
  );
};

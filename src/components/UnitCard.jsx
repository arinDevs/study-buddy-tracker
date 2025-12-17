import React, { useState } from 'react';
import TopicItem from './TopicItem';
import ProgressBar from './ProgressBar';
import { calculateUnitProgress } from '../utils/progressUtils';
import { ChevronDown, ChevronRight, BookOpen } from 'lucide-react';

const UnitCard = ({ unit, unitIndex, onTopicStatusChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const progress = calculateUnitProgress(unit);

  const completedCount = unit.topics.filter(t => t.status === 'completed').length;
  const totalCount = unit.topics.length;

  return (
    <div className="card-glass overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center gap-3 hover:bg-secondary/30 transition-colors"
      >
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-primary" />
        </div>
        <div className="flex-1 text-left min-w-0">
          <h3 className="font-medium text-foreground truncate">{unit.unitName}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {completedCount}/{totalCount} topics completed
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-24 hidden sm:block">
            <ProgressBar progress={progress} size="small" showLabel={false} />
          </div>
          <span className="text-sm font-mono text-primary">{progress}%</span>
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
      </button>
      
      {isExpanded && (
        <div className="px-4 pb-4 space-y-2">
          {unit.topics.map((topic, topicIndex) => (
            <TopicItem
              key={topicIndex}
              topic={topic}
              onStatusChange={() => onTopicStatusChange(unitIndex, topicIndex)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UnitCard;

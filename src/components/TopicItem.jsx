import React from 'react';
import { getStatusLabel } from '../utils/progressUtils';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

const TopicItem = ({ topic, onStatusChange }) => {
  const getStatusIcon = () => {
    switch (topic.status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-warning" />;
      default:
        return <Circle className="w-5 h-5 text-muted-foreground/50" />;
    }
  };

  const getStatusStyles = () => {
    switch (topic.status) {
      case 'completed':
        return 'bg-success/10 border-success/30 hover:bg-success/20';
      case 'in_progress':
        return 'bg-warning/10 border-warning/30 hover:bg-warning/20';
      default:
        return 'bg-secondary/50 border-border hover:bg-secondary';
    }
  };

  return (
    <button
      onClick={onStatusChange}
      className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 text-left group ${getStatusStyles()}`}
    >
      <div className="flex-shrink-0">
        {getStatusIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${topic.status === 'completed' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
          {topic.topicName}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {getStatusLabel(topic.status)}
        </p>
      </div>
      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-xs text-muted-foreground">Click to change</span>
      </div>
    </button>
  );
};

export default TopicItem;

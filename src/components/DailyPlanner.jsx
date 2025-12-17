import React from 'react';
import { generateDailyTasks, getUrgencyLevel } from '../utils/priorityUtils';
import { getStatusLabel } from '../utils/progressUtils';
import { Zap, Clock, AlertTriangle, ChevronRight } from 'lucide-react';

const DailyPlanner = ({ subjects, onNavigateToSubject }) => {
  const tasks = generateDailyTasks(subjects, 5);
  
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const getUrgencyBadge = (daysLeft) => {
    const level = getUrgencyLevel(daysLeft);
    switch (level) {
      case 'critical':
        return <span className="badge-danger">{daysLeft}d left</span>;
      case 'warning':
        return <span className="badge-warning">{daysLeft}d left</span>;
      default:
        return <span className="text-xs text-muted-foreground">{daysLeft}d left</span>;
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="card-glass p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-success" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Today's Study Plan</h2>
            <p className="text-xs text-muted-foreground">{today}</p>
          </div>
        </div>
        <div className="text-center py-8">
          <p className="text-success font-medium">All caught up!</p>
          <p className="text-sm text-muted-foreground mt-1">No pending topics to study</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card-glass overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Today's Study Plan</h2>
            <p className="text-xs text-muted-foreground">{today}</p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-border">
        {tasks.map((task, index) => (
          <button
            key={index}
            onClick={() => onNavigateToSubject(task.subjectId)}
            className="w-full p-4 hover:bg-secondary/30 transition-colors text-left group"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs font-medium text-muted-foreground">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {getUrgencyBadge(task.daysLeft)}
                  {task.status === 'in_progress' && (
                    <span className="flex items-center gap-1 text-xs text-warning">
                      <Clock className="w-3 h-3" />
                      In Progress
                    </span>
                  )}
                </div>
                <p className="font-medium text-foreground text-sm truncate">
                  {task.topicName}
                </p>
                <p className="text-xs text-muted-foreground mt-1 truncate">
                  {task.subjectName.split(' ').slice(0, 4).join(' ')}...
                </p>
                <p className="text-xs text-muted-foreground/70 truncate">
                  {task.unitName}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
            </div>
          </button>
        ))}
      </div>

      <div className="p-3 bg-secondary/30 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          <AlertTriangle className="w-3 h-3 inline mr-1" />
          Tasks auto-prioritized by exam urgency and progress
        </p>
      </div>
    </div>
  );
};

export default DailyPlanner;

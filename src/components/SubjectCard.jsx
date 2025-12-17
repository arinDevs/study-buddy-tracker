import React from 'react';
import ProgressBar from './ProgressBar';
import { calculateSubjectProgress, getTotalTopicsCount, getCompletedTopicsCount } from '../utils/progressUtils';
import { calculateDaysLeft, getDaysLeftLabel, formatDate, isHighPriority, isExamOver } from '../utils/dateUtils';
import { Calendar, ArrowRight, AlertTriangle, CheckCircle } from 'lucide-react';

const SubjectCard = ({ subject, onClick }) => {
  const progress = calculateSubjectProgress(subject);
  const daysLeft = calculateDaysLeft(subject.examDate);
  const totalTopics = getTotalTopicsCount(subject);
  const completedTopics = getCompletedTopicsCount(subject);
  const examOver = isExamOver(daysLeft);
  const highPriority = isHighPriority(daysLeft);

  const getBadge = () => {
    if (examOver) {
      return <span className="badge-success flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Exam Over</span>;
    }
    if (highPriority) {
      return <span className="badge-warning flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Urgent</span>;
    }
    return null;
  };

  const getCardBorder = () => {
    if (examOver) return 'border-success/30';
    if (highPriority) return 'border-warning/50';
    return 'border-border/50';
  };

  return (
    <button
      onClick={onClick}
      className={`w-full card-glass p-5 text-left hover:bg-secondary/30 transition-all duration-200 group ${getCardBorder()}`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {getBadge()}
          </div>
          <h3 className="font-semibold text-foreground text-sm sm:text-base leading-tight line-clamp-2">
            {subject.subjectName}
          </h3>
        </div>
        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
      </div>

      <div className="flex items-center gap-2 text-muted-foreground mb-4">
        <Calendar className="w-4 h-4" />
        <span className="text-xs">{formatDate(subject.examDate)}</span>
        <span className="text-xs">•</span>
        <span className={`text-xs font-medium ${highPriority && !examOver ? 'text-warning' : examOver ? 'text-success' : 'text-muted-foreground'}`}>
          {getDaysLeftLabel(daysLeft)}
        </span>
      </div>

      <ProgressBar progress={progress} />

      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>{completedTopics}/{totalTopics} topics</span>
        <span>{subject.units.length} units</span>
      </div>
    </button>
  );
};

export default SubjectCard;

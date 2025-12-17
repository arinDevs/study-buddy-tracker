import React from 'react';
import UnitCard from './UnitCard';
import ProgressBar from './ProgressBar';
import { calculateSubjectProgress, getTotalTopicsCount, getCompletedTopicsCount, getInProgressTopicsCount } from '../utils/progressUtils';
import { calculateDaysLeft, getDaysLeftLabel, formatDate, isHighPriority, isExamOver } from '../utils/dateUtils';
import { ArrowLeft, Calendar, Target, BookOpen, CheckCircle2 } from 'lucide-react';

const SubjectPage = ({ subject, onBack, onTopicStatusChange }) => {
  const progress = calculateSubjectProgress(subject);
  const daysLeft = calculateDaysLeft(subject.examDate);
  const totalTopics = getTotalTopicsCount(subject);
  const completedTopics = getCompletedTopicsCount(subject);
  const inProgressTopics = getInProgressTopicsCount(subject);
  const examOver = isExamOver(daysLeft);
  const highPriority = isHighPriority(daysLeft);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container max-w-4xl py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Dashboard</span>
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
            {subject.subjectName}
          </h1>
        </div>
      </div>

      <div className="container max-w-4xl py-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="card-glass p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Calendar className="w-4 h-4" />
              <span className="text-xs">Exam Date</span>
            </div>
            <p className="font-semibold text-foreground text-sm">{formatDate(subject.examDate)}</p>
            <p className={`text-xs mt-1 font-medium ${highPriority && !examOver ? 'text-warning' : examOver ? 'text-success' : 'text-primary'}`}>
              {getDaysLeftLabel(daysLeft)}
            </p>
          </div>

          <div className="card-glass p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Target className="w-4 h-4" />
              <span className="text-xs">Progress</span>
            </div>
            <p className="font-semibold text-foreground text-2xl font-mono">{progress}%</p>
          </div>

          <div className="card-glass p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-xs">Completed</span>
            </div>
            <p className="font-semibold text-success text-2xl font-mono">{completedTopics}</p>
            <p className="text-xs text-muted-foreground">of {totalTopics} topics</p>
          </div>

          <div className="card-glass p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <BookOpen className="w-4 h-4" />
              <span className="text-xs">In Progress</span>
            </div>
            <p className="font-semibold text-warning text-2xl font-mono">{inProgressTopics}</p>
            <p className="text-xs text-muted-foreground">topics</p>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="card-glass p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Overall Progress</h3>
          <ProgressBar progress={progress} />
        </div>

        {/* Units */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Units & Topics</h2>
          <div className="space-y-4">
            {subject.units.map((unit, unitIndex) => (
              <UnitCard
                key={unitIndex}
                unit={unit}
                unitIndex={unitIndex}
                onTopicStatusChange={(uIndex, tIndex) => onTopicStatusChange(uIndex, tIndex)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;

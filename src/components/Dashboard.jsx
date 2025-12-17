import React from 'react';
import SubjectCard from './SubjectCard';
import DailyPlanner from './DailyPlanner';
import { sortByPriority } from '../utils/priorityUtils';
import { calculateSubjectProgress } from '../utils/progressUtils';
import { GraduationCap, Target, BookOpen, TrendingUp } from 'lucide-react';

const Dashboard = ({ subjects, onSelectSubject }) => {
  const sortedSubjects = sortByPriority(subjects);
  
  const totalProgress = subjects.length > 0
    ? Math.round(subjects.reduce((sum, s) => sum + calculateSubjectProgress(s), 0) / subjects.length)
    : 0;

  const totalTopics = subjects.reduce((sum, s) => 
    sum + s.units.reduce((uSum, u) => uSum + u.topics.length, 0), 0
  );

  const completedTopics = subjects.reduce((sum, s) => 
    sum + s.units.reduce((uSum, u) => uSum + u.topics.filter(t => t.status === 'completed').length, 0), 0
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container max-w-6xl py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Exam Tracker</h1>
              <p className="text-xs text-muted-foreground">BCA Semester Preparation</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-6xl py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="card-glass p-4 text-center">
            <div className="flex justify-center mb-2">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground font-mono">{totalProgress}%</p>
            <p className="text-xs text-muted-foreground">Overall</p>
          </div>
          <div className="card-glass p-4 text-center">
            <div className="flex justify-center mb-2">
              <BookOpen className="w-5 h-5 text-success" />
            </div>
            <p className="text-2xl font-bold text-foreground font-mono">{completedTopics}</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
          <div className="card-glass p-4 text-center">
            <div className="flex justify-center mb-2">
              <TrendingUp className="w-5 h-5 text-warning" />
            </div>
            <p className="text-2xl font-bold text-foreground font-mono">{totalTopics - completedTopics}</p>
            <p className="text-xs text-muted-foreground">Remaining</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Daily Planner */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <DailyPlanner 
              subjects={subjects} 
              onNavigateToSubject={onSelectSubject}
            />
          </div>

          {/* Subjects List */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Subjects
              <span className="text-muted-foreground font-normal ml-2 text-sm">
                (sorted by priority)
              </span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {sortedSubjects.map((subject) => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  onClick={() => onSelectSubject(subject.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-8">
        <div className="container max-w-6xl py-4">
          <p className="text-xs text-muted-foreground text-center">
            Stay focused. Stay consistent. Ace your exams.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;

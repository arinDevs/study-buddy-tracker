import { calculateDaysLeft } from './dateUtils';
import { calculateSubjectProgress } from './progressUtils';

export const calculatePriority = (subject) => {
  const daysLeft = calculateDaysLeft(subject.examDate);
  const progress = calculateSubjectProgress(subject);
  
  // If exam is over, lowest priority
  if (daysLeft < 0) return -1000;
  
  // Priority formula: lower score = higher priority
  // Nearest exam + lowest progress should come first
  const priority = (daysLeft * 2) - progress;
  
  return priority;
};

export const sortByPriority = (subjects) => {
  return [...subjects].sort((a, b) => {
    const priorityA = calculatePriority(a);
    const priorityB = calculatePriority(b);
    return priorityA - priorityB;
  });
};

export const generateDailyTasks = (subjects, maxTasks = 5) => {
  const tasks = [];
  const sortedSubjects = sortByPriority(subjects);
  
  for (const subject of sortedSubjects) {
    const daysLeft = calculateDaysLeft(subject.examDate);
    
    // Skip if exam is over
    if (daysLeft < 0) continue;
    
    for (const unit of subject.units) {
      for (const topic of unit.topics) {
        if (topic.status !== 'completed' && tasks.length < maxTasks) {
          tasks.push({
            subjectId: subject.id,
            subjectName: subject.subjectName,
            unitName: unit.unitName,
            topicName: topic.topicName,
            status: topic.status,
            daysLeft,
            priority: calculatePriority(subject)
          });
        }
        
        if (tasks.length >= maxTasks) break;
      }
      if (tasks.length >= maxTasks) break;
    }
    if (tasks.length >= maxTasks) break;
  }
  
  return tasks;
};

export const getUrgencyLevel = (daysLeft) => {
  if (daysLeft < 0) return 'over';
  if (daysLeft <= 3) return 'critical';
  if (daysLeft <= 5) return 'warning';
  if (daysLeft <= 10) return 'moderate';
  return 'safe';
};

export const calculateDaysLeft = (examDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const exam = new Date(examDate);
  exam.setHours(0, 0, 0, 0);
  
  const diffTime = exam - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const isHighPriority = (daysLeft) => {
  return daysLeft >= 0 && daysLeft <= 5;
};

export const isExamOver = (daysLeft) => {
  return daysLeft < 0;
};

export const getDaysLeftLabel = (daysLeft) => {
  if (daysLeft < 0) return 'Exam Over';
  if (daysLeft === 0) return 'Today!';
  if (daysLeft === 1) return '1 day left';
  return `${daysLeft} days left`;
};

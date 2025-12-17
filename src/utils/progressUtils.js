export const getStatusValue = (status) => {
  switch (status) {
    case 'completed':
      return 100;
    case 'in_progress':
      return 50;
    case 'not_started':
    default:
      return 0;
  }
};

export const calculateTopicProgress = (topics) => {
  if (!topics || topics.length === 0) return 0;
  
  const totalProgress = topics.reduce((sum, topic) => {
    return sum + getStatusValue(topic.status);
  }, 0);
  
  return Math.round(totalProgress / topics.length);
};

export const calculateUnitProgress = (unit) => {
  return calculateTopicProgress(unit.topics);
};

export const calculateSubjectProgress = (subject) => {
  if (!subject.units || subject.units.length === 0) return 0;
  
  const totalProgress = subject.units.reduce((sum, unit) => {
    return sum + calculateUnitProgress(unit);
  }, 0);
  
  return Math.round(totalProgress / subject.units.length);
};

export const getNextStatus = (currentStatus) => {
  switch (currentStatus) {
    case 'not_started':
      return 'in_progress';
    case 'in_progress':
      return 'completed';
    case 'completed':
      return 'not_started';
    default:
      return 'not_started';
  }
};

export const getStatusLabel = (status) => {
  switch (status) {
    case 'completed':
      return 'Completed';
    case 'in_progress':
      return 'In Progress';
    case 'not_started':
    default:
      return 'Not Started';
  }
};

export const getTotalTopicsCount = (subject) => {
  return subject.units.reduce((sum, unit) => sum + unit.topics.length, 0);
};

export const getCompletedTopicsCount = (subject) => {
  return subject.units.reduce((sum, unit) => {
    return sum + unit.topics.filter(t => t.status === 'completed').length;
  }, 0);
};

export const getInProgressTopicsCount = (subject) => {
  return subject.units.reduce((sum, unit) => {
    return sum + unit.topics.filter(t => t.status === 'in_progress').length;
  }, 0);
};

import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import SubjectPage from './components/SubjectPage';
import { initialSyllabusData } from './data/syllabusData';
import { getNextStatus } from './utils/progressUtils';

const STORAGE_KEY = 'exam-tracker-data';

const App = () => {
  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialSyllabusData;
      }
    }
    return initialSyllabusData;
  });

  const [selectedSubjectId, setSelectedSubjectId] = useState(null);

  // Save to localStorage whenever subjects change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects));
  }, [subjects]);

  const handleSelectSubject = (subjectId) => {
    setSelectedSubjectId(subjectId);
  };

  const handleBackToDashboard = () => {
    setSelectedSubjectId(null);
  };

  const handleTopicStatusChange = (subjectId, unitIndex, topicIndex) => {
    setSubjects(prevSubjects => {
      return prevSubjects.map(subject => {
        if (subject.id !== subjectId) return subject;

        const newUnits = subject.units.map((unit, uIndex) => {
          if (uIndex !== unitIndex) return unit;

          const newTopics = unit.topics.map((topic, tIndex) => {
            if (tIndex !== topicIndex) return topic;
            return {
              ...topic,
              status: getNextStatus(topic.status)
            };
          });

          return { ...unit, topics: newTopics };
        });

        return { ...subject, units: newUnits };
      });
    });
  };

  const selectedSubject = subjects.find(s => s.id === selectedSubjectId);

  if (selectedSubject) {
    return (
      <SubjectPage
        subject={selectedSubject}
        onBack={handleBackToDashboard}
        onTopicStatusChange={(unitIndex, topicIndex) => 
          handleTopicStatusChange(selectedSubjectId, unitIndex, topicIndex)
        }
      />
    );
  }

  return (
    <Dashboard
      subjects={subjects}
      onSelectSubject={handleSelectSubject}
    />
  );
};

export default App;

import React from 'react';

const ProgressBar = ({ progress, size = 'default', showLabel = true }) => {
  const getProgressColor = () => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 50) return 'bg-primary';
    if (progress >= 25) return 'bg-warning';
    return 'bg-muted-foreground/50';
  };

  const heightClass = size === 'small' ? 'h-1.5' : 'h-2.5';

  return (
    <div className="w-full">
      <div className={`w-full bg-muted rounded-full ${heightClass} overflow-hidden`}>
        <div
          className={`${heightClass} ${getProgressColor()} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${progress}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-muted-foreground mt-1 font-mono">
          {progress}% complete
        </p>
      )}
    </div>
  );
};

export default ProgressBar;

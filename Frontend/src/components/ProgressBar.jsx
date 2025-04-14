import React from 'react';

function ProgressBar({ questions, currentQuestionIndex }) {
  const progressBarSegments = questions.map((_, index) => (
    <div
      key={index}
      className={`h-2 ${index <= currentQuestionIndex ? 'bg-orange-500' : 'bg-gray-300'} inline-block border-r border-white`}
      style={{ width: `${100 / questions.length}%` }}
    />
  ));

  return <div className="w-full mb-4 flex">{progressBarSegments}</div>;
}

export default ProgressBar;
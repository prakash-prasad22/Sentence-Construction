import React, { useState, useEffect } from 'react';
import Dialog from './Dialog';
import { GoArrowRight } from "react-icons/go";

function Question({ question, userAnswers, setUserAnswers, onNext, isLastQuestion, questionId }) {
  const [availableOptions, setAvailableOptions] = useState(question?.options || []);
  const [optionPositions, setOptionPositions] = useState({});
  const [showQuitDialog, setShowQuitDialog] = useState(false);
  const [questionSegments, setQuestionSegments] = useState([]);

  useEffect(() => {
    if (question) {
      const positions = {};
      question.options.forEach((option, index) => {
        positions[option] = index;
      });
      setOptionPositions(positions);
      setAvailableOptions(question.options);

      const parts = question.question.split(/(\n|_____________)/);
      const segments = parts.map((part, index) => {
        if (part === '\n') {
          return { type: 'newline' };
        } else if (part === '_____________') {
          return { type: 'blank', blankIndex: Math.floor(index / 2) };
        } else {
          return { type: 'text', text: part };
        }
      });
      setQuestionSegments(segments);
    }
  }, [question]);

  const handleOptionClick = (option) => {
    const optionIndex = userAnswers.indexOf(option);

    if (optionIndex === -1) {
      const emptySlotIndex = question.question.split('_____________').findIndex(
        (_, index) => !userAnswers[index]
      );
      if (emptySlotIndex !== -1) {
        const newUserAnswers = [...userAnswers];
        newUserAnswers[emptySlotIndex] = option;
        setUserAnswers(newUserAnswers);
        setAvailableOptions(availableOptions.filter((opt) => opt !== option));
      }
    } else {
      const newUserAnswers = [...userAnswers];
      newUserAnswers[optionIndex] = null;
      setUserAnswers(newUserAnswers);
      setAvailableOptions((prevOptions) => {
        const newOptions = [...prevOptions];
        const originalPosition = optionPositions[option];
        newOptions.splice(originalPosition, 0, option);
        return newOptions;
      });
    }
  };

  if (!question) {
    return <div>Loading Question...</div>;
  }

  const isAnswered = userAnswers?.filter(Boolean).length === question?.correctAnswer?.length;

  return (
    <div>
      <p className="p-6 leading-loose text-center text-gray-500 text-[20px] font-semibold">Select the missing words in the correct order</p>
      <div className="text-[18px] md:text-[20px] leading-[30px] md:leading-[50px]">
        {questionSegments.map((segment, index) => {
          if (segment.type === 'text') {
            return <span key={`text-${index}`}>{segment.text}</span>;
          } else if (segment.type === 'blank') {
            return (
              <span
                key={`blank-${index}`}
                className={`font-semibold text-black rounded p-1 relative cursor-pointer ${
                  userAnswers[segment.blankIndex] ? 'border border-black bg-white' : ''
                }`}
                onClick={() => userAnswers[segment.blankIndex] && handleOptionClick(userAnswers[segment.blankIndex])}
                style={{ whiteSpace: 'nowrap' }}
              >
                {userAnswers[segment.blankIndex] && (
                  <span className="absolute inset-0 flex items-center justify-center">{userAnswers[segment.blankIndex]}</span>
                )}
                ______________________
              </span>
            );
          } else {
            return <br key={`br-${index}`} />;
          }
        })}
      </div>
      <div className="flex flex-wrap gap-2 m-8 md:m-12 items-center justify-center">
        {availableOptions.map((option, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded border border-gray-300 cursor-pointer`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="flex flex-row-reverse">
        <button
          className={`bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-lg ${!isAnswered && 'opacity-50 bg-gray-500 cursor-not-allowed'}`}
          onClick={onNext}
          disabled={!isAnswered}
        >
          {isLastQuestion ? 'Submit' : <GoArrowRight size={25} />}
        </button>
      </div>
      <Dialog
        isOpen={showQuitDialog}
        onClose={() => setShowQuitDialog(false)}
        title="Quit Quiz"
        content="Are you sure you want to quit the quiz?"
        onConfirm={() => {
          setShowQuitDialog(false);
        }}
      />
    </div>
  );
}

export default Question;
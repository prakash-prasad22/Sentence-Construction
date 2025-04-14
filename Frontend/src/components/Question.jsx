import React, { useState, useEffect } from 'react';
import Dialog from './Dialog';
import { GoArrowRight } from "react-icons/go";

/**
 * Question Component
 * ------------------
 * Displays a single question for the Sentence Construction game.
 *
 * Overview:
 * This component renders a question where the user has to construct a sentence
 * by selecting words from a list and placing them in the correct order.
 *
 * Features:
 * - Displays the question text with blanks.
 * - Provides a list of options (words) to fill in the blanks.
 * - Allows users to select options and place them in the blanks.
 * - Updates the user's answers as options are selected or deselected.
 * - Highlights selected options in the blanks.
 * - Re-arranges options when a selected option is removed from a blank.
 * - Provides a "Next" or "Submit" button to proceed.
 * - Displays a confirmation dialog when the user tries to quit.
 *
 * Technical Details:
 * - Uses the `useState` hook to manage component state:
 *   - `availableOptions`:  The options (words) that are still available to be selected.
 *   - `optionPositions`: An object mapping options to their original positions in the options list.
 *   - `showQuitDialog`:  Controls the visibility of the quit confirmation dialog.
 *   - `questionSegments`: stores the question text split into segments
 * - Uses the `useEffect` hook to process the question text and options when the `question` prop changes.
 * - Uses the `Dialog` component to display the quit confirmation dialog.
 *
 * -It splits the question text into segments of type text, blank and newline.
 *
 * -The  `handleOptionClick` function handles selecting and deselecting the options.
 *
 * - The  `isAnswered` variable checks if the number of user answers matches the number of correct answers.
 *
 * Props:
 * - `question`:   {object}  - The question data, including the question text and options.
 * - `userAnswers`:  {string[]} - An array representing the user's current answers for the question.
 * - `setUserAnswers`:  {function} - A callback function to update the user's answers in the parent component.
 * - `onNext`:   {function} - A callback function to proceed to the next question or submit the test.
 * - `isLastQuestion`: {boolean} - Indicates whether this is the last question in the test.
 * - `questionId`:    {string}  - Id of the current question.
 */


function Question({ question, userAnswers, setUserAnswers, onNext, isLastQuestion, questionId }) {
  // State variables
  const [availableOptions, setAvailableOptions] = useState(question?.options || []);
  const [optionPositions, setOptionPositions] = useState({});
  const [showQuitDialog, setShowQuitDialog] = useState(false);
  const [questionSegments, setQuestionSegments] = useState([]);

  /**
   * Processes the question data when the question prop changes.
   *
   * - Initializes the `optionPositions` state with the original positions of the options.
   * - Initializes the `availableOptions` state with the question's options.
   * - Splits the question.question into segments.
   */
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

  /**
   * Handles the click event when a user selects an option.
   *
   * - If the option is not already in the user's answer:
   *   - Finds the first empty slot in the user's answers.
   *   - If an empty slot is found, adds the option to that slot.
   *   - Removes the option from the `availableOptions` state.
   * - If the option is already in the user's answer:
   *   - Removes the option from its current slot in the user's answers.
   *   - Adds the option back to the `availableOptions` state, maintaining its original position.
   *
   * @param {string} option - The selected option (word).
   */

  const handleOptionClick = (option) => {
    const optionIndex = userAnswers.indexOf(option);

    if (optionIndex === -1) {
      // Option not in userAnswers
      const emptySlotIndex = question.question.split('_____________').findIndex(
        (_, index) => !userAnswers[index]
      );
      if (emptySlotIndex !== -1) {
        // Found an empty slot
        const newUserAnswers = [...userAnswers];
        newUserAnswers[emptySlotIndex] = option;
        setUserAnswers(newUserAnswers);
        setAvailableOptions(availableOptions.filter((opt) => opt !== option));
      }
    } else {
      // Option is already in userAnswers (deselect)
      const newUserAnswers = [...userAnswers];
      newUserAnswers[optionIndex] = null;
      setUserAnswers(newUserAnswers);
      setAvailableOptions((prevOptions) => {
        const newOptions = [...prevOptions];
        const originalPosition = optionPositions[option];
        newOptions.splice(originalPosition, 0, option); // Insert at original position
        return newOptions;
      });
    }
  };

  // Render loading message if question is not available
  if (!question) {
    return <div>Loading Question...</div>;
  }

  //check if the user has answered the question
  const isAnswered = userAnswers?.filter(Boolean).length === question?.correctAnswer?.length;

  /**
   * Renders the Question component.
   *
   * @returns {JSX.Element} The JSX representation of the Question component.
   */
  return (
    <div>
      {/* Instructions */}
      <p className="p-6 leading-loose text-center text-gray-500 text-[20px] font-semibold">Select the missing words in the correct order</p>

      {/* Question text with blanks */}
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

      {/* Available Options (words) */}
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

      {/* Next/Submit Button */}
      <div className="flex flex-row-reverse">
        <button
          className={`bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-lg ${!isAnswered && 'opacity-50 bg-gray-500 cursor-not-allowed'}`}
          onClick={onNext}
          disabled={!isAnswered}
        >
          {isLastQuestion ? 'Submit' : <GoArrowRight size={25} />}
        </button>
      </div>

      {/* Quit Confirmation Dialog */}
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
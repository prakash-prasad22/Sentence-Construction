import { useState, useEffect, memo } from 'react';

/**
 * Timer Component
 * ---------------
 * Displays a countdown timer for a question, with visual feedback as time decreases.
 *
 * Overview:
 * This component displays a timer that counts down from 60 seconds. When the timer
 * reaches 10 seconds, the text color changes to red. When the timer reaches 0,
 * it triggers a callback function provided by the parent component.  The timer
 * is memoized to prevent unnecessary re-renders.
 *
 * Features:
 * - Displays a countdown timer, initially set to 60 seconds.
 * - Updates the timer display every second.
 * - Changes the timer text color to red when 10 seconds or less remain.
 * - Calls a provided callback function (`onTimerEnd`) when the timer reaches 0.
 * - Uses memoization to prevent unnecessary re-renders when the `questionId` prop
 * remains the same.
 *
 * Technical Details:
 * - Uses `useState` to manage the timer value and text color.
 * - Uses `useEffect` to start and clear the timer interval.  The effect
 * depends on the `questionId` prop, so the timer restarts when a new
 * question is loaded.
 * - Uses `memo` to prevent re-renders if the `questionId` prop doesn't change.
 * - Displays the timer in "00:SS" format.
 *
 * Props:
 * - `questionId`: {string} - An identifier for the current question.  This is used
 *                to ensure the timer restarts when a new question is displayed.
 * - `onTimerEnd`: {function} - A callback function to be called when the timer reaches 0.
 *
 * Memoization:
 * - The component is memoized using `memo` to prevent unnecessary re-renders.
 * - The memoization function checks if the `questionId` prop has changed. If it
 *   hasn't, the component will not re-render, even if its parent component re-renders.
 */


function Timer({ questionId, onTimerEnd }) {
  const [timer, setTimer] = useState(60);
  const [textColor, setTextColor] = useState('black');

  /**
   * useEffect hook to manage the timer countdown.
   *
   * - Sets the timer to 60 and text color to gray when the component mounts
   * or when the `questionId` changes.
   * - Uses `setInterval` to decrement the timer every second.
   * - Changes the text color to red when the timer is 10 or less.
   * - Calls `onTimerEnd` and clears the interval when the timer reaches 0.
   * - Clears the interval when the component unmounts or when the
   * `questionId` changes (to prevent memory leaks and restart the timer
   * for a new question).
   */
  useEffect(() => {
    setTimer(60);// Initialize timer
    setTextColor('gray'); // Initialize text color
    let interval;

    interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          // Update timer value
          if (prevTimer <= 11) {
            setTextColor('red'); // Change color when timer is low
          }
          return prevTimer - 1;
        } else {
          // Timer has reached 0
          clearInterval(interval); // Clear interval
          onTimerEnd(); // Call the onTimerEnd callback
          return 0;
        }
      });
    }, 1000);

    // Cleanup function to clear the interval
    return () => {
      clearInterval(interval);
    };
  }, [questionId, onTimerEnd]); // Dependency array: timer restarts when questionId changes

  /**
   * Renders the Timer component.
   *
   * @returns {JSX.Element} The JSX representation of the Timer component.
   */
  return (
    <div className="flex justify-between mb-4">
      <span className="font-semibold text-xl" style={{ color: textColor }}>{`00:${timer < 10 ? '0' : ''}${timer}`}</span>
    </div>
  );
}

/**
 * Memoized Timer Component
 * -----------------------
 * A memoized version of the Timer component to prevent unnecessary re-renders.
 *
 * Memoization:
 * - Uses `memo` to prevent re-renders if the `questionId` prop is the same.
 * - The comparison function checks only the `questionId` prop. If it's the same,
 * the component will not re-render.
 */
const MemoizedTimer = memo(Timer, (prevProps, nextProps) => {
  return prevProps.questionId === nextProps.questionId;
});

export default MemoizedTimer;
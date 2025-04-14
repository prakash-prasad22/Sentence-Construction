import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Question from '../components/Question';
import Timer from '../components/Timer';
import Dialog from '../components/Dialog';


/**
 * Test Component
 * --------------
 * Manages the presentation of Sentence Construction test to the user.
 *
 * Overview:
 * This component fetches quiz questions from a backend API, displays them one at a time,
 * tracks the user's answers, and handles navigation between questions and to the result page.
 * It also includes a timer for each question and a dialog to confirm quitting the test.
 *
 * Features:
 * - Fetches quiz questions from a remote API using axios.
 * - Manages the state of the questions, user answers, and current question.
 * - Displays each question using the Question component.
 * - Uses a Timer component to time each question.
 * - Provides a "Quit" button with a confirmation dialog.
 * - Navigates to the Result component when the test is completed.
 * - Displays a progress bar to show the user's progress through the test.
 * - Handles loading states.
 *
 * Lifecycle:
 * - Mount:
 *   - Fetches questions from the API and initializes the component's state.
 * - Update:
 *   - Renders the current question and updates the progress bar.
 * - Unmount:
 *   -  The timer component handles its own cleanup, so no explicit unmount logic is needed here.
 *
 * State:
 * - `questions`:  {object}  - An object mapping question IDs to question data.
 * - `userAnswers`:  {object}  - An object mapping question IDs to the user's answers (arrays of strings).
 * - `currentQuestionId`:  {string}  - The ID of the currently displayed question.
 * - `showQuitDialog`:   {boolean} - Controls the visibility of the quit confirmation dialog.
 * - `loading`: {boolean} - Indicates whether the questions are currently being loaded.
 *
 * Navigation:
 * - Uses react-router-dom's `useNavigate` hook to navigate to:
 *   - The result page (`/result`) when the test is finished.
 *   - The home page (`/`) when the user confirms quitting the test.
 */


function Test() {
  const [questions, setQuestions] = useState({});
  const [userAnswers, setUserAnswers] = useState({});
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  //const [showFeedback, setShowFeedback] = useState(false);
  const [showQuitDialog, setShowQuitDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /**
   * Fetch questions from the API and initialize state.
   *
   * On mount:
   * - Fetches question data from 'https://sentence-construction-backend.onrender.com/data' using axios.
   * - Processes the response to:
   *   -  Create a `questionsData` object, mapping question IDs to question objects.
   *   -  Create an `answersData` object, initializing each question's answer with an array of nulls.
   * - Sets the `questions` and `userAnswers` state variables.
   * - Sets the `currentQuestionId` to the ID of the first question.
   * - Sets `loading` to false.
   * - Handles errors during the fetch by logging to the console and setting loading to false.
   */
  useEffect(() => {
    setLoading(true);  // Set loading to true before fetching data.
    axios
      .get('https://sentence-construction-backend.onrender.com/data')
      .then((response) => {
        const questionsData = {};
        const answersData = {};
        response.data.questions.forEach((question) => {
          questionsData[question.questionId] = question;
          answersData[question.questionId] = Array(4).fill(null);  // Initialize user answers for each question
        });
        setQuestions(questionsData);
        setUserAnswers(answersData);
        setCurrentQuestionId(response.data.questions[0].questionId); // Set the first question
        setLoading(false);  // Set loading to false after successful fetch
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);  // Set loading to false on error as well to prevent app hang
      });
  }, []);  // Empty dependency array ensures this runs only once on mount

  /**
   * Handles moving to the next question or submitting the test.
   *
   * - Gets an array of question IDs from the `questions` state.
   * - Finds the index of the `currentQuestionId` in the array.
   * - If it's not the last question, it updates `currentQuestionId` to the next question.
   * - If it's the last question, it navigates to the '/result' route, passing the questions and user answers.
   */
  const handleNext = () => {
    const questionIds = Object.keys(questions);
    const currentIndex = questionIds.indexOf(currentQuestionId);
    if (currentIndex < questionIds.length - 1) {
      setCurrentQuestionId(questionIds[currentIndex + 1]);
    } else {
      navigate('/result', { state: { questions: Object.values(questions), userAnswers } }); 
    }
  };

  /**
   * Renders the progress bar segments.
   *
   * - Maps over the question IDs in the `questions` state.
   * - For each question, it creates a div element representing a segment of the progress bar.
   * - The segment's color is determined by whether the question has been answered.
   *
   * @returns {JSX.Element[]} An array of div elements representing the progress bar segments.
   */
  const progressBarSegments = Object.keys(questions).map((questionId, index) => (
    <div
      key={questionId}
      className={`h-3 ${
        index <= Object.keys(questions).indexOf(currentQuestionId)
          ? 'bg-orange-500'
          : 'bg-gray-300'
      } inline-block border-r border-white border-4  rounded-lg`}
      style={{ width: `${100 / Object.keys(questions).length}%` }}
    />
  ));

  // Render loading state
  if (loading) {
    return <div className="text-center font-bold pt-[10vh]">Loading...</div>;
  }

  // Render loading state if there are no questions
  if (!currentQuestionId) {
    return <div className="text-center font-bold pt-[10vh]">Loading...</div>;
  }

  /**
   * Renders the Test component.
   *
   * @returns {JSX.Element} The JSX representation of the Test component.
   */
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="mx-auto max-w-[95vw] md:max-w-[80vw] p-4 md:p-8">
        <div className="bg-white rounded-lg shadow-2xl p-4 md:p-16">

          {/* Header with Timer and Quit Button */}
          <div className="flex justify-between mb-4">
            <Timer questionId={currentQuestionId} onTimerEnd={handleNext} />
            <button className="bg-white px-4 py-1 border border-gray-400 rounded-lg hover:bg-gray-100" onClick={() => setShowQuitDialog(true)}>
              Quit
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full mb-4 flex">{progressBarSegments}</div>

          {/* Question Component */}
          <Question
            question={questions[currentQuestionId]}
            userAnswers={userAnswers[currentQuestionId]}
            setUserAnswers={(newAnswers) => {
              setUserAnswers({ ...userAnswers, [currentQuestionId]: newAnswers });
            }}
            onNext={handleNext}
            isLastQuestion={Object.keys(questions).indexOf(currentQuestionId) === Object.keys(questions).length - 1}
            questionId={currentQuestionId}
          />
        </div>
      </div>

      {/* Quit Confirmation Dialog */}
      <Dialog
        isOpen={showQuitDialog}
        onClose={() => setShowQuitDialog(false)}
        onConfirm={() => {
          navigate("/")
          setShowQuitDialog(false);
        }}
      />
    </div>
  );
}

export default Test;

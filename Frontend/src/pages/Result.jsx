import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

/**
 * Result Component
 * ----------------
 * Displays the results of the Sentence Construction test.
 *
 * Overview:
 * This component retrieves the user's answers and the correct answers for each question
 * from the route's location state. It calculates the user's score, displays the score
 * as a percentage, and provides a detailed breakdown of each question, showing the
 * correct answer and the user's response.  It also provides a button to navigate back
 * to the dashboard.
 *
 * Features:
 * - Calculates and displays the user's score as a percentage.
 * - Shows the score in green if above 50%, red if below, and gray if 0%.
 * - Displays a "Go To Dashboard" button to return to the main page.
 * - Iterates through each question and displays:
 * - The question text with blanks filled in.
 * - The correct answer.
 * - The user's response.
 * - Highlights correct answers in green and incorrect answers in red.
 * - Handles cases where the user didn't answer a question.
 *
 * Data Flow:
 * - Retrieves question data and user answers from the `location.state` passed
 *   by the routing mechanism (from the test page).
 * - If `location.state` is undefined, it defaults to empty arrays for questions
 *   and an empty object for userAnswers to prevent errors.
 */



function Result() {

  // Get the current location object, which contains data passed from the previous page.
  const location = useLocation();

  // Extract the questions and userAnswers from the location's state.
  // If location.state is undefined (if the user navigates directly to /Result),
  // default to empty values to prevent errors.
  const { questions, userAnswers } = location.state || { questions: [], userAnswers: {} };

  // Initialize navigation using react-router-dom's useNavigate hook.
  const navigate = useNavigate()

  // Calculate the user's score.
  let score = 0;
  questions.forEach((question) => {
    const isCorrect = JSON.stringify(question.correctAnswer) === JSON.stringify(userAnswers[question.questionId]);
    if (isCorrect) score++;
  });

  // Calculate the score as a percentage.
  const percentage = (score / questions.length) * 100;

  // Determine the color of the score text based on the percentage.
  const scoreColor = percentage > 50 ? 'green' : 'red';
  const scoreBorderColor = percentage > 50 ? 'border-green-500' : percentage === 0 ? 'border-gray-500' : 'border-red-500';

  
  /**
   * Renders the Result component.
   *
   * @returns {JSX.Element} The JSX representation of the Result component.
   */
  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4">
      <div className="mx-auto max-w-[95vw] md:max-w-[80vw] p-4 md:p-8">
        <div className="bg-white p-4 md:p-16">

          {/* Display the overall score as a percentage */}
          <div className="flex justify-center mb-16">
            <div
              className={`rounded-full w-32 h-32 flex flex-col items-center justify-center border-8 ${scoreBorderColor}`}
            >
              <span className={`text-3xl font-bold text-${scoreColor}-500`}>{percentage.toFixed(0)}%</span>
              <span className="text-sm text-gray-600">Overall Score</span>
            </div>
          </div>

          {/* Button to navigate back to the dashboard */}
          <div className="flex justify-center">
            <button 
                className="px-16 py-2 mb-12 bg-blue-600 text-white text-[20px] font-semibold hover:bg-blue-900 rounded-lg cursor-pointer" 
                onClick={()=>navigate("/")}>
                  Go To Dashboard
            </button>
          </div>

          {/* Display results for each question */}
          {questions.map((question) => {
            const isCorrect = JSON.stringify(question.correctAnswer) === JSON.stringify(userAnswers[question.questionId]);

            const displayQuestionWithAnswers = (answers, userAnswersForQuestion) => {
              const questionParts = question.question.split('_____________');
              return questionParts.map((part, index) => (
                <span key={index}>
                  {part}
                  {/* Display the answer if it exists for this part of the question */}
                  {index < answers.length && (
                    <span
                      className={`font-semibold ${
                        userAnswersForQuestion && userAnswersForQuestion[index] === answers[index]
                          ? 'text-green-500'
                          : userAnswersForQuestion && userAnswersForQuestion[index]
                          ? 'text-red-500'
                          : 'text-black'
                      }`}
                    >
                      {answers[index] || <span className="text-black">_____________</span>}
                    </span>
                  )}
                </span>
              ));
            };

            return (
              <div key={question.questionId} className={`mb-8 rounded-lg shadow shadow-sm flex flex-col ${isCorrect ? 'shadow-green-200' : 'shadow-red-200'}`}>

                {/* Correct/Incorrect indicator */}
                <div className="flex justify-end p-4">
                  <div className={`font-semibold ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                    {isCorrect ? 'Correct' : 'Incorrect'}
                  </div>
                </div>

                {/* Correct Answer */}
                <div className="relative mb-4 px-8 py-4">
                  <p className="pb-2 text-gray-600">Correct Answer :</p>
                  <p className="mb-2">{displayQuestionWithAnswers(question.correctAnswer)}</p>
                </div>
                <hr className="border-t border-gray-300" />

                {/* User's Response */}
                <div className="bg-gray-100">
                <div className="my-4 px-8 py-4">
                  <p className="pb-2 text-gray-600">Your Response :</p>
                  <p className="mb-2">{displayQuestionWithAnswers(userAnswers[question.questionId], question.correctAnswer)}</p>
                </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      
      
    </div>
  );
}

export default Result;
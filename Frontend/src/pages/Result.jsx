import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';


function Result() {

  const location = useLocation();
  const { questions, userAnswers } = location.state || { questions: [], userAnswers: {} };



  const navigate = useNavigate()

  let score = 0;
  questions.forEach((question) => {
    const isCorrect = JSON.stringify(question.correctAnswer) === JSON.stringify(userAnswers[question.questionId]);
    if (isCorrect) score++;
  });

  const percentage = (score / questions.length) * 100;
  const scoreColor = percentage > 50 ? 'green' : 'red';
  const scoreBorderColor = percentage > 50 ? 'border-green-500' : percentage === 0 ? 'border-gray-500' : 'border-red-500';

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4">
      <div className="mx-auto max-w-[95vw] md:max-w-[80vw] p-4 md:p-8">
        <div className="bg-white p-4 md:p-16">
          <div className="flex justify-center mb-16">
            <div
              className={`rounded-full w-32 h-32 flex flex-col items-center justify-center border-8 ${scoreBorderColor}`}
            >
              <span className={`text-3xl font-bold text-${scoreColor}-500`}>{percentage.toFixed(0)}%</span>
              <span className="text-sm text-gray-600">Overall Score</span>
            </div>
          </div>

          <div className="flex justify-center">
            <button 
                className="px-16 py-2 mb-12 bg-blue-600 text-white text-[20px] font-semibold hover:bg-blue-900 rounded-lg cursor-pointer" 
                onClick={()=>navigate("/")}>
                  Go To Dashboard
            </button>
          </div>


          {questions.map((question) => {
            const isCorrect = JSON.stringify(question.correctAnswer) === JSON.stringify(userAnswers[question.questionId]);

            const displayQuestionWithAnswers = (answers, userAnswersForQuestion) => {
              const questionParts = question.question.split('_____________');
              return questionParts.map((part, index) => (
                <span key={index}>
                  {part}
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
                <div className="flex justify-end p-4">
                  <div className={`font-semibold ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                    {isCorrect ? 'Correct' : 'Incorrect'}
                  </div>
                </div>
                <div className="relative mb-4 px-8 py-4">
                  <p className="pb-2 text-gray-600">Correct Answer :</p>
                  <p className="mb-2">{displayQuestionWithAnswers(question.correctAnswer)}</p>
                </div>
                <hr className="border-t border-gray-300" />
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
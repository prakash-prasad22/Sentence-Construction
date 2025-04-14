import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Question from '../components/Question';
import Result from './Result';
import Timer from '../components/Timer';
import Dialog from '../components/Dialog';

function Test() {
  const [questions, setQuestions] = useState({});
  const [userAnswers, setUserAnswers] = useState({});
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  //const [showFeedback, setShowFeedback] = useState(false);
  const [showQuitDialog, setShowQuitDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://sentence-construction-backend.onrender.com/data')
      .then((response) => {
        const questionsData = {};
        const answersData = {};
        response.data.questions.forEach((question) => {
          questionsData[question.questionId] = question;
          answersData[question.questionId] = Array(4).fill(null);
        });
        setQuestions(questionsData);
        setUserAnswers(answersData);
        setCurrentQuestionId(response.data.questions[0].questionId);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleNext = () => {
    const questionIds = Object.keys(questions);
    const currentIndex = questionIds.indexOf(currentQuestionId);
    if (currentIndex < questionIds.length - 1) {
      setCurrentQuestionId(questionIds[currentIndex + 1]);
    } else {
      navigate('/result', { state: { questions: Object.values(questions), userAnswers } }); 
    }
  };

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

  if (loading) {
    return <div className="text-center font-bold pt-[10vh]">Loading...</div>;
  }

  if (!currentQuestionId) {
    return <div className="text-center font-bold pt-[10vh]">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="mx-auto max-w-[95vw] md:max-w-[80vw] p-4 md:p-8">
        <div className="bg-white rounded-lg shadow-2xl p-4 md:p-16">
          <div className="flex justify-between mb-4">
            <Timer questionId={currentQuestionId} onTimerEnd={handleNext} />
            <button className="bg-white px-4 py-1 border border-gray-400 rounded-lg hover:bg-gray-100" onClick={() => setShowQuitDialog(true)}>
              Quit
            </button>
          </div>
          <div className="w-full mb-4 flex">{progressBarSegments}</div>
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

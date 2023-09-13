import React, { useState, useEffect } from "react";
import axios from "axios";
import Question from "./Question";

export default function Quiz({ selectedCategory }) {
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [reload, setReload] = useState(false);

  const handlePlayAgain = () => {
    setReload(!reload);  // Toggle reload state to trigger useEffect
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsFinished(false); // Reset isFinished state to false
    console.log("Play Again:", reload);
  };

  const checkFinishedQuiz = () => {
    if (currentQuestionIndex === questions.length - 1) {
        setIsFinished(true);
    }
    console.log("Finished Quiz:", isFinished);
  };

  useEffect(() => {
    checkFinishedQuiz();
  }, [currentQuestionIndex]);


  useEffect(() => {
    console.log("Current Score:", score);
  }, [score]);  

  useEffect(() => {
    axios
      .get(
        `https://opentdb.com/api.php?amount=10&category=${selectedCategory.id}`
      )
      .then((response) => {
        setQuestions(response.data.results);
        setIsLoadingQuestions(false);
      });
  }, [selectedCategory, reload]);

  if (!isFinished) {
    return (
      <div className="bg-blue-900 text-white min-h-screen flex flex-col items-center justify-center">
        {isLoadingQuestions ? (
          <p>Loading questions...</p>
        ) : (
          <div>
            <h1 className="text-4xl mb-6">{selectedCategory.name}</h1>
            <div className="bg-blue-700 text-white p-6 rounded-lg w-[80%]">
              {questions.length > 0 && currentQuestionIndex < questions.length ? (
                <div>
                  <Question
                    question={questions[currentQuestionIndex]}
                    currentQuestionIndex={currentQuestionIndex}
                    setScore={setScore} // Pass the setScore function as a prop to the Question component
                    score={score} // Pass the score state variable as a prop to the Question component
                  />
                </div>
              ) : (
                <p>Loading question...</p>
              )}
              <button
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
              >
                Next Question
              </button>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="bg-blue-900 text-white min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl mb-6">You scored {score} out of {questions.length}!</h1>
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={handlePlayAgain}>Play Again</button>
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={() => window.location.reload()}>Play New Category</button>
        
      </div>
    );
  }
}

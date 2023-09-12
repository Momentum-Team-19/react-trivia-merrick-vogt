import React, { useState, useEffect } from "react";
import axios from "axios";
import Question from "./Question";

export default function Quiz({ selectedCategory }) {
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    axios
      .get(
        `https://opentdb.com/api.php?amount=10&category=${selectedCategory.id}`
      )
      .then((response) => {
        setQuestions(response.data.results);
        setIsLoadingQuestions(false);
      });
  }, [selectedCategory]);

  return (
    <div className="bg-blue-900 text-white min-h-screen flex flex-col items-center justify-center">
      {isLoadingQuestions ? (
        <p>Loading questions...</p>
      ) : (
        <div>
          <h1 className="text-4xl mb-6">{selectedCategory.name}</h1>
          <div className="bg-blue-700 text-white p-6 rounded-lg w-[80%]">
            {questions.length > 0 ? (
              <div>
                <Question
                  question={questions[currentQuestionIndex]}
                  currentQuestionIndex={currentQuestionIndex}
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
}

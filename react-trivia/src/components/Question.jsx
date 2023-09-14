import React, { useState, useEffect } from "react";
import Llm from "./Llm";

export default function Question({
  question,
  currentQuestionIndex,
  setScore,
  score,
}) {
    
  const [answers, setAnswers] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);

  const checkAnswer = (answer) => {
    if (answer === question.correct_answer) {
      
      setIsCorrect(true);
      setScore(score + 1);
    } else {
      
      setIsCorrect(false);
    }
  };

  useEffect(() => {
    if (question) {
      const newAnswers = [...question.incorrect_answers];
      newAnswers.push(question.correct_answer);
      newAnswers.sort(() => Math.random() - 0.5);
      setAnswers(newAnswers);
    }
    setIsCorrect(null);
    
  }, [question]);

  return (
    <div>
      <p
        className=""
        dangerouslySetInnerHTML={{ __html: question.question }}
      ></p>
      <ul>
        {answers.map((answer, index) => (
          <li key={index} className="mb-2">
            <button
              onClick={() => checkAnswer(answer)}
              dangerouslySetInnerHTML={{ __html: answer }}
            ></button>
          </li>
        ))}
      </ul>
      {isCorrect === true && <p>Correct!</p>}
      {isCorrect === false && <p>Incorrect!</p>}
      {<Llm 
        question={question}
      />}
    </div>
  );
}

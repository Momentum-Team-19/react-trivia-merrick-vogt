import React, { useState, useEffect } from 'react';

export default function Question({ question, currentQuestionIndex }) {
    const [answers, setAnswers] = useState([]);
    
    const [isCorrect, setIsCorrect] = useState(null);

    const checkAnswer = (answer) => {
        if (answer === question.correct_answer) {
            console.log('correct');
            setIsCorrect(true);
        } else {
            console.log('incorrect');
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
        console.log(question);
    }, [question]);

    return (
        <div>
            <p className="flex justify-center" dangerouslySetInnerHTML={{ __html: question.question }}></p>
            <ul>
                {answers.map((answer, index) => (
                    <li key={index} className="mb-2">
                        <button 
                        onClick={() => checkAnswer(answer)}
                        dangerouslySetInnerHTML={{ __html: answer }}></button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
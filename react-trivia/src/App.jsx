import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php').then((response) => {
      const sortedCategories = response.data.trivia_categories.sort((a, b) => a.name.localeCompare(b.name));
      setCategories(sortedCategories);
    });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      axios
        .get(`https://opentdb.com/api.php?amount=10&category=${selectedCategory.id}`)
        .then((response) => {
          setQuestions(response.data.results);
        });
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (questions.length > 0 && questions[currentQuestionIndex]) {
      const newAnswers = [...questions[currentQuestionIndex].incorrect_answers];
      newAnswers.push(questions[currentQuestionIndex].correct_answer);
      newAnswers.sort(() => Math.random() - 0.5);
      console.log(newAnswers);
      setAnswers(newAnswers);
    }
  }, [currentQuestionIndex, questions]);

  let content;
  if (selectedCategory === null) {
    content = (
      <div className="bg-blue-900 text-white min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl mb-6">Who wants to be a Millionaire??</h1>
        <div className="bg-blue-700 text-white p-6 rounded-lg">
          <h2 className="text-2xl mb-4">Categories</h2>
          <ul>
            {categories.map((category) => (
              <li key={category.id} className="mb-2">
                <button onClick={() => setSelectedCategory(category)}>{category.name}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  } else {
    content = (
      <div className="bg-blue-900 text-white min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl mb-6">{selectedCategory.name}</h1>
        <div className="bg-blue-700 text-white p-6 rounded-lg w-[80%]">                   
          <div>
            {questions.length > 0 && answers.length > 0 ? (
              <div>
                <p dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex].question }}></p>
                <ul>
                  {answers.map((answer, index) => (
                    <li key={index} className="mb-2">
                      <button>{answer}</button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>Loading question...</p>
            )}
            <button onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>Next Question</button>
          </div>
        </div>
      </div>
    );
  }

  return content;
}

export default App;

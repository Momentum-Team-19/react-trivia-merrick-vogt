import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import Quiz from './components/Quiz';

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php').then((response) => {
      const sortedCategories = response.data.trivia_categories.sort((a, b) => a.name.localeCompare(b.name));
      setCategories(sortedCategories);
    });
  }, []);

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
    content = <Quiz selectedCategory={selectedCategory} />; // render the Quiz component  
  }

  return content;
}

export default App;

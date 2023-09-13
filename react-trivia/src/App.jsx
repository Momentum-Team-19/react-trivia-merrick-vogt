import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import Quiz from './components/Quiz';
import Header from './components/Header';  
import millionaireBackground from './assets/millionaire.png';


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
      <div className="">
        <div className="border-white border-solid border-2 bg-blue-700 text-white font-bold mb-4 pt-3 rounded">
          <h2 className="text-center text-2xl text-white font-semibold mb-4">Choose a Category</h2>
        </div>
          <div className="grid grid-cols-2 gap-y-8 gap-x-64">
            {categories.map((category) => (
              
              <button key={category.id} onClick={() => setSelectedCategory(category)}
                      className="border-white border-solid border-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >{category.name}</button>
              
            ))}
          </div>
        
      </div>
    );
  } else {
    content = <Quiz selectedCategory={selectedCategory} />;
  }

  return (
  <div className="min-h-screen max-h-screen overflow-hidden flex flex-col">
    <Header className="z-10" />
    <div
      style={{
        backgroundImage: `url(${millionaireBackground})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
      }}
      className="flex-grow text-white flex items-center justify-center"
    >
      {content}
    </div>
  </div>



  );
}

export default App;

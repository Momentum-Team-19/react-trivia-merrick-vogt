import React, { useEffect, useState } from 'react';

const Llm = ({ question }) => {
  
  const [output, setOutput] = useState('');

 

  const handleSubmit = async () => { 
    try {
      const messages = [
        {
          "role": "system",
          "content": "You are a helpful assistant."
        },
        {
          "role": "user",
          "content": question.question // this captures the user input
        }
      ];
      const payload = {
        model: 'gpt-3.5-turbo',
        messages
      };
  
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ',  // Replace with your actual API key
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log(data);
      setOutput(data.choices[0].message.content); // Assuming 'choices' exists in the response
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    setOutput('');
  }, [question]);
  
  
  return (
    <div>
      
      <button className="m-2 bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>Ask ChatGPT</button>
      <div>{output}</div>
    </div>
  );
};

export default Llm;

import React, { useState } from 'react';

const Llm = () => {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const messages = [
        {
          "role": "system",
          "content": "You are a helpful assistant."
        },
        {
          "role": "user",
          "content": prompt // this captures the user input
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
          'Authorization': 'Bearer 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',  // Replace with your actual API key
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
  
  
  return (
    <div>
      <input type="text" value={prompt} onChange={handlePromptChange} className="text-black"/>
      <button onClick={handleSubmit}>Generate</button>
      <div>{output}</div>
    </div>
  );
};

export default Llm;

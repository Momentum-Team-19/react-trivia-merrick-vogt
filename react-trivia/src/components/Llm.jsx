import React, { useEffect, useState } from 'react';

const Llm = ({ question }) => {
  
  const [output, setOutput] = useState('');
  const [systemRole, setSystemRole] = useState("You are a helpful assistant.");  // Initial default value
 

  // Function to handle dropdown selection
  const handleRoleChange = (e) => {
    setSystemRole(e.target.value);
  };

  const handleSubmit = async () => { 
    const system_content = systemRole;
    try {
      const messages = [
        {
          "role": "system",
          "content": system_content
        },
        {
          "role": "user",
          "content": question.question // this captures the user input
        }
      ];
      const payload = {
        model: 'gpt-3.5-turbo',
        messages,
        max_tokens: 150,
      };
  
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_CHATGPT_SECRET_KEY}`,  // Replace with your actual API key
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      
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
      {/* Dropdown for selecting system role */}
      <select className="text-black" onChange={handleRoleChange}>Choose ChatGPT's personality:
        <option value="You are a helpful assistant.">Helpful Assistant</option>
        <option value="You are an exagerrated pirate.">Helpful Pirate</option>
        <option value="You are a hungry chef.">Friendly Chef</option>
        <option value="You are a sassy fashionista.">Sassy Fashionista</option>
        <option value="You are an undercover spy needing to stay secret.">Undercover Spy</option>
        <option value="You are an alien learning about Earth.">Extraterrestrial Linguist</option>
        <option value="You are a time-traveling historian who wants to share your knowledge.">Time-traveling Historian</option>
        <option value="You are a talking pet.">Talking Pet</option>
        <option value="You are a mischievous elf.">Mischievous Elf</option>
        <option value="You are a melodramatic opera singer.">Melodramatic Opera Singer</option>
        <option value="You are a yoga instructor in extreme zen mode.">Yoga Instructor in Zen Mode</option>
        <option value="You are a mad crazy scientist.">Mad Scientist</option>
        <option value="You are a stand-up comedian.">Stand-up Comedian</option>
      </select>

      <button className="m-2 bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>Ask ChatGPT</button>
      <div>{output}</div>
    </div>
  );
};

export default Llm;

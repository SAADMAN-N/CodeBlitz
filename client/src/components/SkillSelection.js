import React, { useState } from 'react';
import axios from 'axios';

const SkillSelection = () => {
  const [skills, setSkills] = useState([]);

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    setSkills((prevSkills) =>
      checked ? [...prevSkills, value] : prevSkills.filter((skill) => skill !== value)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/user/skills', { skills }, { headers: { Authorization: `Bearer ${token}` } });
      alert('Skills updated successfully');
    } catch (error) {
      alert('Failed to update skills');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input type="checkbox" value="JavaScript" onChange={handleSkillChange} /> JavaScript
      </label>
      <label>
        <input type="checkbox" value="Python" onChange={handleSkillChange} /> Python
      </label>
      <label>
        <input type="checkbox" value="Java" onChange={handleSkillChange} /> Java
      </label>
      <button type="submit">Save Skills</button>
    </form>
  );
};

export default SkillSelection;
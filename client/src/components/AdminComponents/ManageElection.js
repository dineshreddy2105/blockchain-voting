import React, { useState } from 'react';

const ManageElection = () => {
  const [electionName, setElectionName] = useState('');
  const [electionDescription, setElectionDescription] = useState('');
  const [currentPhase, setCurrentPhase] = useState('Registration');
  const [successMessage, setSuccessMessage] = useState('');

  const handleCreateElection = (e) => {
    e.preventDefault();
    // Handle election creation logic here
    console.log('Election Created:', { electionName, electionDescription });
    setSuccessMessage('Election created successfully!');
    setElectionName('');
    setElectionDescription('');
  };

  const handleChangePhase = () => {
    let newPhase;
    if (currentPhase === 'Registration') {
      newPhase = 'Voting';
    } else if (currentPhase === 'Voting') {
      newPhase = 'Results';
    } else if (currentPhase === 'Results') {
      newPhase = 'Election Ended';
    }
    setCurrentPhase(newPhase);
    setSuccessMessage(`Election phase changed to ${newPhase}`);
  };

  return (
    <div className="container">
      <h2>Manage Election</h2>
      <form onSubmit={handleCreateElection}>
        <div className="form-group">
          <label htmlFor="electionName">Election Name:</label>
          <input
            type="text"
            id="electionName"
            className="form-control"
            value={electionName}
            onChange={(e) => setElectionName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="electionDescription">Election Description:</label>
          <textarea
            id="electionDescription"
            className="form-control"
            value={electionDescription}
            onChange={(e) => setElectionDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Create Election</button>
      </form>
      {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
      <div className="mt-5">
        <h3>Current Phase: {currentPhase}</h3>
        {currentPhase !== 'Election Ended' && (
          <button
            className="btn btn-secondary mt-3"
            onClick={handleChangePhase}
          >
            {currentPhase === 'Registration' && 'Start Voting Phase'}
            {currentPhase === 'Voting' && 'Start Results Phase'}
            {currentPhase === 'Results' && 'End Election'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ManageElection;
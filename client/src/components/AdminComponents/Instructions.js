import React from 'react';
import '../../styles/Instructions.css'; // Assuming you have a CSS file for styling

const Instructions = () => {
  return (
    <div className="container">
      <h1>Admin Manual</h1>
      <p>Welcome</p>
      <p>These are a few guidelines for admins:</p>
      <h2>1. Managing Candidates</h2>
      <h3>Adding Candidates</h3>
      <p>
        The admin can add candidates for the election during the candidate registration phase.
        To add a candidate, navigate to the "Add Candidates" section in the admin panel.
        Enter the candidate's name and other required details in the provided form.
        Click the "Add Candidate" button to register the candidate for the election.
      </p>
      <h3>Removing Candidates</h3>
      <p>
        The admin can remove candidates if necessary.
        Navigate to the "Manage Candidates" section in the admin panel.
        Select the candidate you wish to remove and click the "Remove Candidate" button.
      </p>
      <h2>2. Managing the Voting Process</h2>
      <h3>Initializing Phases</h3>
      <p>
        The voting process is divided into three phases: Registration, Voting, and Result.
        The admin is responsible for initializing and terminating each phase.
        Navigate to the "Manage Voting" section in the admin panel to control the phases.
      </p>
      <h3>Registration Phase</h3>
      <p>
        During this phase, users can register to vote.
        Ensure that the registration phase is active before users attempt to register.
      </p>
      <h3>Voting Phase</h3>
      <p>
        After the registration phase, the admin can initialize the voting phase.
        During this phase, registered users can cast their votes.
        Ensure that the voting phase is active for users to vote.
      </p>
      <h3>Result Phase</h3>
      <p>
        After the voting phase, the admin can initialize the result phase.
        During this phase, the results of the election will be displayed.
        Ensure that the result phase is active to display the election results.
      </p>
      <h2>3. Viewing Results</h2>
      <h3>Displaying Results</h3>
      <p>
        The admin can view and display the results of the election.
        Navigate to the "Results" section in the admin panel.
        The results will be automatically calculated and displayed based on the votes cast during the voting phase.
      </p>
      <h3>Announcing Results</h3>
      <p>
        The admin can announce the results to the users.
        Ensure that the result phase is active and the results are visible to all users.
      </p>
    </div>
  );
};

export default Instructions;
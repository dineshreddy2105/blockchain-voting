import React from "react";

const CandidateCard = ({ image, name, age, role, qualification, description, votes }) => {
  return (
    <div className="card shadow-sm" style={{ width: "18rem" }}>
      <img src={image} className="card-img-top" alt={name} style={{ height: "200px", objectFit: "cover" }} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text"><strong>Age:</strong> {age}</p>
        <p className="card-text"><strong>Role:</strong> {role}</p>
        <p className="card-text"><strong>Qualification:</strong> {qualification}</p>
        <p className="card-text"><strong>Description:</strong> {description}</p>
        <p className="card-text"><strong>Votes:</strong> {votes}</p>
      </div>
    </div>
  );
};

export default CandidateCard;

import { useEffect, useState, React } from "react";

const ElectionDetails = () => {
  const [electionDetails, setElectionDetails] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);

  useEffect(() => {
    const fetchElectionDetails = async () => {
      try {
        // const res = await axios.get("http://api.example.com/candidates"); // Replace with your API URL
        // setCandidates(res.data)
        setElectionDetails([
          { id: 1, name: "Election 1", description: "It is the 1st election" },
          { id: 2, name: "Election 2", description: "It is the 2nd election" },
          { id: 3, name: "Election 3", description: "It is the 3rd election" },
          // Add more election details as needed
        ]);
      } catch (error) {
        console.error("Error fetching election details:", error);
      }
    };

    fetchElectionDetails();
  }, []);

  const handleViewDetails = (election) => {
    setSelectedElection(election);
  };

  return (
    <div className="container">
      <h2 className="mb-4">Election Details</h2>
      <div className="row">
        {electionDetails.length > 0 ? (
          electionDetails.map((election, index) => (
            <div
              key={index}
              className="col-md-4 mb-5 d-flex justify-content-around"
            >
              <div className="card shadow-sm" style={{ width: "18rem" }}>
                <img
                  src="https://pixabay.com/vectors/elections-vote-sheet-paper-pen-536656/"
                  className="card-img-top"
                  alt="Dummy"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{election.name}</h5>
                  <p className="card-text">
                    <strong>Description:</strong> {election.description}
                  </p>
                  <br></br>
                  <button
                    className="btn btn-outline-dark btn-sm"
                    onClick={() => handleViewDetails(election)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No elections conducted</p>
        )}
      </div>
      {selectedElection && (
        <div className="election-details mt-4">
          <h3>Selected Election Details</h3>
          <p>
            <strong>Name:</strong> {selectedElection.name}
          </p>
          <p>
            <strong>Description:</strong> {selectedElection.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default ElectionDetails;
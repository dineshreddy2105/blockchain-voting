import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// ✅ Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const LiveMonitoring = () => {
  const [electionName, setElectionName] = useState("");
  const [electionDesc, setElectionDesc] = useState("");
  const [voters, setVoters] = useState(0);
  const [candidates, setCandidates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchElectionDetails = async () => {
      try {
        const summary = ["Sample Election", "This is a sample election description"];
        const v = 100;

        setElectionName(summary[0]);
        setElectionDesc(summary[1]);
        setVoters(v);

        let candidatesArray = [
          { name: "Candidate 1", votes: 50 },
          { name: "Candidate 2", votes: 30 },
          { name: "Candidate 3", votes: 20 },
        ];

        setCandidates(candidatesArray);
      } catch (err) {
        console.error(err.message);
        alert("Redirecting to login page...");
        navigate("/company_login");
      }
    };

    fetchElectionDetails();
  }, [navigate]);

  const data = {
    labels: candidates.map((c) => c.name),
    datasets: [
      {
        label: "Vote Counts",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(54, 162, 235, 0.7)",
        hoverBorderColor: "rgba(54, 162, 235, 1)",
        data: candidates.map((c) => c.votes),
      },
    ],
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col md={8} className="text-center">
          <Card className="shadow-lg p-4 mb-4 bg-white rounded">
            <Card.Body>
              <h2 className="text-primary">{electionName}</h2>
              <p className="text-muted">{electionDesc}</p>
              <h4 className="font-weight-bold">Total Voters: {voters}</h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="w-100 justify-content-center">
        <Col md={8}>
          {candidates.length > 0 ? (
            <Card className="shadow-lg p-4 bg-white rounded">
              <Card.Body>
                <Bar data={data} key={JSON.stringify(data)} />
              </Card.Body>
            </Card>
          ) : (
            <Card className="text-center shadow-lg p-4 bg-light rounded">
              <Card.Body>
                <Card.Title>No candidates available</Card.Title>
                <Card.Text>Please add candidates to the election.</Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default LiveMonitoring;

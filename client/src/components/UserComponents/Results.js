import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";

const Results = ({ candidates, electionStatus }) => {
  const [loading, setLoading] = useState(true);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      if (candidates && candidates.length > 0) {
        const maxVotes = Math.max(...candidates.map(c => c.votes));
        setWinner(candidates.find(c => c.votes === maxVotes));
      }
    }, 2000); // Simulating slow internet delay
  }, [candidates]);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading election results...</p>
      </Container>
    );
  }

  if (!candidates || candidates.length === 0) {
    return (
      <Container className="text-center my-5">
        <p>No candidates available. Election might not have started.</p>
      </Container>
    );
  }

  if (electionStatus !== "completed") {
    return (
      <Container className="text-center my-5">
        <p>Election is not yet completed. Please wait for results.</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Election Results</h2>
      <Row className="justify-content-center">
        {candidates.map((candidate, index) => (
          <Col key={index} md={4} className="mb-3">
            <Card className={winner && winner.name === candidate.name ? "bg-success text-white" : ""}>
              <Card.Body>
                <Card.Title>{candidate.name}</Card.Title>
                <Card.Text>Votes: {candidate.votes}</Card.Text>
                {winner && winner.name === candidate.name && <strong>🏆 Winner</strong>}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Results;

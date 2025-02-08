import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import Cookies from 'js-cookie';
// import Election from '../../Ethereum/election';
import { useRouter } from 'next/router';

const LiveMonitoring = () => {
  const [electionName, setElectionName] = useState('');
  const [electionDesc, setElectionDesc] = useState('');
  const [voters, setVoters] = useState(0);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchElectionDetails = async () => {
      try {
        // Simulate fetching election details
        const summary = ["Sample Election", "This is a sample election description"];
        const v = 100;
        const c = 3;

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
        alert('Redirecting to login page...');
        router.push('/company_login');
      }
    };

    fetchElectionDetails();
  }, []);

  const endElection = async () => {
    try {
      setLoading(true);
      // Simulate ending the election and getting the winner
      const winner = { name: "Candidate 1" };
      alert(`Winner: ${winner.name}`);
    } catch (err) {
      console.error(err.message);
    }
    setLoading(false);
  };

  const data = {
    labels: candidates.map(c => c.name),
    datasets: [
      {
        label: 'Vote Counts',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: candidates.map(c => c.votes),
      },
    ],
  };

  return (
    <Container>
      <Row className="justify-content-md-center my-4">
        <Col md="8">
          <h2>{electionName}</h2>
          <p>{electionDesc}</p>
          <h4>Total Voters: {voters}</h4>
          <Button variant="danger" onClick={endElection} disabled={loading}>
            {loading ? 'Ending Election...' : 'End Election'}
          </Button>
        </Col>
      </Row>
      <Row>
        {candidates.length > 0 ? (
          <Col md="8">
            <Bar data={data} />
          </Col>
        ) : (
          <Col md="8">
            <Card className="text-center">
              <Card.Body>
                <Card.Title>No candidates available</Card.Title>
                <Card.Text>Please add candidates to the election.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default LiveMonitoring;
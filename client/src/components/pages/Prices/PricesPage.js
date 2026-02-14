import { Alert, Container } from 'reactstrap';
import ConcertDay from '../../features/ConcertDay/ConcertDay';
import { useState, useEffect } from 'react';

const Prices = () => {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dayNames = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
  };

  useEffect(() => {
    fetch('http://localhost:8000/api/concerts')
      .then((res) => res.json())
      .then((data) => {
        setConcerts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <Container>Loading concerts...</Container>;
  if (error) return <Container>Error: {error}</Container>;

  return (
    <Container>
      <h1>Prices</h1>
      <p>
        Prices may differ according the day of the festival. Remember that
        ticket includes not only the star performance, but also 10+ workshops.
        We gathered several genre teachers to help you increase your vocal
        skills, as well as self confidence.
      </p>

      <Alert color="info">
        Attention!{' '}
        <strong>
          Children under 4 can go freely with you without any other fee!
        </strong>
      </Alert>

      {concerts.map((c) => (
        <ConcertDay
          key={c._id}
          numberOfDay={dayNames[c.day]}
          price={c.price}
          workshopTitles={c.workshops}
        />
      ))}
    </Container>
  );
};

export default Prices;

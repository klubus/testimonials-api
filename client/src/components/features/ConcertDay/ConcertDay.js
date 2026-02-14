import { Row } from 'reactstrap';

const ConcertDay = ({ numberOfDay, price, workshopTitles }) => (
  <article>
    <Row>
      <h2>Day {numberOfDay}</h2>
      <p>Price: {price}$</p>
      <p>Workshops: {workshopTitles.map((title) => `"${title}"`).join(', ')}</p>
    </Row>
  </article>
);

export default ConcertDay;

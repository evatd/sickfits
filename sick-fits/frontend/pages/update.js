import UpdateItem from '../components/UpdateItem';

// update item needs an id - reference/which item we're updating
const Sell = ({ query }) => (
  <div>
    <UpdateItem id={query.id} />
  </div>
);

export default Sell;

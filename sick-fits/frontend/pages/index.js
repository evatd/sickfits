import Items from "../components/Items";

// the page we're on
// it's info necessary for pagination
// parseFloat converts a string into number
const Home = props => (
  <div>
    <Items page={parseFloat(props.query.page) || 1} />
  </div>
);

export default Home;

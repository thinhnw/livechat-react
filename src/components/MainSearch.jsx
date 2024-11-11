import PropTypes from "prop-types";

const MainSearch = ({ term, setTerm }) => {
  return (
    <div className="py-4 w-full" id="MainSearch">
      <input
        type="text"
        placeholder="Search"
        className="w-full bg-gray-100 rounded-3xl py-2 px-4 outline-none"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
    </div>
  );
};

MainSearch.propTypes = {
  term: PropTypes.string.isRequired,
  setTerm: PropTypes.func.isRequired,
}

export default MainSearch;

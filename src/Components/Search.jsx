import { IoSearchOutline } from 'react-icons/io5';

const Search = ({ placeholder = 'Search...', onSearch, className = '' }) => {
  return (
    <div className={`join ${className}`}>
      <label className="input join-item w-72 md:w-96">
        <IoSearchOutline className="h-[1em] opacity-50" />
        <input type="text" placeholder={placeholder} onChange={(e) => onSearch(e.target.value)} />
      </label>
    </div>
  );
};

export default Search;

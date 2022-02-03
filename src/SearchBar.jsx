import { useEffect } from 'react';
import { useNote } from './noteContext';
import './styles.css';
export const SearchBar = () => {
  const { search, setSearch, notes, setFilteredArr } = useNote();

  useEffect(() => {
    const searchResult = notes?.filter((note) =>
      note?.title?.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredArr(searchResult);
  }, [notes, search]);

  return (
    <>
      <form>
        <input
          type='search'
          placeholder='Search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '0.5rem',
            borderRadius: '8px',
            border: 'none',
          }}
          className='search__bar__ip'
        />
      </form>
    </>
  );
};

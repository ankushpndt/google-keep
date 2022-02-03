import { useEffect } from 'react';
import { useNote } from './noteContext';

export const SearchBar = () => {
  const { search, setSearch, notes, setFilteredArr } = useNote();
  // console.log(notes);
  useEffect(() => {
    const searchResult = notes?.filter((note) =>
      note?.title?.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredArr(searchResult);

    // setSearch(searchResult);
  }, [notes, search]);

  // console.log(search);
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
            margin: '1rem',
          }}
        />
      </form>
    </>
  );
};

import React, { useEffect, useState } from 'react';
import SearchBar from '../search/SearchBar';
import ContentGrid from '../widget/ContentGrid';
import Paginate from '../widget/Paginate';

const PersonCredits = ({ credits, media_type }) => {
  const itemPerPage = 12;
  const [items, setItems] = useState();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const filtered = credits.cast.filter((credit) => {
    return (
      credit?.title?.toLowerCase().includes(search.toLowerCase()) ||
      credit?.name?.toLowerCase().includes(search.toLowerCase())
    );
  });

  const numOfPages = Math.ceil(filtered.length / itemPerPage);

  useEffect(() => {
    setItems(filtered.slice((page - 1) * itemPerPage, itemPerPage * page));
  }, [page, search]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="mb-2">
      <div className="mt-8">
        <SearchBar
          search={search}
          handleChange={handleChange}
          placeHolder={`Search in ${media_type}`}
          searchId={`search-${media_type}`}
        />
      </div>

      {items && items.length > 0 ? (
        <ContentGrid items={items} media_type={media_type} nohover showCredit />
      ) : (
        <p className="text-center text-slate-500 mt-3">No {media_type} Found</p>
      )}

      {numOfPages > 1 && items && items.length > 0 && (
        <Paginate setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default PersonCredits;

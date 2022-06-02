import React, { useEffect, useState } from 'react';
import ContentGrid from '../widget/ContentGrid';
import Paginate from '../widget/Paginate';

const PersonMovies = ({ credits }) => {
  const itemPerPage = 12;
  const [items, setItems] = useState();
  const [page, setPage] = useState(1);

  const numOfPages = Math.ceil(credits.cast.length / itemPerPage);

  useEffect(() => {
    setItems(credits.cast.slice((page - 1) * itemPerPage, itemPerPage * page));
  }, [page]);

  return (
    <div className="mb-2">
      <ContentGrid items={items} nohover showCredit />

      {numOfPages > 1 && credits.cast.length > 0 && (
        <Paginate setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default PersonMovies;

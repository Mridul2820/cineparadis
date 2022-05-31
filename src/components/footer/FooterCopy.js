import React from 'react';

const FooterCopy = () => {
  return (
    <div className="p-3 flex justify-center items-center gap-1 flex-col sm:flex-row bg-blue-100 border-t-2 border-slate-300 shadow-2xl">
      <span>
        &copy; {new Date().getFullYear()} by
        <a
          className="ml-1 font-semibold"
          href="https://www.mridul.tech/"
          target="_blank"
          rel="noreferrer"
        >
          Mridul{' '}
        </a>
        & Team.
      </span>
      <span>
        Made with ❤ {', '}
        <a
          className="ml-1 font-semibold"
          href="https://developers.themoviedb.org/3/getting-started/introduction"
          target="_blank"
          rel="noreferrer"
        >
          TMDB
        </a>
        {'  & '}
        <a
          className="ml-1 font-semibold"
          href="https://github.com/Mridul2820/cineparadis"
          target="_blank"
          rel="noreferrer"
        >
          {'<Code/>'}
        </a>
      </span>
    </div>
  );
};

export default FooterCopy;

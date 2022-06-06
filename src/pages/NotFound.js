import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { IoIosArrowForward } from 'react-icons/io';

import { errorPage } from '../data/notFound';

const NotFound = () => {
  return (
    <Container className="not-found">
      <div className="flex flex-col md:flex-row gap-5 items-center w-full max-w-6xl ">
        <div className="flex flex-col justify-center items-center gap-y-10 w-full md:w-1/2">
          <p className="text-mt-red text-5xl md:text-7xl scale-150 font-bold">
            Oops
          </p>
          <p className="text-3xl md:text-4xl font-light">Page Not Found</p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {errorPage.map((item) => (
              <Link
                to={item.route}
                className="flex items-center gap-2 text-normal font-semibold"
                key={uuidv4()}
              >
                <IoIosArrowForward /> {item.title}
              </Link>
            ))}
          </div>
          <Link
            to="/"
            className="text-white px-3 py-1.5 rounded-md bg-blue-600 font-semibold hover:shadow-lg"
          >
            Back to Homepage
          </Link>
        </div>
        <div className="w-1 h-56 hidden md:block bg-mt-red" />
        <div className="flex justify-center items-center w-full md:w-1/2">
          <img
            src="https://res.cloudinary.com/dgt1da1bz/image/upload/v1644929548/not_found_252219e95c.gif"
            alt="not found"
            height="300"
            width="450"
          />
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 40px 16px;
  min-height: 90vh;
`;

export default NotFound;

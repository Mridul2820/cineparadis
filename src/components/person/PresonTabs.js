import React, { useState } from 'react';
import PersonGallery from './PersonGallery';
import PersonMovies from './PersonMovies';
import styled from 'styled-components';

const PresonTabs = ({ creditData }) => {
  // Tabs
  const [active, setActive] = useState(0);

  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };

  return (
    <div className="w-full mt-5">
      <div className="mb-3 sm:mb-4 flex justify-center gap-3 px-2 md:px-4">
        <Tab
          className="tab-item"
          onClick={handleClick}
          active={active === 0}
          id={0}
        >
          Movies & TV Series
        </Tab>
        <Tab
          className="tab-item"
          onClick={handleClick}
          active={active === 1}
          id={1}
        >
          Gallery
        </Tab>
      </div>
      {active === 0 && <PersonMovies credits={creditData.combined_credits} />}
      {active === 1 && (
        <PersonGallery
          images={creditData.images}
          defaultImage={creditData?.profile_path}
          alt={creditData.name}
        />
      )}
    </div>
  );
};

const Tab = styled.div`
  width: 20%;
  padding: 10px 5px;
  border: ${(props) =>
    props.active ? '2px solid rgb(96, 165, 250)' : '2px solid transparent'};
  opacity: ${(props) => (props.active ? '1' : '.8')};
  background-color: ${(props) =>
    props.active ? 'white' : 'rgb(195, 221, 253)'};
  transition: background-color 0.5s ease-in-out;
`;

export default PresonTabs;

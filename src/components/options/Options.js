import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Options = ({ options }) => {
  return (
    <Navmain>
      {options.map((option, index) => (
        <NavItem to={option.route} activeClassName="active" key={index}>
          {option.icon && option.icon} <span>{option.title}</span>
        </NavItem>
      ))}
    </Navmain>
  );
};

const Navmain = styled.nav`
  padding: 0px 20px;
  display: flex;
  justify-content: center;
  gap: 10px;

  @media only screen and (max-width: 956px) {
    justify-content: start;
    overflow-x: scroll;
  }

  @media only screen and (max-width: 480px) {
    padding: 10px 0;
  }
`;

const NavItem = styled(NavLink)`
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 480px) {
    margin: 5px;
  }

  &:hover {
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.2);
  }

  &.active {
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.3);
  }

  span {
    margin-left: 5px;
    white-space: nowrap;
  }
`;

export default Options;

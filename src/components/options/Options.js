import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Options = ({ options, colored }) => {
  return (
    <Navmain>
      {options.map((option) => (
        <React.Fragment key={uuidv4()}>
          {option.activeIf ? (
            <NavItem
              to={option.route}
              activeClassName="active"
              colored={colored}
              isActive={(match, location) => {
                for (let i = 0; i < option.activeIf?.length; i++) {
                  if (location.pathname === option.activeIf[i]) {
                    return true;
                  }
                }
                return false;
              }}
            >
              {option.icon && option.icon}{' '}
              <span className="whitespace-nowrap font-semibold">
                {option.title}
              </span>
            </NavItem>
          ) : (
            <NavItem
              to={option.route}
              activeClassName="active"
              colored={colored}
            >
              {option.icon && option.icon}{' '}
              <span className="whitespace-nowrap font-semibold">
                {option.title}
              </span>
            </NavItem>
          )}
        </React.Fragment>
      ))}
    </Navmain>
  );
};

const Navmain = styled.div`
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
  padding: ${(props) => (props.colored === 'yes' ? '2px 10px' : '8px 10px')};
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 5px;

  @media only screen and (max-width: 480px) {
    margin: 5px;
  }

  &:hover {
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.2);
  }

  &.active {
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.3);
    border: ${(props) =>
      props.colored === 'yes'
        ? '2px solid rgb(118 169 250)'
        : '2px solid transparent'};
  }
`;

export default Options;

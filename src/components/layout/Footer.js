import React from 'react'
import styled from 'styled-components';

const Footer = () => {
  return (
    <StyledFooter className='p-3 flex justify-center items-center gap-1 flex-col sm:flex-row bg-white'>
        <span>
            &copy; {new Date().getFullYear()} by
            <a 
                className='ml-1 font-semibold' 
                href="https://www.mridul.tech/"
                target='_blank'
                rel='noreferrer'
            >
                Mridul
            </a>
            .
        </span>
        <span>Made with ❤ {'& '}
            <a 
                className='ml-1 font-semibold' 
                href="https://github.com/Mridul2820/cineparadis"
                target='_blank'
                rel='noreferrer'
            >
                {'<Code/>'}
            </a>
        </span>
    </StyledFooter>
)
}

const StyledFooter = styled.footer`
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`

export default Footer

import React from 'react'
import styled from 'styled-components';

const Footer = () => {
  return (
    <footer className='p-3 flex justify-center items-center gap-1 flex-col sm:flex-row bg-white border-t-2 border-slate-300'>
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
             & Team.
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
    </footer>
)
}


export default Footer

import React from 'react';
import { NavLink } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

export const Header = () => {
  return (
    <header>
      <NavLink to='/'>
        <h1 id='title-text'>Listy</h1>
      </NavLink>
      <NavLink
        id='add-note-link'
        to='/new-note'>
        <i 
          data-tip
          data-for='tooltip'
          className='fas fa-plus-circle new-note-icon'
        />
      </NavLink>
      <ReactTooltip id='tooltip' type='dark' effect='solid'>Add a new note</ReactTooltip>
    </header>
  )
}

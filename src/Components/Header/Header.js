import React from 'react'
import { NavLink } from 'react-router-dom'

export const Header = ({ togglePopup }) => {
  return (
    <header>
      <NavLink id="title" to="/">
        <h1>Listy</h1>
      </NavLink>
      <NavLink
        onClick={() => togglePopup(true)}
        id="add-note-link"
        to="/new-note">
        <i className="fas fa-plus-circle new-note-icon" />
      </NavLink>
    </header>
  )
}

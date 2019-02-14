import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { togglePopup } from '../../thunks/togglePopup'
import { withRouter } from 'react-router-dom'



export const Header = () => {
  return (
    <header>
      <NavLink id="title" to="/">
        <h1>Listy</h1>
      </NavLink>
      <NavLink onClick={() => this.props.togglePopup(true)} id="add-note-link" to="/new-note">
        <i className="fas fa-plus-circle new-note-icon" />
      </NavLink>
    </header>
  )
}

const mapDispatchToProps = (dispatch) => ({
  togglePopup: () => dispatch(togglePopup())
})

export default withRouter(connect(null, mapDispatchToProps)(Header))
import React, { Component } from 'react'
import App from './App'
import { shallow } from 'enzyme'
import { fetchNotes } from '../../thunks/fetchNotes'


describe('App', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<App />)
  })

  it('should match the correct snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('componentDidMount', () => {
    it('should call fetchNotes', async () => {})
  })
})

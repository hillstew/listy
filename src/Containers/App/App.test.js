import React from 'react'
import { App, mapStateToProps, mapDispatchToProps } from './App'
import { shallow } from 'enzyme'
import { fetchNotes } from '../../thunks/fetchNotes'
jest.mock('../../thunks/fetchNotes')

describe('App', () => {
  let wrapper
  let fetchNotesMock
  beforeEach(() => {
    fetchNotesMock = jest.fn()
    wrapper = shallow(<App fetchNotes={fetchNotesMock} />)
  })

  it('should match the correct snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('componentDidMount', () => {
    it('should call fetchNotes', () => {
      expect(wrapper.instance().props.fetchNotes).toHaveBeenCalled()
    })
  })

  describe('mapStateToProps', () => {
    it('should return an object with notes and loading as keys', () => {
      const mockState = {
        notes: [],
        loading: false,
        extraKey: true
      }
      const expected = {
        notes: [],
        loading: false
      }
      const mappedProps = mapStateToProps(mockState)
      expect(mappedProps).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should call dispatch when fetchNotes is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = fetchNotes();
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.fetchNotes();
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })
  })
})

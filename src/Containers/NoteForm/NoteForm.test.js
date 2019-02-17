import React from 'react'
import { NoteForm, mapStateToProps, mapDispatchToProps } from './NoteForm';
import { shallow } from 'enzyme';
import { putNote } from '../../thunks/putNote';
import { postNote } from '../../thunks/postNote';
import { deleteNote } from '../../thunks/deleteNote';

jest.mock('../../thunks/putNote')
jest.mock('../../thunks/postNote')
jest.mock('../../thunks/deleteNote')

describe('NoteForm', () => {
  describe('NoteForm component', () => {
    let wrapper;
    let mockNote;
    let mockError;
    let mockEvent;

    beforeEach(() => {
      mockError = '';
      mockNote = {
        id: '1',
        title: 'Title',
        issues: [
          { id: '1', body: 'issue text'},
          { id: '2', body: 'more issue text' },
        ],
      }
      wrapper = shallow(
        <NoteForm 
          id={mockNote.id}
          title={mockNote.title}
          issues={mockNote.issues}
          displayError={mockError}
        />
      )
    });

    it('should match the correct snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should find the correct index when getIndex is called', () => {
      const expected = 0;
      const result = wrapper.instance().getIndex('1');
      expect(result).toEqual(expected);
    });

    it('should create a copy of issues when createIssuesCopy is called', () => {
      const expected = [
        { id: '1', body: 'issue text' },
        { id: '2', body: 'more issue text' },
      ];
      const result = wrapper.instance().createIssuesCopy();
      expect(result).toEqual(expected);
    });

    it('should set state with a new title when handleTitleChange is called', () => {
      mockEvent = { 
        preventDefault: () => {},
        target: { value: 'newTitle' }
      };
      const expected = 'newTitle';
      wrapper.instance().handleTitleChange(mockEvent);
      expect(wrapper.state('title')).toEqual(expected);
    });

    it('should set issues in state when setIssuesInState is called', () => {
      const expected = [
        { id: '1', body: 'issue text' },
        { id: '2', body: 'more issue text' },
      ]
      wrapper.instance().setIssuesInState(expected);
      expect(wrapper.state('issues')).toEqual(expected);
    });
  });

  describe('handleBodyChange', () => {
    it('should call getIndex with the correct params', () => {

    });

    it('should call createIssuesCopy', () => {

    });

    it('should call setIssuesInState with the correct params', () => {

    });
  });

  describe('toggleIssueCompletion', () => {
    it('should call getIndex with the correct params', () => {

    });

    it('should call createIssuesCopy', () => {

    });

    it('should call setIssuesInState with the correct params', () => {

    });
  });

  describe('handleSubmit', () => {
    it('should set state with an error if the title and/or issues are empty', () => {

    });

    it('should call postNote with the correct params', () => {

    });

    it('should call putNote with the correct params', () => {

    });

    it('should call history.goBack() if everything is okay', () => {

    });

    it('should set state with an error is something is not okay', () => {

    });
  });

  describe('removeNote', () => {
    it('should call deleteNote with the correct params', () => {

    });

    it('should call history.goBack() if everything is okay', () => {

    });

    it('should set state with an error is something is not okay', () => {

    });
  });

  describe('addIssue', () => {
    it('should call createIssuesCopy', () => {

    });

    it('should call setIssuesInState with the correct params', () => {

    });
  });

  describe('removeIssue', () => {
    it('should call getIndex with the correct params', () => {

    });
    
    it('should call createIssuesCopy', () => {

    });

    it('should call setIssuesInState with the correct params', () => {

    });
  });

  describe('showIssues', () => {
    it('should return JSX with Issue components', () => {

    });
  });

  describe('mapStateToProps', () => {
    it('should return a string with a boolean', () => {
      const mockState = {
        notes: [],
        error: ''
      }
      
      const expected = {
        error: ''
      }

      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch with a putNote action when putNote is called', () => {
      const mockDispatch = jest.fn()
      let mockNote = {
        title: 'Title',
        issues: [],
      }
      const actionToDispatch = putNote(mockNote);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.putNote(mockNote);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch with a deleteNote action when deleteNote is called', () => {
      const mockDispatch = jest.fn()
      const mockId = 1
      const actionToDispatch = deleteNote(mockId);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.deleteNote(mockId);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch with a postNote action when postNote is called', () => {
      const mockDispatch = jest.fn()
      let mockNote = {
        title: 'Title',
        issues: [],
      }
      const actionToDispatch = postNote(mockNote);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.postNote(mockNote);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});
import React from 'react'
import { NoteForm, mapStateToProps, mapDispatchToProps } from './NoteForm';
import { shallow } from 'enzyme';
import { putNote } from '../../thunks/putNote';
import { postNote } from '../../thunks/postNote';
import { deleteNote } from '../../thunks/deleteNote';
import shortid from 'shortid';

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
      let wrapper;
      let mockNote;
      let mockError;
      let mockEvent;

      beforeEach(() => {
        mockEvent = { target: { 
          parentElement: { parentElement: { id: '1' } },
          value: 'new body'
        }};
        mockError = '';
        mockNote = {
          id: '1',
          title: 'Title',
          issues: [
            { id: '1', body: 'issue text' },
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

        wrapper.instance().getIndex = jest.fn().mockImplementation( () => {
          return '1'
        });
        wrapper.instance().createIssuesCopy = jest.fn().mockImplementation( () => {
          return mockNote.issues
        });
        wrapper.instance().setIssuesInState = jest.fn();
      });

    it('should call getIndex with the correct params', () => {
      const expected = '1';
      wrapper.instance().handleBodyChange(mockEvent);
      expect(wrapper.instance().getIndex).toHaveBeenCalledWith(expected);
    });

    it('should call createIssuesCopy', () => {
      wrapper.instance().handleBodyChange(mockEvent);
      expect(wrapper.instance().createIssuesCopy).toHaveBeenCalled();
    });

    it('should call setIssuesInState with the correct params', () => {
      const expected = [
        { id: '1', body: 'issue text' },
        { id: '2', body: 'new body' },
      ];
      wrapper.instance().handleBodyChange(mockEvent);
      expect(wrapper.instance().setIssuesInState).toHaveBeenCalledWith(expected);
    });
  });

  describe('toggleIssueCompletion', () => {
    let wrapper;
    let mockNote;
    let mockError;
    let mockEvent;

    beforeEach(() => {
      mockEvent = { target: { parentElement: { parentElement: { id: '1' } } } };
      mockError = '';
      mockNote = {
        id: '1',
        title: 'Title',
        issues: [
          { id: '1', body: 'issue text', completed: false },
          { id: '2', body: 'more issue text', completed: true },
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

      wrapper.instance().getIndex = jest.fn().mockImplementation(() => {
        return '1'
      });
      wrapper.instance().createIssuesCopy = jest.fn().mockImplementation(() => {
        return mockNote.issues
      });
      wrapper.instance().setIssuesInState = jest.fn();
    });

    it('should call getIndex with the correct params', () => {
      const expected = '1';
      wrapper.instance().toggleIssueCompletion(mockEvent);
      expect(wrapper.instance().getIndex).toHaveBeenCalledWith(expected);
    });

    it('should call createIssuesCopy', () => {
      wrapper.instance().toggleIssueCompletion(mockEvent);
      expect(wrapper.instance().createIssuesCopy).toHaveBeenCalled();
    });

    it('should call setIssuesInState with the correct params', () => {
      const expected = [
        { id: '1', body: 'issue text', completed: false },
        { id: '2', body: 'more issue text', completed: false },
      ];
      wrapper.instance().toggleIssueCompletion(mockEvent);
      expect(wrapper.instance().setIssuesInState).toHaveBeenCalledWith(expected);
    });
  });

  describe('addIssue', () => {
    let wrapper;
    let mockNote;
    let mockError;
    let mockEvent;

    beforeEach(() => {
      mockEvent = { preventDefault: () => {} };
      mockError = '';
      mockNote = {
        id: '1',
        title: 'Title',
        issues: [
          { id: '1', body: 'issue text', completed: false },
          { id: '2', body: 'more issue text', completed: true },
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

      wrapper.instance().createIssuesCopy = jest.fn().mockImplementation(() => {
        return mockNote.issues
      });
      wrapper.instance().setIssuesInState = jest.fn();
    });

    it('should call createIssuesCopy', () => {
      wrapper.instance().addIssue(mockEvent);
      expect(wrapper.instance().createIssuesCopy).toHaveBeenCalled();
    });

    it('should call setIssuesInState with the correct params', () => {
      shortid.generate = jest.fn().mockImplementation(() => '3');
      const expected = [
        { id: '1', body: 'issue text', completed: false },
        { id: '2', body: 'more issue text', completed: true },
        { id: '3', body: '', completed: false },
      ]
      wrapper.instance().addIssue(mockEvent);
      expect(wrapper.instance().setIssuesInState).toHaveBeenCalledWith(expected);
    });
  });

  describe('removeIssue', () => {
    let wrapper;
    let mockNote;
    let mockError;
    let mockEvent;

    beforeEach(() => {
      mockEvent = { 
        preventDefault: () => {},
        target: { parentElement: { id: '1' } } 
      };
      mockError = '';
      mockNote = {
        id: '1',
        title: 'Title',
        issues: [
          { id: '1', body: 'issue text', completed: false },
          { id: '2', body: 'more issue text', completed: true },
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

      wrapper.instance().getIndex = jest.fn().mockImplementation(() => '1')
      wrapper.instance().createIssuesCopy = jest.fn().mockImplementation(() => {
        return mockNote.issues
      });
      wrapper.instance().setIssuesInState = jest.fn();
    });

    it('should call getIndex with the correct params', () => {
      const expected = '1';
      wrapper.instance().removeIssue(mockEvent);
      expect(wrapper.instance().getIndex).toHaveBeenCalledWith(expected);
    });

    it('should call createIssuesCopy', () => {
      wrapper.instance().removeIssue(mockEvent);
      expect(wrapper.instance().createIssuesCopy).toHaveBeenCalled();
    });

    it('should call setIssuesInState with the correct params', () => {
      const expected = [
        { id: '1', body: 'issue text', completed: false }
      ]
      wrapper.instance().removeIssue(mockEvent);
      expect(wrapper.instance().setIssuesInState).toHaveBeenCalledWith(expected);
    });
  });

  describe('handleSubmit', () => {
    let wrapper;
    let mockNote;
    let mockError;
    let mockEvent;

    beforeEach(() => {
      mockEvent = {preventDefault: () => {}};
      mockError = '';
      mockNote = {
        id: '1',
        title: 'Title',
        issues: [
          { id: '1', body: 'issue text', completed: false },
          { id: '2', body: 'more issue text', completed: true },
        ],
      }
    });

    it('should set state with an error if the title and/or issues are empty', () => {
      wrapper = shallow(
        <NoteForm
          id={mockNote.id}
          title={''}
          issues={[]}
          displayError={mockError}
        />
      )
      wrapper.instance().handleSubmit(mockEvent);
      expect(wrapper.state('displayError')).toEqual('Please add a title and at least one list item')
    });

    it('should call postNote with the correct params', async () => {
      const expected = {
        title: 'Title',
        issues: [
          { id: '1', body: 'issue text', completed: false },
          { id: '2', body: 'more issue text', completed: true },
        ]
      };
      postNote = jest.fn();
      wrapper = shallow(
        <NoteForm
          id={''}
          title={mockNote.title}
          issues={mockNote.issues}
          displayError={mockError}
        />
      )
      wrapper.instance().handleSubmit(mockEvent);
      await expect(postNote).toHaveBeenCalledWith(expected);
    });

    it('should call putNote with the correct params', async () => {
      const expected = {
        id: '1',
        title: 'Title',
        issues: [
          { id: '1', body: 'issue text', completed: false },
          { id: '2', body: 'more issue text', completed: true },
        ]
      };
      postNote = jest.fn();
      wrapper = shallow(
        <NoteForm
          id={mockNote.id}
          title={mockNote.title}
          issues={mockNote.issues}
          displayError={mockError}
        />
      )
      wrapper.instance().handleSubmit(mockEvent);
      await expect(putNote).toHaveBeenCalledWith(expected);
    });

    it('should call history.goBack() if everything is okay', () => {
      const mockHistory = { goBack: jest.fn()};
      wrapper = shallow(
        <NoteForm
          id={mockNote.id}
          title={mockNote.title}
          issues={mockNote.issues}
          displayError={mockError}
          history={mockHistory}
        />
      )
      wrapper.instance().handleSubmit(mockEvent);
      expect(wrapper.instance().props.history.goBack).toHaveBeenCalled();
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
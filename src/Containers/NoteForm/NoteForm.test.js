import React from 'react'
import { NoteForm, mapStateToProps, mapDispatchToProps } from './NoteForm';
import { shallow } from 'enzyme';
import { putNote } from '../../thunks/putNote';
import { postNote } from '../../thunks/postNote';
import { deleteNote } from '../../thunks/deleteNote';
import shortid from 'shortid';
import { getIndex, createIssuesCopy } from '../../Helpers/functions';

jest.mock('../../Helpers/functions')
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

        getIndex.mockReturnValue('1');
        createIssuesCopy.mockReturnValue(mockNote.issues);
        wrapper.instance().setIssuesInState = jest.fn();
      });

    it('should call getIndex with the correct params', () => {
      wrapper.instance().handleBodyChange(mockEvent);
      expect(getIndex).toHaveBeenCalledWith('1', mockNote.issues);
    });

    it('should call createIssuesCopy', () => {
      wrapper.instance().handleBodyChange(mockEvent);
      expect(createIssuesCopy).toHaveBeenCalled();
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

      getIndex.mockReturnValue('1');
      createIssuesCopy.mockReturnValue(mockNote.issues);
      wrapper.instance().setIssuesInState = jest.fn();
    });

    it('should call getIndex with the correct params', () => {
      wrapper.instance().toggleIssueCompletion(mockEvent);
      expect(getIndex).toHaveBeenCalledWith('1', mockNote.issues);
    });

    it('should call createIssuesCopy', () => {
      wrapper.instance().toggleIssueCompletion(mockEvent);
      expect(createIssuesCopy).toHaveBeenCalled();
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

      createIssuesCopy.mockReturnValue(mockNote.issues);
      wrapper.instance().setIssuesInState = jest.fn();
    });

    it('should call createIssuesCopy', () => {
      wrapper.instance().addIssue(mockEvent);
      expect(createIssuesCopy).toHaveBeenCalled();
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

      getIndex.mockReturnValue('1');
      createIssuesCopy.mockReturnValue(mockNote.issues);
      wrapper.instance().setIssuesInState = jest.fn();
    });

    it('should call getIndex with the correct params', () => {
      wrapper.instance().removeIssue(mockEvent);
      expect(getIndex).toHaveBeenCalledWith('1', mockNote.issues);
    });

    it('should call createIssuesCopy', () => {
      wrapper.instance().removeIssue(mockEvent);
      expect(createIssuesCopy).toHaveBeenCalled();
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
    let putNoteMock;
    let postNoteMock;

    beforeEach(() => {
      putNoteMock = jest.fn();
      postNoteMock = jest.fn();
      mockEvent = {preventDefault: () => {}};
      mockError = '';
      mockNote = {
        id: '1',
        title: 'Title',
        color: 'white',
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
          color={'white'}
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
        color: 'white',
        issues: [
          { id: '1', body: 'issue text', completed: false },
          { id: '2', body: 'more issue text', completed: true },
        ]
      };
      wrapper = shallow(
        <NoteForm
          id={''}
          title={mockNote.title}
          issues={mockNote.issues}
          displayError={mockError}
          postNote={postNoteMock}
        />
      )
      wrapper.instance().handleSubmit(mockEvent);
      await expect(wrapper.instance().props.postNote).toHaveBeenCalledWith(expected);
    });

    it('should call putNote with the correct params', async () => {
      const expected = {
        id: '1',
        title: 'Title',
        color: 'white',
        issues: [
          { id: '1', body: 'issue text', completed: false },
          { id: '2', body: 'more issue text', completed: true },
        ]
      };
      wrapper = shallow(
        <NoteForm
          id={mockNote.id}
          title={mockNote.title}
          issues={mockNote.issues}
          displayError={mockError}
          putNote={putNoteMock}
        />
      )
      wrapper.instance().handleSubmit(mockEvent);
      await expect(wrapper.instance().props.putNote).toHaveBeenCalledWith(expected);
    });

    it('should call history.replace() if everything is okay', async () => {
      const mockHistory = { replace: jest.fn()};
      wrapper = shallow(
        <NoteForm
          id={mockNote.id}
          title={mockNote.title}
          issues={mockNote.issues}
          error={''}
          displayError={mockError}
          history={mockHistory}
          putNote={putNoteMock}
        />
      )
      await wrapper.instance().handleSubmit(mockEvent);
      expect(wrapper.instance().props.history.replace).toHaveBeenCalled();
    });

    it('should set state with an error is something is not okay', async () => {
      wrapper = shallow(
        <NoteForm
          id={mockNote.id}
          title={mockNote.title}
          issues={mockNote.issues}
          error={'error occurred'}
          displayError={mockError}
          putNote={putNoteMock}
        />
      )
      await wrapper.instance().handleSubmit(mockEvent);
      expect(wrapper.state('displayError')).toEqual('Note could not be created/updated. Please try again.');
    });
  });

  describe('removeNote', () => {
    let wrapper;
    let mockNote;
    let mockError;
    let mockEvent;
    let deleteNoteMock;

    beforeEach(() => {
      deleteNoteMock = jest.fn();
      mockEvent = { preventDefault: () => { } };
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

    it('should call deleteNote with the correct params', () => {
      wrapper = shallow(
        <NoteForm
          id={mockNote.id}
          deleteNote={deleteNoteMock}
        />
      )
      wrapper.instance().removeNote(mockEvent);
      expect(wrapper.instance().props.deleteNote).toHaveBeenCalledWith('1');
    });

    it('should call history.replace() if everything is okay', async () => {
      const mockHistory = { replace: jest.fn() };
      wrapper = shallow(
        <NoteForm
          id={mockNote.id}
          error={''}
          displayError={mockError}
          history={mockHistory}
          deleteNote={deleteNoteMock}
        />
      )
      await wrapper.instance().removeNote(mockEvent);
      expect(wrapper.instance().props.history.replace).toHaveBeenCalled();
    });

    it('should set state with an error is something is not okay', async () => {
      const mockHistory = { goBack: jest.fn() };
      wrapper = shallow(
        <NoteForm
          id={mockNote.id}
          error={'error occurred'}
          displayError={mockError}
          history={mockHistory}
          deleteNote={deleteNoteMock}
        />
      )
      await wrapper.instance().removeNote(mockEvent);
      expect(wrapper.state('displayError')).toEqual('Note could not be deleted. Please try again.');
    });
  });

  describe('changeNoteColor', () => {
    let wrapper;
    let mockNote;
    let mockEvent;

    beforeEach(() => {
      mockEvent = { 
        preventDefault: () => { },
        target: { value: 'blue' }
      };
      mockNote = {
        id: '1',
        title: 'Title',
        color: 'white',
        issues: [
          { id: '1', body: 'issue text', completed: false },
          { id: '2', body: 'more issue text', completed: true },
        ],
      }
      wrapper = shallow(
        <NoteForm
          {...mockNote}
        />
      )
    });

    it('should update the color in state', () => {
      expect(wrapper.state('color')).toEqual('white')
      wrapper.instance().changeNoteColor(mockEvent);
      expect(wrapper.state('color')).toEqual('blue')
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
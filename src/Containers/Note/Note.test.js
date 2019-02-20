import React from 'react'
import { shallow } from 'enzyme';
import { Note, mapDispatchToProps } from './Note';
import { putNote } from '../../thunks/putNote';
import { getIndex, createIssuesCopy } from '../../Helpers/functions';

jest.mock('../../thunks/putNote')
jest.mock('../../Helpers/functions')

describe('Note', () => {
    describe('Note component', () => {
        let wrapper;
        let mockNote;
        let mockEvent;
        let mockPutNote;

        beforeEach(() => {
            mockEvent = { target: { 
                id: '1',
                value: 'new body'
            }};
            mockNote = {
                id: '1',
                title: 'Title',
                color: 'white',
                issues: [
                    { id: '1', body: 'issue text', completed: false },
                    { id: '2', body: 'more issue text', completed: true },
                    { id: '3', body: 'text', completed: true }
                ]
            }
            let mockKey = 1;
            mockPutNote = jest.fn();
            wrapper = shallow(<Note note={mockNote} key={mockKey} putNote={mockPutNote}/>)
            getIndex.mockReturnValue('1');
            createIssuesCopy.mockReturnValue(mockNote.issues);
        });

        it('should match the correct snapshot', () => {
            expect(wrapper).toMatchSnapshot()
        });

        it('should call getIndex with the correct params', () => {
            wrapper.instance().toggleIssueCompletion(mockEvent);
            expect(getIndex).toHaveBeenCalledWith('1', mockNote.issues);
        });

        it('should call createIssuesCopy with the correct params', () => {
            wrapper.instance().toggleIssueCompletion(mockEvent);
            expect(createIssuesCopy).toHaveBeenCalledWith(mockNote.issues);
        });

        it('should call putNote with the correct params', async () => {
            wrapper.instance().toggleIssueCompletion(mockEvent);
            await expect(wrapper.instance().props.putNote).toHaveBeenCalledWith(mockNote);
        });

        it('renderIssues should filter complete/incomplete issues of array', () => {
            const completeIssues = wrapper.instance().renderIssues(true);
            expect(completeIssues.length).toEqual(2);
            
            const incompleteIssues = wrapper.instance().renderIssues(false);
            expect(incompleteIssues.length).toEqual(1);
        });
    });

    describe('mapDispatchToProps', () => {
        it('should call dispatch with a putNote action when putNote is called', () => {
            let mockNote = {
                title: 'Title',
                issues: [],
            }
            const mockDispatch = jest.fn();
            const actionToDispatch = putNote(mockNote);
            const mappedProps = mapDispatchToProps(mockDispatch);
            mappedProps.putNote(mockNote);
            expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
        });
    });
});
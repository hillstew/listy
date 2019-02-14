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

        beforeEach(() => {
            let mockNote = {
                title: 'Title',
                issues: [],
            }
            wrapper = shallow(<NoteForm note={mockNote} />)
        });

        it('should match the correct snapshot', () => {
            expect(wrapper).toMatchSnapshot()
        });
    });

    describe('mapStateToProps', () => {
        it('should return a string with a boolean', () => {
            const mockState = {
                popup: true,
                notes: []
            }
            
            const expected = {
                popup: true,
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
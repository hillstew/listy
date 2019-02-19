import React from 'react'
import { shallow } from 'enzyme';
import { Note, mapDispatchToProps } from './Note';
import { putNote } from '../../thunks/putNote';

jest.mock('../../thunks/putNote')

describe('Note', () => {
    describe('Note component', () => {
        let wrapper;

        beforeEach(() => {
            let mockNote = {
                title: 'Title',
                issues: [],
            }
            let mockKey = 1;
            wrapper = shallow(<Note note={mockNote} key={mockKey}/>)
        });

        it('should match the correct snapshot', () => {
            expect(wrapper).toMatchSnapshot()
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
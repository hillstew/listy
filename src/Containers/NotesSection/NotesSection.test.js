import React from 'react';
import { NotesSection, mapStateToProps } from './NotesSection';
import { shallow } from 'enzyme';

describe('NotesSection', () => {
  describe('NotesSection component', () => {
    let wrapper;
    let mockNotes;

    beforeEach(() => {
      mockNotes = [
        { id: '1', title: 'title1', issues: [] },
        { id: '1', title: 'title2', issues: [] },
      ];
      wrapper = shallow(
        <NotesSection 
          notes={mockNotes}
        />
      )
    });

    it('should match the correct snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('mapStateToProps', () => {
    it('should return redux state as props', () => {
      const mockState = {
        notes: [],
        error: ''
      }

      const expected = {
        notes: []
      }

      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    });
  });
});
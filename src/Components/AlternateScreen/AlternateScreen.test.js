import React from 'react'
import AlternateScreen from './AlternateScreen';
import { shallow } from 'enzyme'

describe('AlternateScreen', () => {
    let wrapper;
    let mockText;

    beforeEach(() => {
        mockText = '404 page not found'
        wrapper = shallow(<AlternateScreen text={mockText}/>)
    });

    it('should match the correct snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    });
});

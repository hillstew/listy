import React from 'react'
import Issue from './Issue';
import { shallow } from 'enzyme'

describe('Issue', () => {
    let wrapper;
    const mockToggleIssueCompletion = jest.fn()
    const mockHandleBodyChange = jest.fn()
    const mockRemoveIssue = jest.fn()

    beforeEach(() => {
        let props = {
            issue: {
                id: 1,
                body: '',
            }
        }
        wrapper = shallow(<Issue {...props} toggleIssueCompletion={mockToggleIssueCompletion} handleBodyChange={mockHandleBodyChange} removeIssue={mockRemoveIssue} />)
    });

    it('should match the correct snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    });
});

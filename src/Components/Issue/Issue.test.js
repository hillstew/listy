import React from 'react';
import Issue from './Issue';
import { shallow } from 'enzyme';

describe('Issue', () => {
  let wrapper;
  const mockToggleIssueCompletion = jest.fn();
  const mockHandleBodyChange = jest.fn();
  const mockRemoveIssue = jest.fn();

  beforeEach(() => {
    let props = {
      issue: {
        id: 1,
        body: '',
        completed: true
      }
    };
    wrapper = shallow(
      <Issue
        {...props}
        completed={true}
        toggleIssueCompletion={mockToggleIssueCompletion}
        handleBodyChange={mockHandleBodyChange}
        removeIssue={mockRemoveIssue}
      />
    );
  });

  it('should match the correct snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a className complete-item if completed', () => {
    expect(wrapper.exists('.complete-item')).toEqual(true);
  });

  it('should have a className incomplete-item if incompleted', () => {
    let props = {
      issue: {
        id: 1,
        body: '',
        completed: true
      }
    };
    wrapper = shallow(
      <Issue
        {...props}
        completed={false}
        toggleIssueCompletion={mockToggleIssueCompletion}
        handleBodyChange={mockHandleBodyChange}
        removeIssue={mockRemoveIssue}
      />
    );
    expect(wrapper.exists('.incomplete-item')).toEqual(true);
  });
});

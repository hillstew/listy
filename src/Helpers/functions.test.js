import { getIndex, createIssuesCopy } from './functions';

describe('getIndex', () => {
    it('should find the index of the correct issue when getIndex is called', () => { 
        const expected = 0;
        const mockIssues = [
            { id: '1', body: 'issue text'},
            { id: '2', body: 'more issue text' },
        ]
        const result = getIndex('1', mockIssues);
        expect(result).toEqual(expected);
    });
});

describe('createIssuesCopy', () => {
    it('should create a copy of the array of issues when createIssuesCopy is called', () => { 
        const mockIssues = [
            { id: '1', body: 'issue text'},
            { id: '2', body: 'more issue text' },
        ]
        const expected = [
            { id: '1', body: 'issue text'},
            { id: '2', body: 'more issue text' },
        ]
        const result = createIssuesCopy(mockIssues);
        expect(result).toEqual(expected);
    });
});
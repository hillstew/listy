import API from './api';

describe('API', () => {
  describe('fetchData', () => {
    let path;
    let method;
    let data;

    beforeEach(() => {
      path = 'notes';
      method = 'POST';
      data = { title: 'Note title', issues: [{ id: '1', body: 'issue 1' }] };
    });

    it('should call fetch with the correct parameters', () => {
      const expectedUrl = `http://localhost:3001/api/v1/${path}`;
      const expectedParams = {
        method: method,
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json'
        }
      };
      window.fetch = jest.fn();
      API.fetchData(path, method, data);
      expect(window.fetch).toHaveBeenCalledWith(expectedUrl, expectedParams);
    });

    it('should return a response object if everything is okay', async () => {
      const mockNote = { id: '1', title: 'Note title', issues: [{ id: '1', body: 'issue 1' }] };
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve({
          ...mockNote
        }),
        ok: true
      }));
      const result = await API.fetchData(path, method, data)
      expect(result).toEqual(mockNote);
    });

    it('should throw an error if everything is not okay', async () => {
      const expected = Error('Error fetching data: Error posting data');
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        statusText: 'Error posting data',
        ok: false
      }));
      await expect(API.fetchData(path, method, data)).rejects.toEqual(expected);
    });
  });
});
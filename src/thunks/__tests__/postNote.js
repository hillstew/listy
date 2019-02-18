import { postNote } from '../postNote';
import { setError, addNote } from '../../actions/index';
import API from '../../utils/api';

describe('postNote', () => {
  let mockDispatch;
  let mockNote;

  beforeEach(() => {
    mockNote = { title: 'Note title', issues: [{ id: '1', body: 'issue 1' }] };
    mockDispatch = jest.fn()
  })

  it('should call API.fetchData with the correct params', async () => {
    API.fetchData = jest.fn()
    const thunk = postNote(mockNote)
    await thunk(mockDispatch)
    expect(API.fetchData).toHaveBeenCalledWith('notes', 'POST', { title: 'Note title', issues: [{ id: '1', body: 'issue 1' }] })
  })

  it('should dispatch setError with message if response is not ok', async () => {
    API.fetchData = jest.fn().mockImplementation(() => {
      throw 'Error fetching data'
    });
    const thunk = postNote(mockNote)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(setError('Error fetching data'))
  })

  it('should dispatch addNote if response is ok', async () => {
    const expected = { ...mockNote, id: '1' };
    API.fetchData = jest.fn().mockImplementation(() => {
      return expected
    })
    const thunk = postNote(mockNote)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(addNote(expected))
  })
})
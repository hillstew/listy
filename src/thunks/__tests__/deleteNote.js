import { deleteNote } from '../deleteNote';
import { setError, removeNote, setLoading } from '../../actions/index';
import API from '../../utils/api';

describe('deleteNote', () => {
  let mockDispatch;
  let mockId;

  beforeEach(() => {
    mockId = '1';
    mockDispatch = jest.fn()
  })

  it('should call dispatch with the setLoading action', () => {
    const thunk = deleteNote(mockId)
    thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(true))
  })

  it('should call API.fetchData with the correct params', async () => {
    API.fetchData = jest.fn()
    const thunk = deleteNote(mockId)
    await thunk(mockDispatch)
    expect(API.fetchData).toHaveBeenCalledWith('notes/1', 'DELETE')
  })

  it('should dispatch setError with message if response is not ok', async () => {
    API.fetchData = jest.fn().mockImplementation(() => {
      throw 'Error fetching data'
    });
    const thunk = deleteNote(mockId)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(setError('Error fetching data'))
  })

  it('should dispatch removeNote if response is ok', async () => {
    const expected = '1';
    API.fetchData = jest.fn().mockImplementation(() => expected)
    const thunk = deleteNote(mockId)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(removeNote(expected))
  })

  it('should dispatch setLoading(false)', async () => {
    const expected = '1';
    API.fetchData = jest.fn().mockImplementation(() => expected)
    const thunk = deleteNote(mockId)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(false))
  })
})
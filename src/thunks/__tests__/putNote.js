import { putNote } from '../putNote';
import { setError, updateNote, setLoading } from '../../actions/index';
import API from '../../utils/api';

describe('putNote', () => {
  let mockDispatch;
  let mockNote;

  beforeEach(() => {
    mockNote = { id: '1', title: 'Note title', issues: [{ id: '1', body: 'issue 1' }] };
    mockDispatch = jest.fn()
  })

  it('should call dispatch with the setLoading action', () => {
    const thunk = putNote(mockNote)
    thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(true))
  })

  it('should call API.fetchData with the correct params', async () => {
    API.fetchData = jest.fn()
    const thunk = putNote(mockNote)
    await thunk(mockDispatch)
    expect(API.fetchData).toHaveBeenCalledWith('notes/1', 'PUT', { title: 'Note title', issues: [{ id: '1', body: 'issue 1' }]})
  })

  it('should dispatch setError with message if response is not ok', async () => {
    API.fetchData = jest.fn().mockImplementation(() => {
      throw 'Error fetching data'
    });
    const thunk = putNote(mockNote)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(setError('Error fetching data'))
  })

  it('should dispatch updateNote if response is ok', async () => {
    API.fetchData = jest.fn()
    const thunk = putNote(mockNote)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(updateNote(mockNote))
  })

  it('should dispatch setLoading(false)', async () => {
    API.fetchData = jest.fn()
    const thunk = putNote(mockNote)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(false))
  })
})
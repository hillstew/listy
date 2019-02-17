import { fetchNotes } from '../fetchNotes';
import { setError, setNotes, setLoading } from '../../actions/index';
import API from '../../utils/api';

describe('fetchNotes', () => {
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = jest.fn()
  })

  it('should call dispatch with the setLoading action', () => {
    const thunk = fetchNotes()
    thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(true))
  })

  it('should call API.fetchData with the correct params', async () => {
    API.fetchData = jest.fn()
    const thunk = fetchNotes()
    await thunk(mockDispatch)
    expect(API.fetchData).toHaveBeenCalledWith('notes', 'GET')
  })

  it('should dispatch setError with message if response is not ok', async () => {
    API.fetchData = jest.fn().mockImplementation(() =>  {
      throw 'Error fetching data'
    });
    const thunk = fetchNotes()
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(setError('Error fetching data'))
  })

  it('should dispatch setNotes if response is ok', async () => {
    const expected = [{id: '1', title: 'Note title', issues: [{id: '1', body: 'issue 1'}]}];
    API.fetchData = jest.fn().mockImplementation(() => expected)
    const thunk = fetchNotes()
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(setNotes(expected))
  })

  it('should dispatch setLoading(false)', async () => {
    const expected = [{ id: '1', title: 'Note title', issues: [{ id: '1', body: 'issue 1' }] }];
    API.fetchData = jest.fn().mockImplementation(() => expected)
    const thunk = fetchNotes()
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(false))
  })
})

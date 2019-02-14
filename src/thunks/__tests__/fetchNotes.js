import { fetchNotes } from '../fetchNotes';
import { setError, setNotes, setLoading } from '../../actions/index';

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

  it('should dispatch setError with message if response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: false,
        statusText: 'Something went wrong'
      })
    )

    const thunk = fetchNotes()
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(setError('Something went wrong'))
  })

  it('should dispatch setLoading(false) and setNotes if response is ok', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true
      })
    )

    const thunk = fetchNotes()
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(false))
  })
})

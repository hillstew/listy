import { loadingReducer } from './loadingReducer'
import * as actions from '../../actions'

describe('loadingReducer', () => {

  it('should return the initial state as default', () => {
    const result = loadingReducer(undefined, {})
    expect(result).toEqual(true)
  });

  it('should set loading', () => {
    const expected = false 
    const result = loadingReducer(undefined, actions.setLoading(expected))
    expect(result).toEqual(expected)
  })
});
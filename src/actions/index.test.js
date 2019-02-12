import * as actions from "./index"

describe("actions", () => {
  it("should return a type of SET_NOTES, with all notes", () => {
    const notes = [
      { id: 1, title: "title1", body: "body of note1" },
      { id: 2, title: "title2", body: "body of note2" }
    ]
    const expected = {
      type: "SET_NOTES",
      notes
    }
    const result = actions.setNotes(notes)
    expect(result).toEqual(expected)
  })

  it("should return a type of ADD_NOTE, with the note", () => {
    const note = { id: 4, title: "title4", body: "body of note4" }
    const expected = {
      type: "ADD_NOTE",
      note
    }
    const result = actions.addNote(note)
    expect(result).toEqual(expected)
  })

  it("should return a type of REMOVE_NOTE, with an id", () => {
    const id = 2
    const expected = {
      type: "REMOVE_NOTE",
      id
    }
    const result = actions.removeNote(id)
    expect(result).toEqual(expected)
  })

  it("should return a type of UPDATE_NOTE, with a note", () => {
    const note = { id: 4, title: "title4", body: "body of note4" }
    const expected = {
      type: "UPDATE_NOTE",
      note
    }
    const result = actions.updateNote(note)
    expect(result).toEqual(expected)
  })

  it("should return a type of SET_ERROR, with an error", () => {
    const error = "This is an error"
    const expected = {
      type: "SET_ERROR",
      error
    }
    const result = actions.setError(error)
    expect(result).toEqual(expected)
  })

  it("should return a type of SET_LOADING, with loading boolean", () => {
    const loading = true
    const expected = {
      type: "SET_LOADING",
      loading
    }
    const result = actions.setLoading(loading)
    expect(result).toEqual(expected)
  })
})

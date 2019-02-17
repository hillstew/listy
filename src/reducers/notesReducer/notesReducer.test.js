import { notesReducer } from "./notesReducer"
import * as actions from "../../actions"

describe("notesReducer", () => {
  it("should return the initial state", () => {
    const expected = []
    const result = notesReducer(undefined, {})
    expect(result).toEqual(expected)
  })

  it("should return the all the notes", () => {
    const expected = [
      { id: '1', title: "title1", body: "body of note1" },
      { id: '2', title: "title2", body: "body of note2" },
      { id: '3', title: "title3", body: "body of note3" }
    ]
    const result = notesReducer(undefined, actions.setNotes(expected))
    expect(result).toEqual(expected)
  })

  it("should add a new note", () => {
    const currentState = [
      { id: '1', title: "title1", body: "body of note1" },
      { id: '2', title: "title2", body: "body of note2" },
      { id: '3', title: "title3", body: "body of note3" }
    ]
    const expected = [
      { id: '1', title: "title1", body: "body of note1" },
      { id: '2', title: "title2", body: "body of note2" },
      { id: '3', title: "title3", body: "body of note3" },
      { id: '4', title: "title4", body: "body of note4" }
    ]
    const newNote = { id: '4', title: "title4", body: "body of note4" }
    const result = notesReducer(currentState, actions.addNote(newNote))
    expect(result).toEqual(expected)
  })

  it("should remove a note", () => {
    const currentState = [
      { id: '1', title: "title1", body: "body of note1" },
      { id: '2', title: "title2", body: "body of note2" },
      { id: '3', title: "title3", body: "body of note3" },
      { id: '4', title: "title4", body: "body of note4" }
    ]
    const expected = [
      { id: '1', title: "title1", body: "body of note1" },
      { id: '2', title: "title2", body: "body of note2" },
      { id: '3', title: "title3", body: "body of note3" }
    ]
    const result = notesReducer(currentState, actions.removeNote('4'))
    expect(result).toEqual(expected)
  })

  it("should update an existing note", () => {
    const currentState = [
      { id: '1', title: "title1", body: "body of note1" },
      { id: '2', title: "title2", body: "body of note2" },
      { id: '3', title: "title3", body: "body of note3" }
    ]
    const expected = [
      { id: '1', title: "title1", body: "body of note1" },
      { id: '2', title: "title2", body: "body of note2" },
      { id: '3', title: "new title", body: "new body" }
    ]

    const newNote = { id: '3', title: "new title", body: "new body" }
    const result = notesReducer(currentState, actions.updateNote(newNote))
    expect(result).toEqual(expected)
  })
})

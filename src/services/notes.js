import {token} from "../encodedtoken";

function addNote(note,setNoteList){
  return (async()=>{
    try{
      const response= axios.post('/api/notes', {
        note,
        headers: {
          authorization: token,
        }
      });
      setNoteList(response.data.notes)
    }catch(error){
      console.log(error)
    }
  });
}

function getNotesList(setNoteList){
  return (async()=>{
    try{
      const response= axios.get('/api/notes', {
        headers: {
          authorization: token,
        }
      });
      setNoteList(response.data.notes)
    }catch(error){
      console.log(error)
    }
  });
}

function deleteNote(noteID, setNoteList){
  return (async()=>{
    try{
      const response= axios.delete(`/api/notes/${noteID}`, {
        headers: {
          authorization: token,
        }
      });
      setNoteList(response.data.notes)
    }catch(error){
      console.log(error)
    }
  });
}

function editNote(note, setNoteList){
  return (async()=>{
    try{
      const response= axios.post(`/api/notes/${noteID}`, {
        headers: {
          authorization: token,
        }
      });
      setNoteList(response.data.notes)
    }catch(error){
      console.log(error)
    }
  });
}

export{addNote, getNotesList, deleteNote, editNote}

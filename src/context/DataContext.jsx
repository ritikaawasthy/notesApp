import {useContext, createContext,useReducer, useState, useEffect} from "react";
import {token} from "../encodedtoken.jsx";
import { v4 as uuid } from "uuid";
import axios from "axios";

const DataContext=createContext();

const reducerFunction=(state, action)=>{
  switch(action.type){
    case "ADD_TO_NOTELIST":
    console.log(action.payload)
    return({...state, notes: [...state.notes,action.payload] });
    case "ADD_TO_ARCHIVES":
    return({...state, archives: [...state.archives,action.payload]});
    case "ADD_TO_LABELS":
    return({...state, labels: [...state.labels,action.payload]});
    case "ADD_TO_TRASH":
    return({...state, trash: [...state.trash,action.payload]});
    case "SET_NOTELIST":
    return({...state, notes:action.payload});
    case "SET_ARCHIVELIST":
    return({...state, archives:action.payload});
    case "REMOVE_FROM_LABELS":
    return({...state, labels: state.labels.filter((item)=>item!==action.payload)});

  }

}

const DataProvider=({children})=>{
  useEffect(()=>{
    (async function(){
      try{
        const response= await axios.get('/api/notes', {
          headers:{ authorization: token}
        });
        setNoteList(()=>response.data.notes)
      }catch(error){
        console.log(error)
      }
      })
  },[])

  const [note, setNote]= useState({
      head: "",
      body: "",
      color:"white-bg",
      priority: "",
      tags:[],
      date: new Date().toLocaleDateString(),
  });
  const [noteList, setNoteList]= useState([]);
  const [addNoteCard, setAddNoteCard]= useState({
    class: "none",
    type: ""
  });
  const [state, dispatch]= useReducer(reducerFunction, {
    notes: [],
    labels: [{ _id: uuid(), tag:"Work" }, { _id: uuid(), tag:"Household" }, { _id: uuid(), tag:"Personal" } ],
    archives:[],
    trash: []
  });


  const showAddNote=(bool,val)=>{
    if(bool){
      setAddNoteCard({class:"flex", type:val})
    }else{
      setAddNoteCard({class:"none", type: ""})
    }
  }

async function noteSubmitHandler(event){
    console.log("trigg")
    event.preventDefault();
      try{
        const response= await axios.post(`/api/notes`,
        {note},
        {
          headers:{ authorization: token}
        }
      );
      // setNoteList(()=>response.data.notes)
      dispatch({type:"SET_NOTELIST", payload:response.data.notes})
      showAddNote(false,"")
      setNote({
        head: "",
        body: "",
        color:"white-bg",
        priority: "",
        labels: []
      })
      }
      catch(error){
        console.log(error)
      }


    }

    async function editNote(event,note){
      console.log("note", note)
      event.preventDefault();
        try{
        const response= await axios.post(`/api/notes/${note._id}`,
          { note },
        {
          headers:{ authorization: token}
        }
      );
      console.log(response.data.notes)
      dispatch({type: "SET_NOTELIST", payload:response.data.notes})
      showAddNote(false,"")
    }catch(error){
      console.log(error)
    }

    }

  return(
    <DataContext.Provider value={{
      note, setNote,noteList, setNoteList,state, dispatch, addNoteCard, setAddNoteCard, showAddNote, token, noteSubmitHandler, editNote
    }}>
    {children}
    </DataContext.Provider>
  );
};

const useData= ()=>useContext(DataContext);

export{useData, DataProvider};

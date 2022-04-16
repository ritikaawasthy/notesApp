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
    //filters
    case "SORT_PRIORITY_HIGH":
    return({...state, notes: state.notes.sort((a,b)=>a.priority-b.priority)});
    case "SORT_PRIORITY_LOW":
    return({...state, notes:state.notes.sort((a,b)=>b.priority-a.priority)});
    case "SORT_DATE_HIGH":
    return({...state, notes:state.notes.sort((a,b)=>{
      let dateA= new Date(a.date), dateB= new Date(b.date)
      return(dateA-dateB)
    })});
    case "SORT_DATE_LOW":
    return({...state, notes:state.notes.sort((a,b)=>{
      let dateA= new Date(a.date), dateB= new Date(b.date)
      return(dateB-dateA)
    })});

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

  const [showTags, setShowTags]= useState("none");

  const [filter, setFilter]= useState({
    selectedSort: "",
    selectedFilter: ""
  });


  const showAddNote=(bool,val)=>{
    if(bool){
      setAddNoteCard({class:"flex", type:val})
    }else{
      setAddNoteCard({class:"none", type: ""})
    }
  }

async function noteSubmitHandler(event){
    event.preventDefault();
      try{
        const response= await axios.post(`/api/notes`,
        {note},
        {
          headers:{ authorization: token}
        }
      );
      dispatch({type:"SET_NOTELIST", payload:response.data.notes})
      showAddNote(false,"")
      setNote({
        head: "",
        body: "",
        color:"white-bg",
        priority: "",
        tags: [],
        date: new Date().toLocaleDateString(),
      })
      setShowTags("none")
      }
      catch(error){
        console.log(error)
      }


    }

    async function editNote(event,note){
      setNote({...note, date:new Date().toLocaleDateString() })
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
      note, setNote,noteList, setNoteList,state, dispatch, addNoteCard, setAddNoteCard, showAddNote, token, noteSubmitHandler, editNote, showTags, setShowTags, filter, setFilter
    }}>
    {children}
    </DataContext.Provider>
  );
};

const useData= ()=>useContext(DataContext);

export{useData, DataProvider};

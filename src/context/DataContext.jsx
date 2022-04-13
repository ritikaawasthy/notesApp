import {useContext, createContext,useReducer, useState, useEffect} from "react";
import {token} from "../encodedtoken.jsx";
import { v4 as uuid } from "uuid";
const DataContext=createContext();

const reducerFunction=(state, action)=>{
  switch(action.type){
    case "ADD_TO_NOTELIST":
    return({...state, notes: [...state.notes,action.payload] });
    case "ADD_TO_ARCHIVES":
    return({...state, archives: [...state.archives,action.payload]});
    case "ADD_TO_LABELS":
    return({...state, labels: [...state.labels,action.payload]});
    case "ADD_TO_TRASH":
    return({...state, trash: [...state.trash,action.payload]})
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
  const [addNoteCard, setAddNoteCard]= useState("none");
  const [state, dispatch]= useReducer(reducerFunction, {
    notes: [],
    labels: ["work"],
    archives:[],
    trash: []
  });


  const showAddNote=(bool)=>bool?setAddNoteCard(()=>"flex"):setAddNoteCard(()=>"none")

  return(
    <DataContext.Provider value={{
      note, setNote,noteList, setNoteList,state, dispatch, addNoteCard, setAddNoteCard, showAddNote, token
    }}>
    {children}
    </DataContext.Provider>
  );
};

const useData= ()=>useContext(DataContext);

export{useData, DataProvider};

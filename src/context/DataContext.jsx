import {useContext, createContext,useReducer} from "react";
import {encodedToken} from "../encodedtoken.jsx";
const DataContext=createContext();

const reducerFunction=(state, action)=>{
  switch(action.type){
    case "GET_NOTELIST":
    return({...state, notes: action.payload });
    case "GET_ARCHIVES":
    return({...state, archives: action.payload});
    case "GET_LABELS":
    return({...state, labels: action.payload});
    case "GET_TRASH":
    return({...state, trash: action.payload})
  }

}

const DataProvider=({children})=>{
  const [note, setNote]= useState("");
  const [noteList, setNoteList]= useState([]);
  const [state, dispatch]= useReducer(reducerFunction, {
    notes: [],
    labels: [],
    archives:[],
    trash: []
  });

  const colors={
    rose: "#FDE2E4",
    mint: "#E2ECE9",
    lavender: "#DFE7FD",
    lemon: "#FBF8CC"
  }

  const token= encodedToken;

  return(
    <DataContext.Provider value={
      note, setNote,noteList, setNoteList,state, dispatch, token, colors
    }>
    {value}
    </DataContext.Provider>
  );
};

const useData= ()=>useContext(DataContext);

export{useData, DataProvider};

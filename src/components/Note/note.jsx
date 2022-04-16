import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPalette, faEdit, faArchive, faTrash, faClose, faTag} from '@fortawesome/free-solid-svg-icons';
import "./note.css";
import {useData} from "../../context/DataContext";
import axios from "axios";
function Note(props){
  const pageData= props.data;
  const pageType= props.type;
  const priorityMap={
    1: "High",
    2: "Medium",
    3: "Low"
  }



  const {setNote, showAddNote ,token, dispatch, state}= useData();

  async function addToTrash(event,item){
    event.preventDefault();
    try{
      const response= await axios.delete(`/api/notes/${item._id}`,
      {
        headers:{ authorization: token}
      }
    );
    dispatch({type: "SET_NOTELIST", payload:response.data.notes})
    dispatch({type:"ADD_TO_TRASH", payload:item })
  }catch(error){
    console.log(error)
  }
}

async function addToArchive(event,item){
  event.preventDefault();
  try{
    const response= await axios.post(`/api/notes/archives/${item._id}`,
      {item},
    {
      headers:{ authorization: token}
    }
  );
  dispatch({type: "SET_ARCHIVELIST", payload:response.data.archives})
    dispatch({type: "SET_NOTELIST", payload:response.data.notes})
}catch(error){
  console.log(error)
}
}


const triggerEdit=(event,item)=>{
  console.log("trigger edit",item)
  setNote(()=>item)
  showAddNote(true, "EDIT")
}

async function restoreToNote(event,item){
  event.preventDefault();
  try{
    const response= await axios.post(`/api/archives/restore/${item._id}`,
      {},
    {
      headers:{ authorization: token}
    }
  );
  dispatch({type: "SET_ARCHIVELIST", payload:response.data.archives})
    dispatch({type: "SET_NOTELIST", payload:response.data.notes})
}catch(error){
  console.log(error)
}
}

async function moveToTrash(event,item){
  event.preventDefault();
  try{
    const response= await axios.delete(`/api/archives/delete/${item._id}`,
    {
      headers:{ authorization: token}
    }
  );
  dispatch({type: "SET_ARCHIVELIST", payload:response.data.archives})
  dispatch({type:"ADD_TO_TRASH", payload:item })
}catch(error){
  console.log(error)
}
}

const noteFooter=(item)=>{
  switch(pageType){
    case "NOTE":
    return(
      <div className="note-footer-end">
      <FontAwesomeIcon icon={faPalette}></FontAwesomeIcon>
      <FontAwesomeIcon onClick={(event)=>triggerEdit(event,item)} icon={faEdit}></FontAwesomeIcon>
      <FontAwesomeIcon onClick={(event)=>addToArchive(event,item)} icon={faArchive}></FontAwesomeIcon>
      <FontAwesomeIcon onClick={(event)=>addToTrash(event,item)} icon={faTrash}></FontAwesomeIcon>
      </div>
    )
    case "ARCHIVE":
    return(
        <div className="note-footer-end">
       <FontAwesomeIcon onClick={(event)=>restoreToNote(event,item)} icon={faArchive}></FontAwesomeIcon>
        <FontAwesomeIcon onClick={(event)=>moveToTrash(event,item)} icon={faTrash}></FontAwesomeIcon>
        </div>
    )
    default:
    return(
      <div className="note-footer-end">
      </div>
    )
  }
}

      return(
        <div >
        {
          pageData.map((item)=><div key={item._id} className={`card card-shadow w-xxl note  ${item.color} `}>
          <div className="card-content stacked">
              <div class=" primary-col">
                <h2>{item.head}</h2>
                <hr className="w-full"></hr>
              </div>
            <p className="note-body f-s">{item.body}</p>
            <div className="note-footer">
              <p>{item.date}</p>
              <h5>{priorityMap[`${item.priority}`]}</h5>
            {noteFooter(item)}

            </div>
          </div>
        </div>)
      }
      </div>
      )
}

export{Note}

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPalette, faEdit, faArchive, faTrash, faClose, faTag} from '@fortawesome/free-solid-svg-icons';
import {useData} from "../../context/DataContext";
import axios from "axios";
function Note(props){

  const pageType= props.type;

  const {noteList,setNoteList, token, dispatch, state}= useData();

  async function addToTrash(event,item){
    event.preventDefault();
    try{
      const response= await axios.delete(`/api/notes/${item._id}`,
      {
        headers:{ authorization: token}
      }
    );
    setNoteList(()=>response.data.notes)
    dispatch({type:"ADD_TO_TRASH", payload:item })
    console.log(response.data.notes)
  }catch(error){
    console.log(error)
  }
}

async function editNote(event,item){
  event.preventDefault();
  try{
    const response= await axios.post(`/api/notes/${item._id}`,
    {
      headers:{ authorization: token}
    }
  );
  setNoteList(()=>response.data.notes)
  dispatch({type:"ADD_TO_TRASH", payload:item })
  console.log(response.data.notes)
}catch(error){
  console.log(error)
}
}


  return(
    <div>

      {
        if(props.type="label"){
          

        }else{
          noteList.map((item)=>{
              return(
                <div key={item._id} className={`card card-shadow w-xxl note  ${item.color} `}>
                  <div className="card-content stacked">
                      <div class=" primary-col">
                        <h2>{item.head}</h2>
                        <hr className="w-full"></hr>
                      </div>
                    <p className="note-body f-m">{item.body}</p>

                    <div className="note-footer">
                      <p>{item.date}</p>
                      <div className="note-footer-end">
                        <FontAwesomeIcon icon={faPalette}></FontAwesomeIcon>
                        <FontAwesomeIcon onClick={(event)=>editNote(event,item)} icon={faEdit}></FontAwesomeIcon>
                        <FontAwesomeIcon icon={faArchive}></FontAwesomeIcon>
                        <FontAwesomeIcon onClick={(event)=>addToTrash(event,item)} icon={faTrash}></FontAwesomeIcon>
                        <h5>{item.priority}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              )
          })
        }

      }

    </div>
  )
}

export{Note}

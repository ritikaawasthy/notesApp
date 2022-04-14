import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPalette, faClose, faTag} from '@fortawesome/free-solid-svg-icons';
import {useData} from "../../context/DataContext";
import axios from "axios";

function NoteOverlay(){
    const {note, setNote,setNoteList,addNoteCard, showAddNote, token, }= useData();

    const noteChangeHandler=(event)=>{
      setNote(()=>({...note, [event.target.name]:event.target.value  }))
    }

    const changeCardColor = (currentColor) => {
      const colors = ["rose", "mint", "lavender", "lemon", "white-bg"];
      let index = colors.findIndex((item) => item === currentColor);
      if (index !== undefined && index < 4) {
        setNote(()=>({...note, color:colors[index + 1]}))
      } else {
        setNote(()=>({...note, color: colors[0]}))
      }
    };

    async function noteSubmitHandler(event){
      event.preventDefault();
          try{
            const response= await axios.post(`/api/notes`,
            {note},
            {
              headers:{ authorization: token}
            }
          );
          setNoteList(()=>response.data.notes)
          showAddNote(false)
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

  return(
    <section className="addNoteCard" style={{display: `${addNoteCard}`}}>
        <form onChange={(event)=>noteChangeHandler(event)} onSubmit={(event)=>noteSubmitHandler(event)} className={`card card-shadow w-xxl note ${note.color}`}>
          <div className="card-content stacked">
            <div className="addNoteCardHead">
              <div class=" primary-col w-full">
                <div class="input-container primary-col">
                  <input name="head"  placeholder=" " className="input f-l" value={note.head}></input>
                  <label className="input-label f-l ">Note Heading</label>
                </div>
              </div>
              <FontAwesomeIcon icon={faClose} onClick={()=>showAddNote(false)} className="primary-col f-xl"></FontAwesomeIcon>
            </div>
            <textarea name="body" className="note-body f-s" value={note.body}></textarea>
            <div className="note-footer end">
              <h5>Priority:</h5>
              <input type="radio" name="priority" value='High'></input>
              <label>High</label>
              <input type="radio" name="priority" value='Medium'></input>
              <label>Medium</label>
              <input type="radio" name="priority" value='Low'></input>
              <label>Low</label>
                <FontAwesomeIcon onClick={()=>changeCardColor(note.color)} icon={faPalette}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faTag}></FontAwesomeIcon>
            </div>
          </div>
          <button className="btn primary-bg f-m center-txt" type="submit" >Submit</button>
        </form >
    </section>
  )
}

export{NoteOverlay}

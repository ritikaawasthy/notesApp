import "./home-page.css";
import {SideNav} from '../../components/index';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPalette, faEdit, faArchive, faTrash, faClose, faTag} from '@fortawesome/free-solid-svg-icons';
import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useData} from "../../context/DataContext";
import axios from "axios";
function HomePage() {
  const actionType= useParams();
  const {note, setNote, noteList,setNoteList,addNoteCard, showAddNote, token, dispatch, state}= useData();


  const noteChangeHandler=(event)=>{
    setNote(()=>({...note, [event.target.name]:event.target.value  }))
  }

  const changeCardColor = (currentColor) => {
    const colors = ["rose", "mint", "lavender", "lemon", "white-bg"];
    let index = colors.findIndex((item) => item === currentColor);
    console.log(index)
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




  return (
    <section>
    <section className="homepage-layout-container secondary-light-bg">
    <article className="homepage-layout-side">
      <SideNav/>
    </article>

    <article className="homepage-layout-main">
      <div class="input-container primary-col">
        <input placeholder=" " className="input f-m w-full"></input>
        <label className="input-label f-m">Search</label>
      </div>
    {
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

   </article>
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
            <lable>High</lable>
            <input type="radio" name="priority" value='Medium'></input>
            <lable>Medium</lable>
            <input type="radio" name="priority" value='Low'></input>
            <lable>Low</lable>
              <FontAwesomeIcon onClick={()=>changeCardColor(note.color)} icon={faPalette}></FontAwesomeIcon>
              <FontAwesomeIcon icon={faTag}></FontAwesomeIcon>
          </div>
        </div>
        <button className="btn primary-bg f-m center-txt" type="submit" >Submit</button>
      </form >
  </section>
   </section>
</section>
);
}
export {
  HomePage
}

//
// <div className="card card-shadow w-xxl white-bg note">
//   <div className="card-content stacked">
//
//       <div class="input-container primary-col">
//         <input placeholder=" " className="input f-l"></input>
//         <label className="input-label f-l ">Note Heading</label>
//       </div>
//
//     <textarea className="note-body f-s"></textarea>
//     <div className="note-footer end">
//         <FontAwesomeIcon icon={faPaintbrush}></FontAwesomeIcon>
//         <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
//         <FontAwesomeIcon icon={faArchive}></FontAwesomeIcon>
//         <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
//     </div>
//   </div>
// </div>

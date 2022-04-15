import "../home-page/home-page.css";
import "../../components/SideNav/side-nav.css";
import {SideNav, NoteOverlay} from '../../components/index';
import {useData} from "../../context/DataContext";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAdd, faTrash} from '@fortawesome/free-solid-svg-icons';
import { v4 as uuid } from "uuid";
import {useState} from "react";
function LabelPage(){
  const {state, dispatch} = useData();
  const [label, setLabel]= useState({
    id: uuid(),
    tag: "",
  });

  const addLabel=(event,label)=>{
    event.preventDefault();
    dispatch({type:"ADD_TO_LABELS", payload:label})
    setLabel({  id: uuid(),tag: "",})
  }

  const removeLabel=(event,label)=>{
    event.preventDefault();
    dispatch({type:"REMOVE_FROM_LABELS", payload:label})
  }

  return(
    <section>
    <section className="homepage-layout-container secondary-light-bg">
    <article className="homepage-layout-side">
      <SideNav/>
    </article>

    <article className="homepage-layout-main">
      <div class="input-container primary-col">
        <input placeholder=" " className="input f-m w-full" ></input>
        <label className="input-label f-m">Search</label>
      </div>
      <h2>Labels</h2>
      <form className="container" onSubmit={(event)=>addLabel(event,label)}>
        <div class="input-container">
          <input placeholder=" " class="input" value={label.tag} onChange={(event)=>setLabel({...label, tag:event.target.value })}></input>
          <label class="input-label ">Label</label>
        </div>
          <button type="submit" className="btn btn-float btn-bordered primary-bg" >
            <FontAwesomeIcon icon={faAdd} ></FontAwesomeIcon>
          </button>
      </form>
      <div >
        <ul>
          {
            state.labels.map((item)=><li key={item._id} onClick={(event)=>removeLabel(event,item)} className="container">
            <a className="badge badge-text primary-bg">{item.tag}</a>
            <FontAwesomeIcon className="end" icon={faTrash}></FontAwesomeIcon>
             </li>)
           }
        </ul>
      </div>
   </article>
   <NoteOverlay/>
   </section>
</section>

)
}
export{LabelPage}

import "./home-page.css";
import {SideNav, Note, NoteOverlay} from '../../components/index';
import {useData} from "../../context/DataContext";
import {useState} from "react";
function HomePage() {
  const {state, filter, setFilter, dispatch}= useData();
  const filterData= state.notes;
  const sortChangeHandler=(event)=>{
  setFilter({...filter,[event.target.name]: event.target.value})
  dispatch({type:event.target.value})
  }

  console.log(filter)
  console.log(state.notes)



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
      <div className="note-container">
        <div>
          <h1>Notes</h1>
          <Note data={filterData} type="NOTE" />
        </div>
        <div >
          <h4 className="mg-b-m">Filters</h4>
          <form onSubmit={(event)=>{
              event.preventDefault();
              console.log("filter",filter)
            }} className="note-filter">
        <ul>
          <li>
            <h5>Labels</h5>
            {state.labels.map((item)=><div>
             <input type="checkbox" name="tag" value={item.tag}></input>
             <label>{item.tag}</label>
             </div>
            )}
          </li>
            <h4 className="fw-li">Sort By</h4>
          <li>
            <h5>Date</h5>
             <label>
              <input type="radio" name="sort" value="SORT_DATE_HIGH" checked={filter.selectedSort==="SORT_DATE_HIGH"} name="selectedSort" onChange={(event)=>sortChangeHandler(event)}></input>
              Hign - Low
            </label>
               <label>
              <input type="radio" name="sort" value="SORT_DATE_LOW" checked={filter.selectedSort==="SORT_DATE_LOW"}
                  name="selectedSort"
                onChange={(event)=>sortChangeHandler(event)}
                ></input>
               Low - High</label>
          </li>

          <li>
            <h5>Priority</h5>
              <input type="radio" name="sort" value="SORT_PRIORITY_HIGH" checked={filter.selectedSort==="SORT_PRIORITY_HIGH"}
                name="selectedSort"
                onChange={(event)=>sortChangeHandler(event)}
                ></input>
              <label>Hign - Low</label>
              <input type="radio" name="sort" value="SORT_PRIORITY_LOW" checked={filter.selectedSort==="SORT_PRIORITY_LOW"}
                name="selectedSort"
                onChange={(event)=>sortChangeHandler(event)}
                ></input>
              <label>Low - High</label>
          </li>
          
        </ul>
        </form>
        </div>
      </div>
   </article>
   <NoteOverlay/>
   </section>
</section>
);
}
export {
  HomePage
}

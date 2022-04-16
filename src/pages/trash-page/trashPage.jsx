import "../home-page/home-page.css";
import "../../components/SideNav/side-nav.css";
import {SideNav,Note, NoteOverlay} from '../../components/index';
import {useData} from "../../context/DataContext";
function TrashPage(){
  const {state}= useData();
  return(
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
       <h1>Trash</h1>
       <Note data={state.trash} type="TRASH"/>
    </article>
    <NoteOverlay/>
   </section>
   </section>
 );
}

export {TrashPage}

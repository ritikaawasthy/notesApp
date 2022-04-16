import "../home-page/home-page.css";
import "../../components/SideNav/side-nav.css";
import {SideNav,Note, NoteOverlay} from '../../components/index';
import {useData} from "../../context/DataContext";
function ArchivePage(){
  const {state, dispatch} = useData();
  return(
  <section>
    <section className="homepage-layout-container secondary-light-bg">
    <article className="homepage-layout-side">
      <SideNav/>
    </article>
    <article className="homepage-layout-main">
      <h1>Archive</h1>
        <Note data={state.archives}/>
    </article>
    <NoteOverlay/>
  </section>
  </section>
)
}
export {ArchivePage}

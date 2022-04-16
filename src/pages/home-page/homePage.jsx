import "./home-page.css";
import {SideNav, Note, NoteOverlay} from '../../components/index';
import {useData} from "../../context/DataContext";
function HomePage() {
  const {state}= useData()
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
      <Note data={state.notes}/>

   </article>
   <NoteOverlay/>
   </section>
</section>
);
}
export {
  HomePage
}

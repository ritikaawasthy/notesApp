import "../home-page/home-page.css";
import {SideNav, Note, NoteOverlay} from '../../components/index';
function LabelsPage() {
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
      <Note type="label"/>

   </article>
   <NoteOverlay/>
   </section>
</section>
);
}
export {
  LabelsPage
}

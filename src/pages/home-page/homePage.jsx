import "./home-page.css";
import {SideNav} from '../../components/index'
function HomePage() {
  return (<section className="homepage-layout-container secondary-light-bg">
    <article className="homepage-layout-side">
      <SideNav/>
    </article>
    <article className="homepage-layout-main"></article>
  </section>);
}
export {
  HomePage
}

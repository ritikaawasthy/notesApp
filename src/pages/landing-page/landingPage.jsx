import "./landing-page.css";
import {hero} from "../../media/index";
function LandingPage() {
  return (<section className="page-container">
    <section className="landing-section">
      <article className="grid-two-layout-container ">
        <div className="landing-text-container grid-two-layout-left">
          <article className="landing-text-content">
            <div>
              <h1 className="theme-heading secondary-col">Top<span className="head-span primary-col">Note</span>
              </h1>
              <hr className="primary-border"></hr>
            </div>
            <div>
              <h4 className='fw-bb'>Meet your mordern</h4>
              <h3 className="primary-very-light-col">Note taking app</h3>
            </div>
            <p className="f-m">Manage your daily tasks and workflow in a modern wayand boost your efficiency with minimal efforts</p>
            <a type="button" className="btn primary-bg f-m center-txt">Get Started</a>
          </article>
        </div>
        <div className="grid-two-layout-right">
          <img src={hero}></img>
        </div>
      </article>
    </section>
  </section>);
}
export {
  LandingPage
}

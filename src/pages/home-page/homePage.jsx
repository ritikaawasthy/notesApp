import "./home-page.css";
import {SideNav} from '../../components/index';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPaintbrush, faEdit, faArchive, faTrash} from '@fortawesome/free-solid-svg-icons';
import {useState} from "react";
import {useParams} from "react-router-dom";

function HomePage() {
  const actionType= useParams();
  
  return (<section className="homepage-layout-container secondary-light-bg">
    <article className="homepage-layout-side">
      <SideNav addNode={setNote}/>
    </article>
    <article className="homepage-layout-main">
      <div class="input-container primary-col">
        <input placeholder=" " className="input f-m w-full"></input>
        <label className="input-label f-m">Search</label>
      </div>
      <div className="card card-shadow w-xxl white-bg note">
        <div className="card-content stacked">
            <div class=" primary-col">
              <h2>Note Heading</h2>
              <hr className="w-full"></hr>
            </div>
          <p className="note-body f-m">
            The internet is a hostile environment. Before deploying your Django project, you should take some time to review your settings, with security, performance, and operations in mind.
              Django includes many security features. Some are built-in and always enabled. Others are optional because they aren’t always appropriate, or because they’re inconvenient for development. For example, forcing HTTPS may not be suitable for all websites, and it’s impractical for local developmentty, performance, and operations in mind.
                Django includes many security features. Some are built-in and always enabled. Others are optional because they aren’t always appropriate, or because they’re inconvenient for development. For example, forcing HTTPS may not be suitable for all websites, and it’s impractical for local development.
          </p>
          <div className="note-footer end">
              <FontAwesomeIcon icon={faPaintbrush}></FontAwesomeIcon>
              <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
              <FontAwesomeIcon icon={faArchive}></FontAwesomeIcon>
              <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
          </div>
        </div>
      </div>
    </article>
  </section>);
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

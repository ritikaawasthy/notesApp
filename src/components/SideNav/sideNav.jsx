import "./side-nav.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHouse, faTag, faBoxArchive, faTrash} from '@fortawesome/free-solid-svg-icons';

function SideNav(props) {
  return (<ul class="f-m side-nav ">
    <li className='container'>
        <FontAwesomeIcon className="mg-r-s" icon={faHouse}></FontAwesomeIcon>
        <p>Home</p>
    </li>
    <li className='container'>
      <FontAwesomeIcon className="mg-r-s" icon={faTag}></FontAwesomeIcon>
      <p>Label</p>
     </li>
    <li className='container'>
      <FontAwesomeIcon className="mg-r-s" icon={faBoxArchive}></FontAwesomeIcon><p>Archive</p></li>
    <li className='container'>
      <FontAwesomeIcon className="mg-r-s" icon={faTrash}></FontAwesomeIcon><p>Trash</p></li>
    <a className="btn primary-bg side-nav-btn center-txt">Create Note</a>
  </ul>);
}

export {
  SideNav
}

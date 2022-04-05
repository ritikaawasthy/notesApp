import "./navbar.css";

function NavBar(){
  return(
    <header className="page-head">
      <nav className="nav primary-bg">
      <h4>Top<span className="primary-very-light-col">Note</span></h4>
        <ul className="list list-inline f-l">
          <li>Home</li>
        </ul>
      </nav>
    </header>
  )
}

export{NavBar}

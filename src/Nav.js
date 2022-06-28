import logo from './logo.svg';

function Nav(){
    return(
      
        <nav className="Nav">
               <div className='imgItem'>
                <img className='img' src={logo} alt='Logo'/>
            </div>
              <div className='rightNav'>
                 <h1>React-Course Project-1</h1>
              </div>
        </nav>

    )
}




export default Nav;

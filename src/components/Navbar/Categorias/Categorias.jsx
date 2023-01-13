import { Link } from "react-router-dom";
const Categorias = () => {
    return ( 
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-link">
                        <button className='btn btn-secondary'><Link className="nav-link" to={"/"}>INSTITUTO ALFA</Link></button>
                </li>
                <li className="nav-link">
                    
                        <button className='btn btn-secondary'><Link className="nav-link" to={"/category/Salud"}>SALUD</Link></button>
                    
                </li>
                <li className="nav-link">
                    
                        <button className='btn btn-secondary'><Link className="nav-link" to={"/category/Idiomas"}>IDIOMAS</Link></button>
                    
                </li>
                <li className="nav-link">
               
                        <button className='btn btn-secondary'><Link className="nav-link" to={"/category/Computacion"}>COMPUTACION</Link></button>
                    
                </li>
                
            </ul>

    );
}

export default Categorias;
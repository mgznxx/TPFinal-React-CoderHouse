import { Link } from "react-router-dom";
import { useDarkModeContext } from "../../context/DarkModeContext";
const Item = ({prod}) => {

    const {darkMode} = useDarkModeContext()
    return (
        <div className='card mb-3 cardProducto border-light'>
                        <img src={`${prod.img}`}className="card-img-top" alt="..." />
                        <div className={`card-body ${darkMode ? `cardBodyDark` : 'cardBody'}`}>
                            <h5 className="card-title">{prod.nombre} </h5>
                            <p className="card-text">Duracion: {prod.marca}</p>
                            <p className="card-text">Precio: ${new Intl.NumberFormat('de-DE').format(prod.precio)}</p>
                            <button className='btn btn-info'><Link className="nav-link" to={`/products/${prod.id}`}>Ver Curso</Link></button>
                        </div>
        </div>
    );
}

export default Item;
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProducto } from "../../assets/firebase";
import { consultarProducto } from "../../assets/funciones";
import { useDarkModeContext } from "../../context/DarkModeContext";
import ItemDetail from "../ItemDetail/ItemDetail";
const ItemDetailContainer = () => {
    const [producto, setProducto] = useState([]);
    const {id} = useParams()
    const {darkMode} = useDarkModeContext()

    useEffect(() => {
        getProducto(id).then(prod => setProducto(prod))
        
        
    }, []);

    return (
        <div className="card mb-3 container itemDetail">
            <ItemDetail item={producto} />
        </div>
    );


}

export default ItemDetailContainer;
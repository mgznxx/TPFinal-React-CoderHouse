import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import ItemList from '../ItemList/ItemList';
 
import { getProductos, getProducto, updateProducto, cargarBDD } from '../../assets/firebase';
const ItemListContainer = () => {
    //cargarBDD();
    const [productos, setProductos] = useState([]);
    const {category} = useParams();

    useEffect(() => {
        if (category){
            getProductos().then(products => {
            const productList  = products.filter(prod => prod.stock > 0).filter(prod=> prod.idCategoria===category);
            const cardProductos = ItemList({productList})
            setProductos(cardProductos);
            });
        }else{
            getProductos().then(products => {
            const productList  = products.filter(prod => prod.stock > 0);
            const cardProductos = ItemList({productList})
            setProductos(cardProductos); 
        });
    }
    //cargarBDD().then(msj => console.log(msj))
    }, [category]);
    return (
        <div className= 'row cardProductos' >
            {productos}
        </div>
    );
}

export default ItemListContainer;
import Item from "../Item/Item";

const ItemList = ({productList}) => {
    console.log (productList)
    return (
        <>
            {productList.map(producto => <Item key={producto.id} prod = {producto}/>)}
        </>
    );
}

export default ItemList;
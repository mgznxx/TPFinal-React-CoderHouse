 import { initializeApp } from "firebase/app";
 import {getFirestore, addDoc, getDocs, getDoc, updateDoc, deleteDoc,collection, doc} from 'firebase/firestore'
 
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "final-react---2023.firebaseapp.com",
  projectId: "final-react---2023",
  storageBucket: "final-react---2023.appspot.com",
  messagingSenderId: "1070546442116",
  appId: "1:1070546442116:web:51847e91953a2a3841afd1"
};

 
const app = initializeApp(firebaseConfig);

const db = getFirestore()

const cargarBDD = async () => {
    const promise = await fetch('./json/productos.json')
    const productos = await promise.json()
    productos.forEach(async (prod) =>{
        await addDoc(collection(db, "productos"), {
            idCategoria: prod.idCategoria,
            nombre: prod.nombre,
            marca: prod.marca,
            modelo: prod.modelo,
            stock: prod.stock,
            precio: prod.precio,
            img: prod.img

        })
    })
        
    }

    const getProductos = async() => {
        const productos = await getDocs(collection(db, "productos"))
        const items = productos.docs.map(prod => {
            return {...prod.data(), id: prod.id}
        })
        return items
    }
    
    const getProducto =  async (id) => {
        const producto = await getDoc(doc(db, "productos", id))
        const item = {...producto.data(), id: producto.id}
        return item
    }
    
    const updateProducto = async (id, info) => {
        const estado = await updateDoc(doc(db,"productos", id), info)
        return estado
    }
    
    const deleteProducto = async(id) =>{
        const estado = await deleteDoc(doc(db, "productos", id))
        return estado
    }
    
    const createOrdenCompra = async (cliente, preTotal, fecha ) => {
        const ordenCompra = await addDoc(collection(db, "ordenCompra"),{
            nombreCompleto: cliente.nombreCompleto,
            dni: cliente.DNI,
            celular: cliente.celular,
            direccion: cliente.direccion,
            email: cliente.email,
            fecha: fecha,
            precioTotal: preTotal
        })
    
        return ordenCompra
    }
    
    const getOrdenCompra =  async (id) => {
        const ordenCompra = await getDoc(doc(db, "ordenCompra", id))
        const item = {...ordenCompra.data(), id: ordenCompra.id}
        return item
    }
    
    export {cargarBDD, getProductos, getProducto, updateProducto, deleteProducto, createOrdenCompra, getOrdenCompra}

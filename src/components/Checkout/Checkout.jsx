import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrdenCompra, getOrdenCompra, getProducto, updateProducto } from '../../assets/firebase';
import { useCarritoContext } from '../../context/CarritoContex';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';


const Checkout = () => {
    const initialValues={nombreCompleto: "", email: "", validateEmail: "", DNI: "", celular: "", direccion: ""}
    const [formValues, setFormValues]=useState(initialValues);
    const [formErrors, setFormErrors]=useState({});
    const [isSubmit, setIsSubmit] = useState(false);    
    const {totalPrice, carrito, emptyCart} = useCarritoContext()
    const datosFormulario = React.useRef()
    let navigate = useNavigate()
    //Realizo un check antes de completar el formulario por si no hay stock, por mas comodidad para el usuario
    const checkCarritoVacio = [...carrito]
    checkCarritoVacio.forEach(prodCarrito => {
        getProducto(prodCarrito.id).then(prodBDD => {
            if(prodBDD.stock < prodCarrito.cant) {
                toast.error(`El producto ${prodBDD.nombreAMostrar} no tiene stock, le devolvimos al inicio para que siga comprando`);                    
                emptyCart();
                navigate("/")                          
            }
        })            
    })

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            consultarFormulario();
        }
      }, [formErrors]);


    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        e.target.reset()
    };

    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const validate = (values)=>{
        const errors ={};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;      
        //Errores de nombre y apellido (que no los ingrese)
        if (!values.nombreCompleto) {
            errors.nombreCompleto = "El nombre y apellido son necesarios";
        }
        //Errores del email (que no lo ingrese, que no sea valido)
        if (!values.email) {
            errors.email = "El email es requerido";
        } else if (!regex.test(values.email)) {
            errors.email = "Ese no es un formato valido de email";
        }
        //Errores del email a validar (que no lo ingrese, que no sea valido, que no sea el mismo, que no sea valido podria borrarse ya que si es valido el primero solo con que sea igual ya es valido)
        if (!values.validateEmail){
            errors.validateEmail = "Debe ingresar nuevamente el email";            
        }else if (!regex.test(values.validateEmail)) {
            errors.validateEmail = "Ese no es un formato valido de email";
        }else if (values.validateEmail!==values.email){
            errors.validateEmail = "Los emails no coinciden";
        }
        //Errores del DNI (que no lo ingrese, ya que sea un numero me aseguro dandole el tipo "number" al input)
        if (!values.DNI){
            errors.DNI="Debe ingresar su DNI";
        }
        //Errores del Celular (idem DNI)
        if (!values.celular){
            errors.celular="Debe ingresar su celular";
        }
        //Errores de la dirección (Que no la ingrese)
        if (!values.direccion){
            errors.direccion="Debe ingresar su direccion";
        }
        return errors;
    };



    const consultarFormulario = (e) => {
        const datForm = new FormData(datosFormulario.current)
        const cliente = Object.fromEntries(datForm)
        const aux = [...carrito]
        aux.forEach(prodCarrito => {
            getProducto(prodCarrito.id).then(prodBDD => {
                if(prodBDD.stock >= prodCarrito.cant) {
                    prodBDD.stock -= prodCarrito.cant
                    updateProducto(prodCarrito.id, prodBDD)                    
                } else {
                    toast.error(`El producto ${prodBDD.nombreAMostrar} no tiene stock`);                    
                    emptyCart();
                    navigate("/")                      
                }
            })            
        })

        delete cliente["validateEmail"];

        createOrdenCompra(cliente,totalPrice(), new Date().toISOString().slice(0,10)).then(ordenCompra => {
            getOrdenCompra(ordenCompra.id).then(item => {
                toast.success(`¡Muchas gracias por su compra, su orden es ${item.id}`,)                  
                emptyCart() 
                //e.target.reset()             
                navigate("/")
                

                
            }).catch(error => {
                toast.error("Su orden no fue generada con exito")
                console.error(error)
            })                
        })

    }

    return (
        <div className="container espaciadoNav">
            <form onSubmit={handleSubmit} ref={datosFormulario}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre y Apellido</label>
                    <input type="text" className="form-control" name="nombreCompleto"  value={formValues.nombreCompleto} onChange={handleChange}/>
                    <p className='colorMensajeCheckout'>{formErrors.nombreCompleto}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" className="form-control" name="email" value={formValues.email} onChange={handleChange}/>
                    <p className='colorMensajeCheckout'>{formErrors.email}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="email2" className="form-label">Repetir Email</label>
                    <input type="text" className="form-control" name="validateEmail" value={formValues.validateEmail} onChange={handleChange}/>
                    <p className='colorMensajeCheckout'>{formErrors.validateEmail}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="dni" className="form-label">DNI</label>
                    <input type="number" className="form-control" name="DNI" value={formValues.DNI} onChange={handleChange}/>
                    <p className='colorMensajeCheckout'>{formErrors.DNI}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="celular" className="form-label">Celular</label>
                    <input type="number" className="form-control" name="celular" value={formValues.celular} onChange={handleChange}/>
                    <p className='colorMensajeCheckout'>{formErrors.celular}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="direccion" className="form-label">Dirección</label>
                    <input type="text" className="form-control" name="direccion"  value={formValues.direccion} onChange={handleChange}/>
                    <p className='colorMensajeCheckout'>{formErrors.direccion}</p>
                </div>
                <button type="submit" className="btn btn-primary">Finalizar Compra</button>
            </form>

        </div>
    );
}

export default Checkout;
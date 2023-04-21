import React, { useState, useEffect }from 'react'
import { Link } from 'react-router-dom'
import {collection, getDocs, getDoc, deleteDoc, doc} from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MysSwal = withReactContent(Swal)


const Show = () => {
//1 - van los hooks
const [products, SetProducts] = useState( [] )
//2 - referenciamos a la database db de firestore
const productsCollection= collection(db, "products")  
//3 -  se cres la funcion para mostrar todos los documentos
const getProducts =async  ()  => {
  const data = await getDocs(productsCollection)
//console.log(data.docs)
SetProducts(
data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
 )
 //console.log(products)
}
//4 - funcion para eliminar un documento 
    const deleteProduct = async (id) =>{
        const productDoc = doc(db, "products", id)
        await deleteDoc(productDoc)
        getProducts()
    }
//5 - se crea una funcion de confirmacion para Sweet Alert 2
const confirmDelete = (id) =>{
    Swal.fire({
        title: '¿Eliminar producto?',
        text: "No podrás revertir esto.!",
        icon: 'advertencia',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'si, eliminarlo!!'
      }).then((result) => {
        if (result.isConfirmed) {
            deleteProduct(id)
          Swal.fire(
            'Eliminado!',
            'Su archivo ha sido eliminado:)',
            'éxito!'
          )
        }
      })
}
//6 - usamos  useEffect
useEffect( ()  =>{
     getProducts()
     //eslint-disable-next-line
}, [] )
//7 - devolvemos vista de nuestro componente
  return (
     <>
 <div className='container'>
    <div className='row'>
        <div className='col'>
            <div className="d-grid gap-2">
                <Link to="/create" className='btn btn-secondary mt-2 mb-2'>Create</Link>
                </div>

                <table className='table table-dark table-hover'>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { products.map( (product) => (
                            <tr key={product.id}>
                                <td>{product.description}</td>
                                <td>{product.stock}</td>
                                <td>
                                    <Link to={' /edit/${product.id}'} className="btn btn-light"><i className="fa-solid fa-pencil"></i></Link>
                                    <button onClick={ () => { confirmDelete(product.id) } } className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        ) ) }

                    </tbody>

                </table>
            </div>
            </div>
            </div>
            </>
    )

}

export default Show
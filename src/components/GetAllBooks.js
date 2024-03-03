import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import styled from 'styled-components';



const Title = styled.h1`
    text-align: center;
`;

const Card = styled.div`
    width: 18rem;
`;



export default function GetBooks() {
    //used for response home
    const [items, setItems] = useState();
    const [id, setId] = useState('');
    // used for modifying a book
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [year, setYear] = useState(0);
    const [editorial, setEditorial] = useState('');
    const [price, setPrice] = useState(0);
    const [cover, setCover] = useState('');
    const [modify, setModify] = useState(0);
       
    const handleSubmit = () => {
        let dataRequest = `{
            "id": "${id}"
        }`;
        console.log(dataRequest)


        try{
            fetch('http://localhost:3002/api/deleteBook', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: dataRequest
            })
            .then((res) => res.json())
            .then((res) => {
               console.log(res)
               window.location.reload(true);
            })
        } catch(err) {
            console.error('Something went wrong /addBook', err);
        }

    };

    useEffect(()=> {
        const fetchItems = async ()=> {
            try {
                const response = await fetch('http://localhost:3002/api/getBooks');
                const data = await response.json();
                setItems(data)
                console.log(data);
            } catch(err) {
                console.error('Something went wrong /getBooks', err)
            }
        }

        fetchItems()
    }, [])
    return (
        <div>
            
            <Title>Books</Title>
            <div className='container'>
                        {items&&<div className='row'>{items.map(item => (
                           <div className='col-4' key={item.id}>
                            <Card className="card" key={item.id}>
                                <img src={item.cover} className="card-img-top" alt="..."/>
                                <div className="card-body">
                                    <h5 className="card-title">{item.nombre}</h5>
                                    <p className="card-text"> Author:  {item.autor} </p>
                                    <p className='card-text'> Editorial:  {item.editorial}</p>
                                    <button type='submit' onClick={(event) => setId(item.id)} data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="btn btn-outline-danger">Delete</button>
                                    <button type='submit' onClick={(event) => setModify(items.indexOf(item))} data-bs-toggle="modal" data-bs-target="#staticBackdropModify" className="btn btn-outline-primary">Details</button>
                                </div>
                            </Card>
                            
                            </div>
                            
                        ))}
                        </div>
                        }

                            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Response</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <p>Do you want to delete this record?</p>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-outline-warning" data-bs-dismiss="modal">No</button>
                                            <button onClick={handleSubmit} type="button" className="btn btn-outline-success" data-bs-dismiss="modal">Yes!</button>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                            
                                    {items&&<div className="modal fade" id="staticBackdropModify" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Details of the book</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                {modify>=0&&<div className="modal-body">
                                                    <form>
                                                       <div className="col-auto">
                                                            <label className="form-label">Name</label>
                                                        </div>
                                                        <div className="col-auto">
                                                            <input className="form-control" onChange={(event) => setName(event.target.value)} value={items[modify].nombre} id="nombre" type="text" placeholder="Type book name..." ></input>
                                                        </div>
                                                    
                                                        <div className="col-auto">
                                                            <label className="form-label" >Author</label>
                                                        </div>
                                                        <div className="col-auto">
                                                            <input className="form-control"  onChange={(event) => setAuthor(event.target.value)} value={items[modify].autor}  id="autor" type="text" placeholder="Type book author..." ></input>
                                                        </div>
                                                        <div className="col-auto">
                                                            <label className="form-label" >Publication Year</label>
                                                        </div>
                                                        <div className="col-auto">
                                                            <input className="form-control"  onChange={(event) => setYear(event.target.value)} value={items[modify].year_publicacion}  id="year_publicacion" type="number" placeholder="Type book year..." ></input>
                                                        </div>
                                                        <div className="col-auto">
                                                            <label className="form-label" >Editorial</label>
                                                        </div>
                                                        <div className="col-auto">
                                                            <input className="form-control"  onChange={(event) => setEditorial(event.target.value)} value={items[modify].editorial}  id="editorial" type="text" placeholder="Type book editorial..."></input>
                                                        </div>
                                                        <div className="col-auto">
                                                            <label className="form-label" >Price</label>
                                                        </div>
                                                        <div className="col-auto">
                                                            <input className="form-control" onChange={(event) => setPrice(event.target.value)} value={items[modify].precio}  id="precio" type="number" placeholder="Type book price..."></input>
                                                        </div> 
                                                        <div className="col-auto">
                                                            <label className="form-label" >Cover Image</label>
                                                        </div>
                                                        <div className="col-auto">
                                                            <input className="form-control" onChange={(event) => setCover(event.target.value)} value={items[modify].cover}  id="cover" type="url" placeholder="Type book cover img..."></input>
                                                        </div>
                                                    </form>
                                                    
                                                </div>}
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-outline-warning" data-bs-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div> }
                            

            </div> 

                

               
        </div>
    )
}


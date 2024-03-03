import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import styled from 'styled-components';


const Container = styled.div`
    margin: 20px;
    border: 2px;
`;


export default function SetBook() {
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [year, setYear] = useState('');
    const [editorial, setEditorial] = useState('');
    const [price, setPrice] = useState('');
    const [cover, setCover] = useState('');
    const [response, setResponse] = useState([]);


    const handleSubmit = () => {
        let dataRequest = `{
            "nombre": "${name}",
            "autor": "${author}",
            "year_publicacion": ${year},
            "editorial": "${editorial}",
            "precio": ${price},
            "cover": "${cover}"
            }`;

        if(name !== '' && author !== '' && year !== 0 && editorial !== '' && price !== 0 && cover !== ''){
            console.log('Correct value')
            let dataRequest = `{
                    "nombre": "${name}",
                    "autor": "${author}",
                    "year_publicacion": ${year},
                    "editorial": "${editorial}",
                    "precio": ${price},
                    "cover": "${cover}"
            }`;
           

            try {
                fetch('http://localhost:3002/api/addBook', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: dataRequest
                })
                .then((res) => res.json())
                .then((res) => {
                    setResponse(res)
                   console.log(res)
                })
            } catch(err) {
                console.error('Something went wrong /addBook', err);
            }

        } else {
            console.error('Undefined value')
            setResponse({"status":"Please fill all the values"});
            console.log(dataRequest)
        }

        
    };

    return (
       
        <Container className="row g-3 align-items-center" >
            <div className="col-auto">
                <label className="form-label">Name</label>
            </div>
            <div className="col-auto">
                <input className="form-control" onChange={(event) => setName(event.target.value)} value={name} id="name" type="text" placeholder="Type book name..." required></input>
            </div>
           
            <div className="col-auto">
                <label className="form-label" >Author</label>
            </div>
            <div className="col-auto">
                <input className="form-control"  onChange={(event) => setAuthor(event.target.value)} value={author}  id="author" type="text" placeholder="Type book author..." required></input>
            </div>
            <div className="col-auto">
                <label className="form-label" >Publication Year</label>
            </div>
            <div className="col-auto">
                <input className="form-control"  onChange={(event) => setYear(event.target.value)} value={year}  id="year" type="number" placeholder="Type book year..." required></input>
            </div>
            <div className="col-auto">
                <label className="form-label" >Editorial</label>
            </div>
            <div className="col-auto">
                <input className="form-control"  onChange={(event) => setEditorial(event.target.value)} value={editorial}  id="editorial" type="text" placeholder="Type book editorial..."></input>
            </div>
            <div className="col-auto">
                <label className="form-label" >Price</label>
            </div>
            <div className="col-auto">
                <input className="form-control" onChange={(event) => setPrice(event.target.value)} value={price}  id="price" type="number" placeholder="Type book price..."></input>
            </div> 
            <div className="col-auto">
                <label className="form-label" >Cover Image</label>
            </div>
            <div className="col-auto">
                <input className="form-control" onChange={(event) => setCover(event.target.value)} value={cover}  id="cover" type="url" placeholder="Type book cover img..."></input>
            </div>
            <div className="col-auto">
                <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" type="submit" className="btn btn-outline-primary" onClick={handleSubmit}>Submit</button>
            </div>
               
                    {response&&<div>
                        
                        
                        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Response</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <p>Set record status: {response.status}</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button"  className="btn btn-outline-primary" data-bs-dismiss="modal">Understood</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>}

        </Container>
        
    )
}
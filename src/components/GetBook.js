import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import styled from 'styled-components';

const Container = styled.div`
    margin: 20px

`;

const Card = styled.div`
    width: 18rem;
    margin:20px;
`;

const CardContainer = styled.div`
    left: 30%;
    position: relative;


`;


export default function GetBookName(){
    const [name, setName] = useState();
    const [searchResult, setSearchResult] = useState([]);


    const handleSubmit = () => {
        try{
            fetch(`http://localhost:3002/api/getBookName/${name}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0 ) {
                    setSearchResult(data)                    
                } else {
                    setSearchResult(-1)
                }
                console.log(data)

            })
        }catch(err) {
            console.error('Something went wrong /getBook', err);
        }
    }
    

    return(
        <Container className='row g-3 align-items-center'>
            <div className='col-auto'>
                <label className='form-label'>Type book name:</label>
            </div>
            <div className='col-auto'>
                <input className='form-control' onChange={(event) => setName(event.target.value)} id="name" type="string" placeholder="Type book name..."></input>
            </div>
            <div className='col-auto'>
                <button className='btn btn-outline-primary' type="submit" onClick={handleSubmit}>Submit</button>
            </div>

            <CardContainer className='container'>
                {searchResult.length>0&&
                        <div className='col-4' key={searchResult[0].id}>
                                <Card className="card" key={searchResult[0].id}>
                                    <img src={searchResult[0].cover} className="card-img-top" alt="..."/>
                                    <div className="card-body">
                                        <h5 className="card-title">{searchResult[0].nombre}</h5>
                                        <p className="card-text"> Author:  {searchResult[0].autor} </p>
                                        <p className='card-text'> Editorial:  {searchResult[0].editorial}</p>
                                        <p className='card-text'> Precio:  {searchResult[0].precio} dolares</p>
                                        <p className='card-text'> Año de publicación:  {searchResult[0].year_publicacion}</p>


                                    </div>
                                </Card>
                        </div>

                    }

                    {searchResult===-1&&
                    <div className='col-4' >
                    <Card className="card" >
                        <div className="card-body">
                            <h5 className="card-title">Error</h5>
                            <p className="card-text"> No se encontró nada. </p>

                        </div>
                    </Card>
            </div>}
                
           </CardContainer>
        </Container>

        
    )
}
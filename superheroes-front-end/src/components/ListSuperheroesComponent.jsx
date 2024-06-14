import React, {useEffect, useState} from "react"
import { createSuperhero, deleteSuperhero, listSuperheroes } from "../services/SuperheroService"
import { useNavigate } from "react-router-dom"


function ListSuperheroesComponent() {

    const [superheroes, setSuperheroes] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        getAllSuperheroes();
    }, [])

    function getAllSuperheroes() {
        listSuperheroes().then((response) => {
            setSuperheroes(response.data);
        }).catch(error => {
            console.error(error);
        })
    }
    function addSuperhero() {navigator("/create-superhero")}
    function updateSuperhero(id) {navigator(`/update-superhero/${id}`)}
    function removeSuperhero(id) {
        console.log(id);
        deleteSuperhero(id).then((response) => {
            getAllSuperheroes();
        }).catch(error => {console.error(error);})
    }
    function listOfPowers() {navigator("/powers")}

    return (
        <div className="container">
            <h2 className="text-center">List of Superheroes</h2>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Type ID</th>
                        <th>Name</th>
                        <th>Alias</th>
                        <th>Creation Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        superheroes.map(superhero => 
                            <tr key={superhero.id}>
                                <td>{superhero.id}</td>
                                <td>{superhero.typeId}</td>
                                <td>{superhero.name}</td>
                                <td>{superhero.alias}</td>
                                <td>{superhero.creationDate}</td>
                                <td>
                                    <button className="btn btn-info" onClick={() => updateSuperhero(superhero.id)}>Update</button>
                                    <button className="btn btn-danger" onClick={() => removeSuperhero(superhero.id)} 
                                    style={{marginLeft: '10px'}}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                    <tr>

                    </tr>
                </tbody>
            </table>
            <button className="btn btn-primary mb-2" onClick={addSuperhero}>Create a Superhero</button>
            <button className="btn btn-primary mb-2" onClick={listOfPowers} style={{marginLeft: '10px'}}>List of Powers</button>
        </div>
    )
}

export default ListSuperheroesComponent
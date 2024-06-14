import React, {useEffect, useState} from "react";
import { createSuperhero, getSuperhero, updateSuperhero } from "../services/SuperheroService";
import { useNavigate, useParams } from "react-router-dom";
 
const SuperheroComponent = () => {

    const [typeId, setTypeId] = useState('')
    const [name, setName] = useState('')
    const [alias, setAlias] = useState('')
    const [creationDate, setCreationDate] = useState('')
    const navigator = useNavigate();
    const {id} = useParams();

    const [errors ,setErrors] = useState({
        typeId: '',
        name: '',
        alias: '',
        creationDate: '',
    })

    function handleTypeId(element) {
        setTypeId(element.target.value);
    }
    function handleName(element) {
        setName(element.target.value);
    }
    function handleAlias(element) {
        setAlias(element.target.value);
    }
    function handleCreationDate(element) {
        setCreationDate(element.target.value);
    }
    useEffect(() => {
        if(id) {getSuperhero(id).then((response) => {
            setTypeId(response.data.typeId);
            setName(response.data.name);
            setAlias(response.data.alias);
            setCreationDate(response.data.creationDate);
        }).catch(error => {console.error(error);})}
    }, [id])

    function saveOrUpdateSuperhero(element) {
        element.preventDefault();

        const Superhero = {typeId, name, alias, creationDate};
        console.log(Superhero);

        if(validateForm()) {
            if(id) {
                updateSuperhero(id, Superhero).then((response) => {
                    console.log(response.data);
                    navigator('/');
                }).catch(error => {console.error(error);})
            } else {

            createSuperhero(Superhero).then((response) => {
            console.log(response.data);
            navigator('/');
            }).catch(error => {console.error(error);})
            }
        }
    }
    function validateForm() {
        let valid = true;

        const errorsCopy = {... errors}

        if(typeId.trim()) {
            errorsCopy.typeId = '';
        } else {
            errorsCopy.typeId = 'Type ID is required';
            valid = false;
        }
        if(name.trim()) {
            errorsCopy.name = '';
        } else {
            errorsCopy.name = 'Name is required';
            valid = false;
        }
        if(alias.trim()) {
            errorsCopy.alias = '';
        } else {
            errorsCopy.alias = 'Alias is required';
            valid = false;
        }
        if(creationDate.trim()) {
            errorsCopy.creationDate = '';
        } else {
            errorsCopy.creationDate = 'Creation Date is required';
            valid = false;
        }
        setErrors(errorsCopy);
        return valid;
    }
    function pageTitle() {
        if(id){
            return <h2 className="text-center">Update Superhero</h2>
        } else {
            return <h2 className="text-center">Add Superhero</h2>
        }
    }

    return (
        <div className="container">
            <br/> <br/>
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    {pageTitle()}
                    <div className="card-body">
                        <form>

                        <div className="form-group mb-2">
                                <label className="form-label">Type ID:</label>
                                <input type="text" placeholder="Enter Type ID" name="typeId" value={typeId} className={`form-control 
                                ${errors.typeId ? 'is-invalid': ''}`}
                                onChange={handleTypeId}>

                                </input>
                                {errors.typeId && <div className="invalid-feedback">{errors.typeId}</div>}
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Name:</label>
                                <input type="text" placeholder="Enter Superhero's Name" name="name" value={name} className={`form-control 
                                ${errors.name ? 'is-invalid': ''}`}
                                onChange={handleName}>

                                </input>
                                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Alias:</label>
                                <input type="text" placeholder="Enter an Alias" name="alias" value={alias} 
                                className={`form-control ${errors.alias ? 'is-invalid': ''}`} onChange={handleAlias}>

                                </input>
                                {errors.alias && <div className="invalid-feedback">{errors.alias}</div>}
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Creation Date:</label>
                                <input type="date" placeholder="Enter Creation Date" name="creationDate" value={creationDate} 
                                className={`form-control ${errors.creationDate ? 'is-invalid': ''}`} onChange={handleCreationDate}>

                                </input>
                                {errors.creationDate && <div className="invalid-feedback">{errors.creationDate}</div>}
                            </div>

                            <button className="btn btn-success" onClick={saveOrUpdateSuperhero}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuperheroComponent
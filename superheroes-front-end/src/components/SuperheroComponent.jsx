import React, {useState} from "react";
import { createSuperhero } from "../services/SuperheroService";

const SuperheroComponent = () => {

    const [id, setID] = useState('')
    const [name, setName] = useState('')
    const [superhero, setSuperhero] = useState('')
    const [age, setAge] = useState('')
    const [description, setDescription] = useState('')

    const [errors ,setErrors] = useState({
        id: '',
        name: '',
        superhero: '',
        age: '',
        description: ''
    })

    function handleID(element) {
        setID(element.target.value);
    }
    function handleName(element) {
        setName(element.target.value);
    }
    function handleSuperhero(element) {
        setSuperhero(element.target.value);
    }
    function handleAge(element) {
        setAge(element.target.value);
    }
    function handleDescription(element) {
        setDescription(element.target.value);
    }
    function saveSuperhero(element) {
        element.preventDefault();

        if(validateForm()) {
            const Superhero = {name, superhero, age, description, id};
            console.log(Superhero);

            createSuperhero(Superhero).then((response) => {
            console.log(response.data)
            })
        }
    }
    function validateForm() {
        let valid = true;

        const errorsCopy = {... errors}

        if(id.trim()) {
            errorsCopy.id = '';
        } else {
            errorsCopy.id = 'ID is required';
            valid = false;
        }
        if(name.trim()) {
            errorsCopy.name = '';
        } else {
            errorsCopy.name = 'Name is required';
            valid = false;
        }
        if(superhero.trim()) {
            errorsCopy.superhero = '';
        } else {
            errorsCopy.superhero = 'Superhero is required';
            valid = false;
        }
        if(age.trim()) {
            errorsCopy.age = '';
        } else {
            errorsCopy.age = 'Age is required';
            valid = false;
        }
        if(description.trim()) {
            errorsCopy.description = '';
        } else {
            errorsCopy.description = 'Description is required';
            valid = false;
        }
        setErrors(errorsCopy);
        return valid;
    }

    return (
        <div className="container">
            <br/> <br/>
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    <h2 className="text-center">Add Superhero</h2>
                    <div className="card-body">
                        <form>

                        <div className="form-group mb-2">
                                <label className="form-label">ID:</label>
                                <input type="number" placeholder="Enter ID" name="id" value={id} className={`form-control 
                                ${errors.id ? 'is-invalid': ''}`}
                                onChange={handleID}>

                                </input>
                                {errors.id && <div className="invalid-feedback">{errors.id}</div>}
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
                                <label className="form-label">Superhero:</label>
                                <input type="text" placeholder="Enter base Superhero" name="superhero" value={superhero} 
                                className={`form-control ${errors.superhero ? 'is-invalid': ''}`} onChange={handleSuperhero}>

                                </input>
                                {errors.superhero && <div className="invalid-feedback">{errors.superhero}</div>}
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Age:</label>
                                <input type="text" placeholder="Enter age" name="age" value={age} 
                                className={`form-control ${errors.age ? 'is-invalid': ''}`} onChange={handleAge}>

                                </input>
                                {errors.age && <div className="invalid-feedback">{errors.age}</div>}
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Description:</label>
                                <input type="text" placeholder="Enter a description" name="description" value={description} 
                                className={`form-control ${errors.description ? 'is-invalid': ''}`} onChange={handleDescription}>

                                </input>
                                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                            </div>
                            <button className="btn btn-success" onClick={saveSuperhero}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuperheroComponent
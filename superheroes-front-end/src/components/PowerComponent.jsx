import React, { useEffect, useState } from "react";
import { addPower, getPower, updatePower } from "../services/PowerService";
import { useNavigate, useParams } from "react-router-dom";

const PowerComponent = () => {
    const [power, setPower] = useState('');
    const [dateAcquisitionPower, setDateAcquisitionPower] = useState('');
    const [state, setState] = useState('');
    const [powerLevel, setPowerLevel] = useState('');
    const navigator = useNavigate();
    const { id } = useParams();

    const [errors, setErrors] = useState({
        power: '',
        dateAcquisitionPower: '',
        state: '',
        powerLevel: ''
    });

    useEffect(() => {
        if (id) {
            getPower(id).then(response => {
                setPower(response.data.power);
                setDateAcquisitionPower(response.data.dateAcquisitionPower);
                setState(response.data.state);
                setPowerLevel(response.data.powerLevel);
            });
        }
    }, [id]);

    function handlePower(element) {
        setPower(element.target.value);
    }

    function handleDateAcquisitionPower(element) {
        setDateAcquisitionPower(element.target.value);
    }

    function handleState(element) {
        setState(element.target.value);
    }

    function handlePowerLevel(element) {
        setPowerLevel(element.target.value);
    }

    function saveOrUpdatePower(element) {
        element.preventDefault();

        if (validateForm()) {
            const powerData = { power, dateAcquisitionPower, state, powerLevel };

            if (id) {
                updatePower(id, powerData).then((response) => {
                    console.log(response.data);
                    navigator('/powers');
                }).catch(error => {
                    console.error(error);
                });
            } else {
                addPower(powerData).then((response) => {
                    console.log(response.data);
                    navigator('/powers');
                }).catch(error => {
                    console.error(error);
                });
            }
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (power.trim()) {
            errorsCopy.power = '';
        } else {
            errorsCopy.power = 'Power is required';
            valid = false;
        }

        if (dateAcquisitionPower.trim()) {
            errorsCopy.dateAcquisitionPower = '';
        } else {
            errorsCopy.dateAcquisitionPower = 'Date Acquisition Power is required';
            valid = false;
        }

        if (state.trim()) {
            errorsCopy.state = '';
        } else {
            errorsCopy.state = 'State is required';
            valid = false;
        }

        if (powerLevel.trim()) {
            errorsCopy.powerLevel = '';
        } else {
            errorsCopy.powerLevel = 'Power Level is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle() {
        if (id) {
            return <h2 className="text-center">Update Power</h2>;
        } else {
            return <h2 className="text-center">Add Power</h2>;
        }
    }

    return (
        <div className="container">
            <br /> <br />
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    {pageTitle()}
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <label className="form-label">Power:</label>
                                <input type="text" placeholder="Enter Power" name="power" value={power} className={`form-control 
                            ${errors.power ? 'is-invalid' : ''}`}
                                    onChange={handlePower}>
                                </input>
                                {errors.power && <div className="invalid-feedback">{errors.power}</div>}
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Date Acquisition Power:</label>
                                <input type="date" placeholder="Enter Date Acquisition Power" name="dateAcquisitionPower" value={dateAcquisitionPower} 
                            className={`form-control ${errors.dateAcquisitionPower ? 'is-invalid' : ''}`} onChange={handleDateAcquisitionPower}>
                                </input>
                                {errors.dateAcquisitionPower && <div className="invalid-feedback">{errors.dateAcquisitionPower}</div>}
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">State:</label>
                                <input type="text" placeholder="Enter State" name="state" value={state} 
                            className={`form-control ${errors.state ? 'is-invalid' : ''}`} onChange={handleState}>
                                </input>
                                {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Power Level:</label>
                                <input type="number" placeholder="Enter Power Level" name="powerLevel" value={powerLevel} 
                            className={`form-control ${errors.powerLevel ? 'is-invalid' : ''}`} onChange={handlePowerLevel}>
                                </input>
                                {errors.powerLevel && <div className="invalid-feedback">{errors.powerLevel}</div>}
                            </div>

                            <button className="btn btn-success" onClick={saveOrUpdatePower}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PowerComponent;

import React, {useEffect, useState} from "react"
import { listPowers, deletePower, updatePower } from "../services/PowerService"
import { useNavigate } from "react-router-dom"

function ListPowersComponent() {

    const [powers, setPowers] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        getAllPowers();
    }, [])

    function getAllPowers() {
        listPowers().then((response) => {
            setPowers(response.data);
        }).catch(error => {
            console.error(error);
        })
    }
    function addPower() {navigator("/add-power")}
    function updatePower(id) {navigator(`/update-power/${power_id}`)}
    function removePower(id) {
        console.log(id);
        deletePower(id).then((response) => {
            getAllPowers();
        }).catch(error => {console.error(error);})
    }
    function goToListSuperheroes() {navigator("/")}

    return (
        <div className="container">
            <h2 className="text-center">List of Powers</h2>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Power ID</th>
                        <th>Power</th>
                        <th>Acquisition Date</th>
                        <th>State</th>
                        <th>Power Level</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        powers.map(power => 
                            <tr key={power.power_id}>
                                <td>{power.power_id}</td>
                                <td>{power.power}</td>
                                <td>{power.dateAcquisitionPower}</td>
                                <td>{power.state}</td>
                                <td>{power.powerLevel}</td>
                                <td>
                                    <button className="btn btn-info" onClick={() => updatePower(power.power_id)}>Update</button>
                                    <button className="btn btn-danger" onClick={() => removePower(power.power_id)} 
                                    style={{marginLeft: '10px'}}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                    <tr>

                    </tr>
                </tbody>
            </table>
            <button className="btn btn-primary mb-2" onClick={addPower}>Add a Power</button>
            <button className="btn btn-primary mb-2" onClick={goToListSuperheroes} style={{marginLeft: '10px'}}>Superheroes List</button>
        </div>
    )
}

export default ListPowersComponent;
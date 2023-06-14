import React from 'react';
import './style.module.css';
const DataDisplay = ({ data }) => {
    return (
        <table style={{ border: "1px", borderColor: "black" }} className="data-table">
            <thead>
                <tr>
                    <th>Continent</th>
                    <th>Country</th>
                    <th>Population</th>
                    <th>Cases</th>
                    <th>Deaths</th>
                    <th>Tests</th>
                    <th>Day</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>

                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.continent}</td>
                        <td>{item.country}</td>
                        <td>{item.population}</td>
                        <td>
                            <ul>
                                <li>New: {item.cases.new ?? "No Data available"}</li>
                                <li>Active: {item.cases.active ?? "No Data available"}</li>
                                <li>Critical: {item.cases.critical ?? "No Data available"}</li>
                                <li>Recovered: {item.cases.recovered ?? "No Data available"}</li>
                                <li>1M Pop: {item.cases['1M_pop'] ?? "No Data available"}</li>
                                <li>Total: {item.cases.total ?? "No Data available"}</li>
                            </ul>
                        </td>
                        <td>
                            <ul>
                                <li>New: {item.deaths.new ?? "No Data available"}</li>
                                <li>1M Pop: {item.deaths['1M_pop'] ?? "No Data available"}</li>
                                <li>Total: {item.deaths.total ?? "No Data available"}</li>
                            </ul>
                        </td>
                        <td>
                            <ul>
                                <li>1M Pop: {item.tests['1M_pop'] ?? "No Data available"}</li>
                                <li>Total: {item.tests.total ?? "No Data available"}</li>
                            </ul>
                        </td>
                        <td>{item.day}</td>
                        <td>{item.time}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DataDisplay;

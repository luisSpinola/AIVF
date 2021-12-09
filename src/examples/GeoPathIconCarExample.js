import React from 'react';

import GraphChooser from "../components/GraphChooser";

import { IconButton, Slider } from '@material-ui/core';

import SettingsIcon from '@material-ui/icons/Settings';

import pathData from './dataFiles/someRandomRoute.json';
import pathData2 from './dataFiles/someRandomRoute2.json';
import pathData3 from './dataFiles/someRandomRoute3.json';

export default class GeoPathIconCarExample extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: {
                "header":{ 
                    "type": "geo_path", // Data Type
                    "coords": ["coords"],  // Identifier of the field containing the numerical value (y axis)
                    "value": ["Route1","Route2", "Route3"] // Routes names
                },
                "data": [
                    { 
                        "Route1": "This is the route 1 START description.",
                        "coords": [ -8.42667, 39.52199, 0.0 ]
                    },
                    { 
                        "Route1": "This is the route 1 END description.",
                        "coords": [ -9.21499, 38.72431, 0.0 ]
                    },
                    { 
                        "Route2": "This is the route 2 START description.",
                        "coords": [ -9.16777, 39.30382, 0.0 ],
                    },
                    { 
                        "Route2": "This is a random MIDDLE point.",
                        "coords": [ -8.33958, 39.85112, 0.0 ]
                    },
                    { 
                        "Route2": "This is the route 2 END description.",
                        "coords": [ -7.4017, 39.80766, 0.0 ]
                    },
                    { 
                        "Route3": "This is the route 3 START description.",
                        "coords": [ -8.60751, 41.17207, 0.0 ]
                    },
                    { 
                        "Route3": "This is the route 3 END description.",
                        "coords": [ -7.11656, 39.94431, 0.0 ]
                    },
                ],
                "vehicle": [
                    {
                        "Route1": "This vehicle will follow Route1",
                        "coordsI": [ -8.42676, 39.5215, 0.0 ],
                        "coordsF": [ -8.42676, 39.5215, 0.0 ]
                    },
                    {
                        "Route2": "This vehicle will follow Route2",
                        "coordsI": [ -9.16777, 39.30382, 0.0 ],
                        "coordsF": [ -9.16777, 39.30382, 0.0 ]
                    },
                    {
                        "Route3": "This vehicle will follow Route3",
                        "coordsI": [ -8.60751, 41.17207, 0.0 ],
                        "coordsF": [ -8.60751, 41.17207, 0.0 ]
                    }
                ],
                "Route1": [],
                "Route2": [],
                "Route3": [],
            },
            options: false,
            normalizeValue: 200,
            identifier: ['page_name', 7, 1] // Identifier Array, args: Page Name, ID, User ID
        };
    }

    setOptions = () => {
        if(!this.state.options) {this.setState({options: true})} else this.setState({options:false});
    }

    componentDidMount(){
        let newData = this.state.data;
        let newRoute = {"path": pathData.path}; newData.Route1.push(newRoute);
        newRoute = {"path": pathData2.path}; newData.Route2.push(newRoute);
        newRoute = {"path": pathData3.path}; newData.Route3.push(newRoute);
        this.setState({data: newData});
    }

    changeCarTest = (e,value) => {
        if(value > 0 && value < this.state.normalizeValue){
            let newData = this.state.data;

            //  Vehicle 1
            let positionI = Math.floor((pathData.path.length * (value-1) / this.state.normalizeValue));
            let positionF = Math.floor((pathData.path.length * value / this.state.normalizeValue));
            let newVehicleObj = {
                "Route1": "This vehicle will follow Route1",
                "coordsI": pathData.path[positionI],
                "coordsF": pathData.path[positionF]
            }
            newData.vehicle[0] = newVehicleObj;

            // Vehicle 2
            positionI = Math.floor((pathData2.path.length * (value-1) / this.state.normalizeValue));
            positionF = Math.floor((pathData2.path.length * value / this.state.normalizeValue));
            newVehicleObj = {
                "Route2": "This vehicle will follow Route1",
                "coordsI": pathData2.path[positionI],
                "coordsF": pathData2.path[positionF]
            }
            newData.vehicle[1] = newVehicleObj;

            // Vehicle 3
            positionI = Math.floor((pathData3.path.length * (value-1) / this.state.normalizeValue));
            positionF = Math.floor((pathData3.path.length * value / this.state.normalizeValue));
            newVehicleObj = {
                "Route3": "This vehicle will follow Route1",
                "coordsI": pathData3.path[positionI],
                "coordsF": pathData3.path[positionF]
            }
            newData.vehicle[2] = newVehicleObj;


            this.setState({data: newData});
        }
    }

    render(){
        return(
            <div>
          
                <div style={{ paddingLeft: '1rem', boxShadow: '0px 0px 1px 1px rgba(0, 0, 0, 0.2)' }}>
                    <span>Geo Path</span>
                    <IconButton style={{ paddingLeft: '0.4rem'}} onClick={() => this.setOptions()} type="button" className="btn btn-tool"> <SettingsIcon/> </IconButton>
                </div>
                <div style={{ boxShadow: '0 1px 8px 0 rgba(0, 0, 0, 0.2)' }}>
                    <Slider
                        onChange={(e,value) => this.changeCarTest(e,value)}
                        size="small"
                        defaultValue={0}
                        aria-label="Small"
                        step={1}
                        min={0}
                        max={this.state.normalizeValue}
                    />
                    <GraphChooser data={this.state.data} identifier={this.state.identifier} options={[this.state.options, this.setOptions]}/>
                </div>
            </div>
        )
    }
}
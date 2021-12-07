import React, { useState } from 'react';

import GraphChooser from "../components/GraphChooser";

import { IconButton } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

import pathData from './dataFiles/someRandomRoute.json';
import pathData2 from './dataFiles/someRandomRoute2.json';
import pathData3 from './dataFiles/someRandomRoute3.json';

export default function GeoPathIconExample() {

    const [options, setOptions] = useState(false);

    const data = {
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
        "Route1": [],
        "Route2": [],
        "Route3": []
    };

    let newRoute = {"path": pathData.path}; data.Route1.push(newRoute);
    newRoute = {"path": pathData2.path}; data.Route2.push(newRoute);
    newRoute = {"path": pathData3.path}; data.Route3.push(newRoute);

    const userID = 1;
    const identifier = ['page_name', 7, userID]; // Identifier Array, args: Page Name, ID, User ID
    return (
      <div>
          
            <div style={{ paddingLeft: '1rem', boxShadow: '0px 0px 1px 1px rgba(0, 0, 0, 0.2)' }}>
                <span>Geo Path/Icon</span>
                <IconButton style={{ paddingLeft: '0.4rem'}} onClick={() => setOptions(current => !current)} type="button" className="btn btn-tool"> <SettingsIcon/> </IconButton>
            </div>
            <div style={{ boxShadow: '0 1px 8px 0 rgba(0, 0, 0, 0.2)' }}>
                <GraphChooser data={data} identifier={identifier} options={[options, setOptions]}/>
            </div>
      </div>
    );
  }
  
  
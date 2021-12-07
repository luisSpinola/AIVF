import React, { useState } from 'react';

import GraphChooser from "../components/GraphChooser";

import { IconButton } from '@material-ui/core';

import SettingsIcon from '@material-ui/icons/Settings';

import densityData from './dataFiles/entLocationLiteLite.json';

export default function GeoDensExample() {

    const [options, setOptions] = useState(false);

    const data = {
        "header":{ 
            "type": "geo_dens", // Data Type
            "id": ["id_name"],       // Identifier of the field containing the name (x axis)
            "coords": ["coords"]  // Identifier of the field containing the numerical value (y axis)
        },
        "data": []
    };

    data.data = densityData.info;

    const userID = 1;
    const identifier = ['page_name', 5, userID]; // Identifier Array, args: Page Name, ID, User ID
    return (
      <div>
          
            <div style={{ paddingLeft: '1rem', boxShadow: '0px 0px 1px 1px rgba(0, 0, 0, 0.2)' }}>
                <span>Geo Dens</span>
                <IconButton style={{ paddingLeft: '0.4rem'}} onClick={() => setOptions(current => !current)} type="button" className="btn btn-tool"> <SettingsIcon/> </IconButton>
            </div>
            <div style={{ boxShadow: '0 1px 8px 0 rgba(0, 0, 0, 0.2)' }}>
                <GraphChooser data={data} identifier={identifier} options={[options, setOptions]}/>
            </div>
      </div>
    );
  }
  
  
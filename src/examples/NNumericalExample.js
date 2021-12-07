import React, { useState } from 'react';

import GraphChooser from "../components/GraphChooser";

import { IconButton } from '@material-ui/core';

import SettingsIcon from '@material-ui/icons/Settings';

export default function NNumericalExample(props) {

    const [options, setOptions] = useState(false);

    const data = {
        "header":{ //  Object
            "type": "n_numerical", // Data Type
            "id": ["id_name"],       // Identifier of the field containing the name (x axis)
            "value": ["value_name1","value_name2","value_name3"]  // Identifier of the field containing the numerical value (y axis)
        },
        "data": [ //  Array of Objects  
            { 
                "id_name": "Valor 1",
                "value_name1": 8000,
                "value_name2": 4000,
                "value_name3": 6000
            },
            { 
                "id_name": "Valor 2",
                "value_name1": 5000,
                "value_name2": 7000,
                "value_name3": 9000
            },
            { 
                "id_name": "Valor 3",
                "value_name1": 13000,
                "value_name2": 4000,
                "value_name3": 2000
            },
            { 
                "id_name": "Valor 4",
                "value_name1": 7000,
                "value_name2": 6000,
                "value_name3": 1000
            },
        ]
    };


    const userID = 1;
    const identifier = ['page_name', 2, userID]; // Identifier Array, args: Page Name, ID, User ID
    return (
      <div>
            <div style={{ paddingLeft: '1rem',boxShadow: '0px 0px 1px 1px rgba(0, 0, 0, 0.2)' }}>
                <span>N Numerical</span>
                <IconButton style={{ paddingLeft: '0.4rem'}} onClick={() => setOptions(current => !current)} type="button" className="btn btn-tool"> <SettingsIcon/> </IconButton>
            </div>
            <div style={{ boxShadow: '0 1px 8px 0 rgba(0, 0, 0, 0.2)' }}>
                <GraphChooser data={data} identifier={identifier} options={[options, setOptions]}/>
            </div>
      </div>
    );
  }
  
  
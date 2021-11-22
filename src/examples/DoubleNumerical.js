import React, { useState } from 'react';

import GraphChooser from "../components/GraphChooser";

import { Button } from '@material-ui/core';

import SettingsIcon from '@material-ui/icons/Settings';

export default function DoubleNumericalExample(props) {

    const [options, setOptions] = useState(false);

    const data = {
        "header":{ //  Object
            "type": "double_numerical", // Data Type
            "id": ["id_name"],       // Identifier of the field containing the name (x axis)
            "value": ["value_name1","value_name2"]  // Identifier of the field containing the numerical value (y axis)
        },
        "data": [ //  Array of Objects  
            { 
                "id_name": "Valor 1",
                "value_name1": 8000,
                "value_name2": 4000
            },
            { 
                "id_name": "Valor 2",
                "value_name1": 5000,
                "value_name2": 7000
            },
            { 
                "id_name": "Valor 3",
                "value_name1": 13000,
                "value_name2": 4000
            },
            { 
                "id_name": "Valor 4",
                "value_name1": 7000,
                "value_name2": 6000
            },
        ]
    };


    const userID = 1;
    const identifier = ['page_name', 2, userID]; // Identifier Array, args: Page Name, ID, User ID
    return (
      <div>
          
            <div style={{ border: "1px solid grey" }}>
                <Button onClick={() => setOptions(current => !current)} type="button" className="btn btn-tool"> <SettingsIcon/> </Button>
            </div>
            <div style={{ border: "1px solid grey" }}>
                <GraphChooser data={data} identifier={identifier} options={[options, setOptions]}/>
            </div>
      </div>
    );
  }
  
  
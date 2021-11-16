import React, { useState } from 'react';

import GraphChooser from "../components/GraphChooser";

import SettingsIcon from '@material-ui/icons/Settings';

export default function OneNumericalExample(props) {

    const [options, setOptions] = useState(false);

    const data = {
        "header":{ //  Object
            "type": "one_numerical", // Data Type
            "id": ["id_name"],       // Identifier of the field containing the name (x axis)
            "value": ["value_name"]  // Identifier of the field containing the numerical value (y axis)
        },
        "data": [ //  Array of Objects  
            { 
                "id_name": "Valor 1",
                "value_name": 8000
            },
            { 
                "id_name": "Valor 2",
                "value_name": 5000
            },
            { 
                "id_name": "Valor 3",
                "value_name": 13000
            },
            { 
                "id_name": "Valor 4",
                "value_name": 7000
            },
        ]
    };

    const userID = 1;
    const identifier = ['page_name', 1, userID]; // Identifier Array, args: Page Name, ID, User ID
    return (
      <div>
          
            <div style={{ border: "1px solid grey" }}>
                <button onClick={() => setOptions(current => !current)} type="button" className="btn btn-tool"> <SettingsIcon/> </button>
            </div>
            <div style={{ border: "1px solid grey" }}>
                <GraphChooser data={data} identifier={identifier} options={[options, setOptions]}/>
            </div>
      </div>
    );
  }
  
  
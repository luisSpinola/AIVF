import React, { useState } from 'react';

import GraphChooser from "../components/GraphChooser";

import { IconButton } from '@material-ui/core';

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

    const getMoreData = (dataNumber) => {
        for(let i=5; i<dataNumber; i++){
            let tempObj = {};
            let min = 3000;
            let max = 20000;
            let rand = Math.floor(min + Math.random() * (max - min));
            tempObj['id_name'] = "Valor " + i;
            tempObj['value_name'] = rand;
            data.data.push(tempObj);
        }
    }
    getMoreData(8);

    const userID = 1;
    const identifier = ['page_name', 1, userID]; // Identifier Array, args: Page Name, ID, User ID
    return (
      <div>
          
            <div style={{ paddingLeft: '1rem', boxShadow: '0px 0px 1px 1px rgba(0, 0, 0, 0.2)' }}>
                <span>One Numerical</span>
                <IconButton style={{ paddingLeft: '0.4rem'}} onClick={() => setOptions(current => !current)} type="button" className="btn btn-tool"> <SettingsIcon/> </IconButton>
            </div>
            <div style={{ boxShadow: '0 1px 8px 0 rgba(0, 0, 0, 0.2)' }}>
                <GraphChooser data={data} identifier={identifier} options={[options, setOptions]}/>
            </div>
      </div>
    );
  }
  
  
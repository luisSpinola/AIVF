import React, { useState } from 'react';

import GraphChooser from "../components/GraphChooser";

import { IconButton } from '@material-ui/core';

import SettingsIcon from '@material-ui/icons/Settings';

export default function TimeSeriesExample(props) {

    const [options, setOptions] = useState(false);

    const data = {
        "header":{ //  Object
            "type": "time_series", // Data Type
            "id": ["date"],       // Identifier of the field containing the name (x axis)
            "value": ["value_name1","value_name2","value_name3"],   // Identifier of the field containing the numerical value (y axis)
            "time": ["d","m","y"] // 3 elems = d/m/y || 2 elems = mounth || 1 elem = day
        },
        "data": [ //  Array of Objects  
            { 
                "date": new Date("05/05/2019"),
                "value_name1": 4000,
                "value_name2": 9000,
                "value_name3": 1000
            },
            { 
                "date": new Date("05/03/2019"),
                "value_name1": 2000,
                "value_name2": 8000,
                "value_name3": 6000
            },
            { 
                "date": new Date("05/08/2019"),
                "value_name1": 8000,
                "value_name2": 7000,
                "value_name3": 1000
            },
            { 
                "date": new Date("05/06/2019"),
                "value_name1": 5000,
                "value_name2": 1000,
                "value_name3": 7000
            },
            { 
                "date": new Date("06/05/2019"),
                "value_name1": 4000,
                "value_name2": 9000,
                "value_name3": 1000
            },
            { 
                "date": new Date("06/03/2019"),
                "value_name1": 2000,
                "value_name2": 8000,
                "value_name3": 6000
            },
            { 
                "date": new Date("06/08/2019"),
                "value_name1": 8000,
                "value_name2": 7000,
                "value_name3": 1000
            },
            { 
                "date": new Date("06/06/2019"),
                "value_name1": 5000,
                "value_name2": 1000,
                "value_name3": 7000
            },
            { 
                "date": new Date("07/05/2019"),
                "value_name1": 4000,
                "value_name2": 9000,
                "value_name3": 1000
            },
            { 
                "date": new Date("07/03/2019"),
                "value_name1": 2000,
                "value_name2": 8000,
                "value_name3": 6000
            },
            { 
                "date": new Date("07/08/2019"),
                "value_name1": 8000,
                "value_name2": 7000,
                "value_name3": 1000
            },
            { 
                "date": new Date("07/06/2019"),
                "value_name1": 5000,
                "value_name2": 1000,
                "value_name3": 7000
            }
        ]
    };


    const userID = 1;
    const identifier = ['page_name', 4, userID]; // Identifier Array, args: Page Name, ID, User ID
    return (
      <div>
          
            <div style={{ paddingLeft: '1rem', boxShadow: '0px 0px 1px 1px rgba(0, 0, 0, 0.2)' }}>
                <span>Time Series</span>
                <IconButton style={{ paddingLeft: '0.4rem'}} onClick={() => setOptions(current => !current)} type="button" className="btn btn-tool"> <SettingsIcon/> </IconButton>
            </div>
            <div style={{ boxShadow: '0 1px 8px 0 rgba(0, 0, 0, 0.2)' }}>
                <GraphChooser data={data} identifier={identifier} options={[options, setOptions]}/>
            </div>
      </div>
    );
  }
  
  
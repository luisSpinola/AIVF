import React, { useState } from 'react';

import GraphChooser from "../components/GraphChooser";

import { IconButton } from '@material-ui/core';

import SettingsIcon from '@material-ui/icons/Settings';

export default function GeoQuantExample() {

    const [options, setOptions] = useState(false);

    const data = {
        "header":{
            "type": "geo_quant", // Data Type
            "id": ["Name"], // Identifier of the field containing the name
            "value":["Denúncias","Reclamações"],
            "coords": ["coordinates"],
            "info": ["desc"] // More information to display on hover 
        },
        "data": [ 
            {
                "Name": "Test1",
                "coords": [41.160304, -8.602478],
                "Denúncias": 9097,
                "desc": "Unidade Operacional I -  Porto",
            },
            {
                "Name": "Test1",
                "coords": [41.160304, -8.502478],
                "Reclamações": 2643,
                "desc": "Unidade Operacional I -  Porto",
            },

            {
                "Name": "Test1",
                "coords": [39.2419779, -8.6821562],
                "Denúncias": 3597,
                "desc": "Unidade Operacional X - Santarém",
            },
            {
                "Name": "Test1",
                "coords": [39.2419779, -8.5821562],
                "Reclamações": 451,
                "desc": "Unidade Operacional X - Santarém",
            },

            {
                "Name": "Test1",
                "coords": [38.551161, -7.91108],
                "Denúncias": 3858,
                "desc": "Unidade Operacional XI - Évora",
            },
            {
                "Name": "Test1",
                "coords": [38.551161, -7.81108],
                "Reclamações": 290,
                "desc": "Unidade Operacional XI - Évora",
            },

            {
                "Name": "Test1",
                "coords": [37.0315505, -7.9249003],
                "Denúncias": 7329,
                "desc": "Unidade Operacional XII - Faro",
            },
            {
                "Name": "Test1",
                "coords": [37.0315505, -7.8249003],
                "Reclamações": 1230,
                "desc": "Unidade Operacional XII - Faro",
            },

            {
                "Name": "Test1",
                "coords": [41.534061, -8.619945],
                "Denúncias": 4945,
                "desc": "Unidade Operacional II -  Barcelos",
            },
            {
                "Name": "Test1",
                "coords": [41.534061, -8.519945],
                "Reclamações": 829,
                "desc": "Unidade Operacional II -  Barcelos",
            },

            {
                "Name": "Test1",
                "coords": [41.5140871, -7.1835093],
                "Denúncias": 1540,
                "desc": "Unidade Operacional III -  Mirandela",
            },
            {
                "Name": "Test1",
                "coords": [41.5140871, -7.0835093],
                "Reclamações": 156,
                "desc": "Unidade Operacional III -  Mirandela",
            },

            {
                "Name": "Test1",
                "coords": [40.1935978, -8.4058712],
                "Denúncias": 3175,
                "desc": "Unidade Operacional IV -  Coimbra",
            },
            {
                "Name": "Test1",
                "coords": [40.1935978, -8.3058712],
                "Reclamações": 885,
                "desc": "Unidade Operacional IV -  Coimbra",
            },

            {
                "Name": "Test1",
                "coords": [40.0935978, -8.4058712],
                "Denúncias": 2569,
                "desc": "Unidade Operacional V -  Coimbra",
            },
            {
                "Name": "Test1",
                "coords": [40.0935978, -8.3058712],
                "Reclamações": 526,
                "desc": "Unidade Operacional V -  Coimbra",
            },

            {
                "Name": "Test1",
                "coords": [39.8099492, -7.5090702],
                "Denúncias": 1619,
                "desc": "Unidade Operacional VI - Castelo Branco",
            },
            {
                "Name": "Test1",
                "coords": [39.8099492, -7.4090702],
                "Reclamações": 156,
                "desc": "Unidade Operacional VI - Castelo Branco",
            },

            {
                "Name": "Test1",
                "coords": [38.7259033, -9.135023],
                "Denúncias": 10313,
                "desc": "Unidade Operacional VII -  Lisboa",
            },
            {
                "Name": "Test1",
                "coords": [38.7259033, -9.035023],
                "Reclamações": 3745,
                "desc": "Unidade Operacional VII -  Lisboa",
            },

            {
                "Name": "Test1",
                "coords": [38.8259033, -9.135023],
                "Denúncias": 4910,
                "desc": "Unidade Operacional VIII -  Lisboa/Oeste",
            },
            {
                "Name": "Test1",
                "coords": [38.8259033, -9.035023],
                "Reclamações": 2743,
                "desc": "Unidade Operacional VIII -  Lisboa/Oeste",
            },

            {
                "Name": "Test1",
                "coords": [38.6259033, -9.135023],
                "Denúncias": 5018,
                "desc": "Unidade Operacional IX -  Lisboa/Sul",
            },
            {
                "Name": "Test1",
                "coords": [38.6259033, -9.035023],
                "Reclamações": 2065,
                "desc": "Unidade Operacional IX -  Lisboa/Sul",
            },
        ]
    };

    const userID = 1;
    const identifier = ['page_name', 6, userID]; // Identifier Array, args: Page Name, ID, User ID
    return (
      <div>
          
            <div style={{ paddingLeft: '1rem', boxShadow: '0px 0px 1px 1px rgba(0, 0, 0, 0.2)' }}>
                <span>Geo Quant</span>
                <IconButton style={{ paddingLeft: '0.4rem'}} onClick={() => setOptions(current => !current)} type="button" className="btn btn-tool"> <SettingsIcon/> </IconButton>
            </div>
            <div style={{ boxShadow: '0 1px 8px 0 rgba(0, 0, 0, 0.2)' }}>
                <GraphChooser data={data} identifier={identifier} options={[options, setOptions]}/>
            </div>
      </div>
    );
  }
  
  
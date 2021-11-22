import {Grid, Select, MenuItem} from '@material-ui/core';
import { useState } from 'react';

import OneNumericalExample from './OneNumericalExample';
import NNumericalExample from './NNumericalExample';
import DoubleNumericalExample from './DoubleNumerical';

import { LANGUAGE, VALUE_COLOR_OBJ } from '../utils/Conf';

import GlobalPicker from '../utils/options/ChangeGlobalColor';

export default function DashboardExample() {
    const [language, setLanguage] = useState('pt');
    const [colors, setColors] = useState(VALUE_COLOR_OBJ['color']);
    const changeLanguage = (e) => {
        setLanguage(e.target.value);
        LANGUAGE['current'] = e.target.value;
    }
    const pushColors = (dataArray) =>{
        let newData = [...dataArray];
        setColors(newData);
        VALUE_COLOR_OBJ['color'] = newData;
    }

    const minWidth = '30rem';
    
    return(
        <div>
            <Grid container spacing={2}>
                <Grid item xs={4} key={"cenas1"}>
                    
                </Grid>
                <Grid item xs={4} key={"cenas2"}>
                    <GlobalPicker colors={colors} setColors={pushColors}/>
                </Grid>
                <Grid item xs={4} key={"cenas3"}>
                    <Select style={{width:'16rem'}} value={language} onChange={(e) => changeLanguage(e)}>
                        <MenuItem value={'pt'}>Português</MenuItem>
                        <MenuItem value={'en'}>English</MenuItem>
                    </Select>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6} key={"cenas1"} style={{minWidth:minWidth}}>
                    <OneNumericalExample/>
                </Grid>
                <Grid item xs={6} key={"cenas2"} style={{minWidth:minWidth}}>
                    <NNumericalExample/>
                </Grid>
                <Grid item xs={6} key={"cenas3"} style={{minWidth:minWidth}}>
                    <DoubleNumericalExample/>
                </Grid>
            </Grid>
        </div>
        
    );
}
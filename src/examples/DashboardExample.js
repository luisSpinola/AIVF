import Grid from '@material-ui/core/Grid';

import OneNumericalExample from './OneNumericalExample';

export default function DashboardExample() {
    
    return(
        <Grid container spacing={2}>
            <Grid item xs={4} key={"cenas1"}>
                <OneNumericalExample/>
            </Grid>
            <Grid item xs={4} key={"cenas2"}>
                <OneNumericalExample/>
            </Grid>
            <Grid item xs={4} key={"cenas3"}>
                <OneNumericalExample/>
            </Grid>
        </Grid>
    );
}
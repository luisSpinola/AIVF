import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Switch from '@material-ui/core/Switch';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { changeCheckbox, changeSlider, changeInputString } from './OptionsInputs';
import { SLIDER_SIZE } from '../Conf';

import { ENTER_DELAY, LEAVE_DELAY, TT_GRID, TT_GRID_HORIZONTAL,TT_GRID_OPACIDADE,TT_GRID_VERTICAL, TT_GRID_STROKE } from '../text/Tooltips';

export const getGridOptions = (self) => {
    return <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon/>} id="acor_cor">
        <div>
            Grelha
            <Tooltip TransitionComponent={Zoom} arrow title={TT_GRID} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>   
                <Switch onClick={(event) => event.stopPropagation()} onFocus={(event) => event.stopPropagation()} onChange={(e) => changeCheckbox(self, e, "grid")} checked={self.state.options.grid} color="primary" />
            </Tooltip>
        </div>
    </AccordionSummary>
    <AccordionDetails>
        <List key={'grid_key'}>
            <Tooltip TransitionComponent={Zoom} arrow title={TT_GRID_HORIZONTAL} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}> 
                <FormControlLabel control={<Switch onChange={(e) => changeCheckbox(self, e, "grid_horizontal")} checked={self.state.options.grid_horizontal} color="primary" />} label="Horizontal" labelPlacement="end"/>
            </Tooltip>

            <Divider/>

            <Tooltip TransitionComponent={Zoom} arrow title={TT_GRID_VERTICAL} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}> 
                <FormControlLabel control={<Switch onChange={(e) => changeCheckbox(self, e, "grid_vertical")} checked={self.state.options.grid_vertical} color="primary" />} label="Vertical" labelPlacement="end"/>
            </Tooltip>

            <Divider/>

            <Tooltip TransitionComponent={Zoom} arrow title={TT_GRID_STROKE} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}> 
                <FormControlLabel control={<Switch onChange={(e) => changeCheckbox(self, e, "grid_stroke")} checked={self.state.options.grid_stroke} color="primary" />} label="Linha de Traço" labelPlacement="end"/>    
            </Tooltip>

            <Divider/>

            <Tooltip TransitionComponent={Zoom} arrow title={TT_GRID_OPACIDADE} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}> 
                <FormControlLabel label="Opacidade" labelPlacement="top"
                    control={
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs>
                                <Slider style={{width:SLIDER_SIZE}}
                                    value={self.state.options.grid_opacity}
                                    onChange={(e,value) => changeSlider(self,e,value,"grid_opacity")}
                                    step={5}
                                    min={0}
                                    max={100}
                                    aria-labelledby="grid_opacity-slider"
                                />
                            </Grid>
                            <Grid item>
                                <Input style={{width:50}}
                                    value={self.state.options.grid_opacity}
                                    onChange={(e) => changeInputString(self,e,"grid_opacity")}
                                    inputProps={{ step:5, min:0, max: 100, type: 'number', 'aria-labelledby': 'grid_opacity-slider'}}
                                />
                            </Grid>
                        </Grid>}
                />
            </Tooltip>
        </List>
    </AccordionDetails>
</Accordion>
}
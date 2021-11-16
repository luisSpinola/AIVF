import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Switch from '@material-ui/core/Switch';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';

import { changeCheckbox, changeSelect } from './OptionsInputs';

import { SLIDER_SIZE, INPUT_SIZE } from '../Conf';

import { ENTER_DELAY, LEAVE_DELAY, TT_LEGEND, TT_LEGEND_ALIGN, TT_LEGEND_POS } from '../text/Tooltips';

export const getLegendOptions = (self) =>{
    return <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon/>} id="legenda_division">
        <div>Legenda
            <Tooltip TransitionComponent={Zoom} arrow title={TT_LEGEND} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>                                           
                <Switch onClick={(event) => event.stopPropagation()} onFocus={(event) => event.stopPropagation()} onChange={(e) => changeCheckbox(self, e, "legend")} checked={self.state.options.legend} color="primary" />
            </Tooltip>
        </div>
    </AccordionSummary>
    <AccordionDetails>
        <List>
            <Tooltip TransitionComponent={Zoom} arrow title={TT_LEGEND_POS} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}> 
                <FormControlLabel control={<Select style={{width:SLIDER_SIZE+INPUT_SIZE+15}} value={self.state.options.legend_pos} onChange={(e) => changeSelect(self, e,"legend_pos")}>
                                <MenuItem value={"top"}>Topo</MenuItem>
                                <MenuItem value={"middle"}>Meio</MenuItem>
                                <MenuItem value={"bottom"}>Fundo</MenuItem>
                            </Select>}
                    label="Posição"
                    labelPlacement="top"
                />
            </Tooltip>
            
            <Divider key={'legend_divider_1'}/>

            <Tooltip TransitionComponent={Zoom} arrow title={TT_LEGEND_ALIGN} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}> 
                <FormControlLabel control={<Select style={{width:SLIDER_SIZE+INPUT_SIZE+15}} value={self.state.options.legend_align} onChange={(e) => changeSelect(self, e,"legend_align")}>
                                <MenuItem value={"center"}>Centro</MenuItem>
                                <MenuItem value={"left"}>Esquerda</MenuItem>
                                <MenuItem value={"right"}>Direita</MenuItem>
                            </Select>}
                    label="Alinhamento"
                    labelPlacement="top"
                />
            </Tooltip>
        </List>
        </AccordionDetails>
    </Accordion>;
}
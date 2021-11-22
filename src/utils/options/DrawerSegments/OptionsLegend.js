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

import { changeCheckbox, changeSelect } from '../OptionsInputs';

import { LANGUAGE, LANGUAGE_FILES, SLIDER_SIZE, INPUT_SIZE, TOP_PADDING, BOT_PADDING } from '../../Conf';
import { ENTER_DELAY, LEAVE_DELAY } from '../../text/Tooltips';

export const getLegendOptions = (self, direction) =>{
    let auto = !self.state.options.legend;
    let directionPad;
    (direction) ? directionPad = {paddingTop:TOP_PADDING,paddingBottom:BOT_PADDING} : directionPad = {paddingTop:TOP_PADDING};
    return <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon/>} id="legenda_division">
        <div>{LANGUAGE_FILES[LANGUAGE['current']].LABEL_LEGEND}
            <Tooltip TransitionComponent={Zoom} arrow title={LANGUAGE_FILES[LANGUAGE['current']].TT_LEGEND} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>                                           
                <Switch size="small" onClick={(event) => event.stopPropagation()} onFocus={(event) => event.stopPropagation()} onChange={(e) => changeCheckbox(self, e, "legend")} checked={self.state.options.legend} color="primary" />
            </Tooltip>
        </div>
    </AccordionSummary>
    <AccordionDetails>
        <List>
            <Tooltip TransitionComponent={Zoom} arrow title={LANGUAGE_FILES[LANGUAGE['current']].TT_LEGEND_POS} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}> 
                <FormControlLabel style={{paddingBottom:BOT_PADDING}} disabled={auto} control={<Select disabled={auto} style={{width:SLIDER_SIZE+INPUT_SIZE+15}} value={self.state.options.legend_pos} onChange={(e) => changeSelect(self, e,"legend_pos")}>
                                <MenuItem value={"top"}>Topo</MenuItem>
                                <MenuItem value={"middle"}>Meio</MenuItem>
                                <MenuItem value={"bottom"}>Fundo</MenuItem>
                            </Select>}
                    label={LANGUAGE_FILES[LANGUAGE['current']].LABEL_LEGEND_POS}
                    labelPlacement="top"
                />
            </Tooltip>
            
            <Divider/>

            <Tooltip TransitionComponent={Zoom} arrow title={LANGUAGE_FILES[LANGUAGE['current']].TT_LEGEND_ALIGN} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}> 
                <FormControlLabel style={directionPad} disabled={auto} control={<Select disabled={auto} style={{width:SLIDER_SIZE+INPUT_SIZE+15}} value={self.state.options.legend_align} onChange={(e) => changeSelect(self, e,"legend_align")}>
                                <MenuItem value={"center"}>Centro</MenuItem>
                                <MenuItem value={"left"}>Esquerda</MenuItem>
                                <MenuItem value={"right"}>Direita</MenuItem>
                            </Select>}
                    label={LANGUAGE_FILES[LANGUAGE['current']].LABEL_LEGEND_ALIGN}
                    labelPlacement="top"
                />
            </Tooltip>

            

            {direction && <span> <Divider/><Tooltip TransitionComponent={Zoom} arrow title={LANGUAGE_FILES[LANGUAGE['current']].TT_LEGEND_ALIGN} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}> 
                <FormControlLabel style={{paddingTop:TOP_PADDING}} disabled={auto} control={<Select disabled={auto} style={{width:SLIDER_SIZE+INPUT_SIZE+15}} value={self.state.options.legend_direction} onChange={(e) => changeSelect(self, e,"legend_direction")}>
                                <MenuItem value={"horizontal"}>Horizontal</MenuItem>
                                <MenuItem value={"vertical"}>Vertical</MenuItem>
                            </Select>}
                    label={LANGUAGE_FILES[LANGUAGE['current']].LABEL_LEGEND_DIR}
                    labelPlacement="top"
                />
            </Tooltip> </span>}
        </List>
        </AccordionDetails>
    </Accordion>;
}
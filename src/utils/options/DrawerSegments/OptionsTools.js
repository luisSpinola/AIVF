
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Tooltip, Switch, Accordion, AccordionSummary, AccordionDetails, List, Zoom, FormControlLabel } from '@material-ui/core';

import { ENTER_DELAY, LEAVE_DELAY } from '../../text/Tooltips';
import { LANGUAGE, LANGUAGE_FILES, SWITCH_PADDING  } from '../../Conf';
import { changeCheckbox } from '../OptionsInputs';

export const getToolsOptions = (self) => {
    return <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>} id="acor_cor">
                        {LANGUAGE_FILES[LANGUAGE['current']].LABEL_TOOLS}
                </AccordionSummary>
                <AccordionDetails>
                    <List key={'tools_key'}>
                        <Tooltip TransitionComponent={Zoom} arrow title={LANGUAGE_FILES[LANGUAGE['current']].TT_BRUSH} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>
                            <FormControlLabel style={{paddingLeft: SWITCH_PADDING}}  control={<Switch size="small" onChange={(e) => changeCheckbox(self, e, "brush")} checked={self.state.options.brush} color="primary" />}
                                    label={LANGUAGE_FILES[LANGUAGE['current']].LABEL_TOOLS_BRUSH}
                                    labelPlacement="end"
                            />
                        </Tooltip>
                    </List>
                </AccordionDetails>
            </Accordion>
}
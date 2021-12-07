import React from "react";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import { TOP_PADDING, BOT_PADDING } from "../Conf";

export const closeDrawer = (self) => {
    self.props.options[1](false);
}
export const sidebarPosClose = (self) => { self.setState({sidebarPosOpen: false})}
export const sidebarPosCloseInput = (position, self, changeParentPos) => { 
    self.setState({sidebarPosOpen: false, sidebarPos: position});
    changeParentPos(position);
}
export const sidebarPosOpen = (e, self) => { self.setState({sidebarPosOpen: true, anchorEl: e.currentTarget})}


//self = this, plotSelection = this.props.plotSelection, sidebarPosOpen = this.state.sidebarPosOpen, anchorEl = this.state.anchorEl, options,  sidebarOpen = this.state.sidebarOpen, sidebarPos = this.state.sidebarPos
export const drawerOptions = (self, plotSelection, sidebarPosOpen, anchorEl, options, sidebarOpen, sidebarPos) => {
    let selectionSelect = getGraphSelection(plotSelection);
    let bigTitle = bigTitleGenerator(sidebarPosOpen, anchorEl, self, plotSelection[4]);
    return showOptionsDrawer(sidebarOpen, selectionSelect, options, bigTitle, sidebarPos, self);
}

export const showOptionsDrawer = (sidebarOpen, selector, options, bigTitle, anchor, self) => {
    return <Drawer anchor={anchor} ModalProps={{disableEnforceFocus:true, hideBackdrop:true}} variant="persistent" open={sidebarOpen} onClose={() => closeDrawer(self)}>
                <List key={"options_options"}>
                    <ListItem key={'back_button'}>
                        <IconButton onClick={() => closeDrawer(self)}>
                            <ChevronRightIcon/>
                        </IconButton>
                        {bigTitle}
                    </ListItem>
                    <Divider/>
                    <ListItem alignItems={'center'} key={'selector'}>
                        {selector}
                    </ListItem>
                    {options}
                </List>
            </Drawer>
}

export const bigTitleGenerator = (sidebarPosOpen1, anchorEl, self, changeParentPos) => {
    return <React.Fragment key={"options_title"}>
                <div style={{marginLeft: '55%'}}>
                    <IconButton onClick={(e) => sidebarPosOpen(e, self)}><MenuIcon/></IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        id="simple-menu"
                        keepMounted
                        open={sidebarPosOpen1}
                        onClose={() => sidebarPosClose(self)}
                    >
                        <MenuItem key={'right'} onClick={() => sidebarPosCloseInput('right', self, changeParentPos)}>Direita</MenuItem>
                        <MenuItem key={'left'} onClick={() => sidebarPosCloseInput('left', self, changeParentPos)}>Esquerda</MenuItem>
                    </Menu>
                </div>
            </React.Fragment>
}

export const getGraphSelection = (fullArray) => {
    let selectionItems = getGraphItemsSelection(fullArray[1]);
    return <div style={{paddingTop: TOP_PADDING, paddingBottom: BOT_PADDING, width:'16rem'}}><Select style={{width:'16rem'}} value={fullArray[0]} onChange={fullArray[2]}>
                    {selectionItems}
                </Select></div>
}
export const getGraphItemsSelection = (nameArray) => {
    let returnArray = [];
    for(let i=0;i<nameArray.length; i++){
        returnArray.push(<MenuItem key={i} value={i}>{nameArray[i]}</MenuItem>);
    }
    return returnArray;
}
import { handlePercentChange } from "./HandleOptions";


export const changeCheckbox = (self, e, name) => {
    let tempOpt = self.state.options;
    tempOpt[name] = e.target.checked;

    let tempOldCounter = self.state.counter;
    let tempCounter = self.state.counter + 1;

    self.setState({
        options: tempOpt,
        oldCounter: tempOldCounter,
        counter: tempCounter
    });
}

export const updatePercent = (self) => {
    let e = {target:{checked:true}};
    handlePercentChange(self,e);
}

export const changeInputPercent = (self, event, name) => {
    let value = parseInt(event.target.value);
    let tempOpt = self.state.options;
    tempOpt[name] = value;

    let tempOldCounter = self.state.counter;
    let tempCounter = self.state.counter + 1;

    self.setState({
        options: tempOpt,
        oldCounter: tempOldCounter,
        counter: tempCounter
    });

    updatePercent(self);
}

export const changeInput = (self, event, name) => {
    let value = parseInt(event.target.value);
    let tempOpt = self.state.options;
    tempOpt[name] = value;

    let tempOldCounter = self.state.counter;
    let tempCounter = self.state.counter + 1;

    self.setState({
        options: tempOpt,
        oldCounter: tempOldCounter,
        counter: tempCounter
    });
}

export const changeInputString = (self, event, name) => {
    let value = event.target.value;
    let tempOpt = self.state.options;
    tempOpt[name] = value;

    let tempOldCounter = self.state.counter;
    let tempCounter = self.state.counter + 1;

    self.setState({
        options: tempOpt,
        oldCounter: tempOldCounter,
        counter: tempCounter
    })
}

export const changeSlider = (self, event, value, name) => {
    let tempOpt = self.state.options;
    tempOpt[name] = value;

    let tempOldCounter = self.state.counter;
    let tempCounter = self.state.counter + 1;

    self.setState({
        options: tempOpt,
        oldCounter: tempOldCounter,
        counter: tempCounter
    });
}

export const changeSelect = (self, e, name) => {
    let tempOpt = self.state.options;
    tempOpt[name] = e.target.value;

    let tempOldCounter = self.state.counter;
    let tempCounter = self.state.counter + 1;

    self.setState({
        options: tempOpt,
        oldCounter: tempOldCounter,
        counter: tempCounter
    });
}
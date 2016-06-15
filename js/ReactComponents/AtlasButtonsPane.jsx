import React from "react";
const Component = React.Component;


export default class ButtonsPane extends Component {

    getButtons() {
        var buttons = this.props.buttons;
        return buttons ? buttons.map((button, i)=> {
            return <button key={i} type="button" className="btn btn-primary"
                           onClick={button.h}>{button.title}</button>
        }) : null
    }

    render() {
        return (
            <div className="btn-group pull-right">
                {this.getButtons()}
            </div>
        )
    }

}
import React from "react"
import GoogleImageDialog from "./GoogleImageDialog.jsx"

export default class BioindicatorDialog extends React.Component {

    getHelpData() {
        return window["HELP_DATA"][this.props.name] || null;
    }

    render() {
        return (
            <div>
                <GoogleImageDialog googleId={this.props.googleId} className="bioindicator-image" imgClassName="img-polaroid"/>
                <div>
                    {this.getHelpData()}
                </div>
            </div>
        )
    }

}
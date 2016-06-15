import React from "react";
import GoogleImage from "./GoogleImage.jsx";

export default class GoogleImageDialog extends React.Component {

    render() {
        var props = this.props;
        var googleId = props.googleId;
        return googleId ? (
            <div className={props.className}>
                <GoogleImage googleId={googleId} className={props.imgClassName}/>
            </div>
        ) : null;
    }

}
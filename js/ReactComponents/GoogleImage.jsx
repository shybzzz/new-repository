import React from "react"

const googleContext = "http://drive.google.com/uc?export=view&id=";

export default class GoogleImage extends React.Component {

    getGoogleSrc() {
        return googleContext + this.props.googleId;
    }

    getClassName() {
        return this.props.className + " img-responsive";
    }

    render() {
        return <img src={this.getGoogleSrc()} className={this.getClassName()}/>
    }

}
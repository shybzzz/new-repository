import React from "react";
import ReactDom from "react-dom";

const style = {
    height: 440
};

export default class AtlasMap extends React.Component {

    componentDidMount() {
        var mapOptions = this.props.mapOptions;
        mapOptions.mapTypeId = google.maps.MapTypeId[mapOptions.mapTypeId];
        this.props.onMapCreated(new google.maps.Map(ReactDom.findDOMNode(this), mapOptions));

    }

    render() {
        return (
            <div className={this.props.className} style={style}></div>
        );
    }
}

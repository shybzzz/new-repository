import React from "react";

export default class AtlasHeader extends React.Component{
    render(){
        var props = this.props;
        return(
            <div className="jumbotron row">
                <a href={props.home}>
                    <img className="img-responsive" src={props.logo}/>
                </a>
                <h2>
                    {props.title}
                </h2>
            </div>
        )
    }
}
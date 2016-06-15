import React from "react";

export default class AtlasDialog extends React.Component {

    render() {
        var close = this.props.close;
        return (
            <div>
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" onClick={close}>&times;</button>
                    <h4>
                        {this.props.title}
                    </h4>
                </div>

                <div className="modal-body">
                    {this.props.children}
                </div>
            </div>
        )
    }

}
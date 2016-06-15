import React from "react";

var Component = React.Component;

class DropDownMenu extends Component {
    render() {
        var props = this.props;
        return (
            <ul className="dropdown-menu">
                {AtlasNavigator.renderItems(props.menuItems, this.props.map, props.showKmls)}
            </ul>
        )
    }
}

class Kml extends Component {

    showKml(e) {
        var menuItem = this.props.menuItem;
        this.props.showKmls(menuItem);
    }

    render() {
        var kml = this;
        var props = kml.props;
        return (
            <li onClick={kml.showKml.bind(this)}>
                <a href={props.map}>
                    {props.menuItem.text}
                </a>
            </li>
        )
    }
}

class Cem extends Component {
    render() {
        var props = this.props;
        var menuItem = props.menuItem;
        return (
            <li className="dropdown">
                <a href="" className="dropdown-toggle" data-toggle="dropdown">
                    {menuItem.text}
                    <b className="caret"/>
                </a>
                <DropDownMenu menuItems={menuItem.items} map={props.map}  showKmls={props.showKmls}/>
            </li>
        )
    }
}

class Gis extends Component {
    render() {
        var props = this.props;
        var menuItem = props.menuItem;
        return (
            <li className="dropdown-submenu">
                <a href="">{menuItem.text}</a>
                <DropDownMenu menuItems={menuItem.items} map={props.map} showKmls={props.showKmls}/>
            </li>
        )
    }
}

var MenuItemsFactory = {Kml: Kml, Cem: Cem, Gis: Gis};

export default class AtlasNavigator extends Component {

    static renderItems(items, map, showKmls) {
        return items.map(function (item, i) {
            var menuItemsFactory = MenuItemsFactory[item.component];
            return menuItemsFactory ? React.createElement(menuItemsFactory, {
                key: i,
                menuItem: item,
                map: map,
                showKmls: showKmls
            }) : null;
        })
    }

    render() {
        var props = this.props;
        return (
            <div className="row">
                {this.props.navigation.map(function (menu, i) {
                    return (
                    <div key={i} className="col-sm-3">
                        <h4>{menu.title}</h4>
                        <ul className="nav nav-pills nav-stacked">
                            {AtlasNavigator.renderItems(menu.items, props.map, props.showKmls)}
                        </ul>
                    </div>
                        )
                    })}
            </div>
        )
    }
}
import React from "react";
import {Link} from "dva/router";
import {FormattedMessage} from "react-intl";
import {Col, Menu, Row, Icon} from "antd";
import {connect} from "dva";
import "./header.css";

@connect(
  (state) => ({...state.menu, user: state.user}),
)
export default class extends React.Component {

  handleClick = (e)=> {
    this.props.dispatch({type: 'menu/active', payload: {menu: 'main', key: e.key}});
  };

  render() {
    let userRoles = Object.keys(this.props.user.details.roles);

    let pages = [];
    for (let page of this.props.main.pages) {
      if (page.permissions) {
        for (let p of page.permissions) {
          if (userRoles.includes(p)) {
            pages.push(page);
            break;
          }
        }
      } else {
        pages.push(page);
      }
    }

    return (
      <header>
        <Row>
          <Col lg={4} md={6} sm={7} xs={24}>
            <Icon className="nav-phone-icon" type="menu"/>
            <Link className="logo-1" to="/">
              <img alt="logo" src="../../../../images/logo1.jpg"/>
              <span><FormattedMessage id="app.name"/></span>
            </Link>
          </Col>
          <Col lg={20} md={18} sm={17} xs={0} style={{ display: 'block' }}>
            <Menu className="main-nav" mode={this.props.main.mode} selectedKeys={[this.props.main.currentKey]}
                  onClick={this.handleClick}>
              {
                pages.map((item) => {
                  return (
                    <Menu.Item key={item.name}>
                      <Link to={item.path}>
                        <FormattedMessage id={item.title}/>
                      </Link>
                    </Menu.Item>
                  )
                })
              }
            </Menu>
          </Col>
        </Row>
      </header>
    )
  }
}

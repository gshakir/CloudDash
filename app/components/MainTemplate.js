import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { isLoggedIn } from '../utils/AwsHelpers'
import { LinkContainer } from 'react-router-bootstrap'

import 'react-bootstrap-table/css/react-bootstrap-table.min.css'
import '../main.css'

function renderRightBar() {
    const loginItem = renderLoginItem()
        return (
            <Nav pullRight>
                <LinkContainer to={{ pathname: '/services' }}>
                    <NavItem>Services</NavItem>
                </LinkContainer>

                <LinkContainer to={{ pathname: '/regions' }}>
                    <NavItem>Regions</NavItem>
                </LinkContainer>

                { loginItem }

            </Nav>
        )
}

function renderLoginItem() {
    const loggedIn = isLoggedIn()
    if(loggedIn) {
        return(
            <LinkContainer to={{ pathname: '/logout' }}>
            <NavItem>Logout</NavItem>
            </LinkContainer>
        )
    }
    else {
        return(
            <LinkContainer to={{ pathname: '/login' }}>
            <NavItem>Login</NavItem>
            </LinkContainer>
        )
    }
    
}

function renderNavBar() {
    const rightBar = renderRightBar()
    return (
        <Navbar inverse fixedTop fluid>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">CloudDash</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>

            <Navbar.Collapse>
                { rightBar }
            </Navbar.Collapse>
        </Navbar>
    )
}

function MainTemplate(props)  {
    const navbarInstance = renderNavBar()
    return (
        <div>
            <div className='navbar-padding-top'>
                {navbarInstance}
            </div>
            <div className='main-container'>
                <ReactCSSTransitionGroup
                 transitionName="appear"
                 transitionEnterTimeout={500}
                 transitionLeaveTimeout={500}>
                 {React.cloneElement(props.children, {key: props.location.pathname})}
                </ReactCSSTransitionGroup>
            </div>
      </div>
    )
}

export default MainTemplate

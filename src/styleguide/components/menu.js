import React, { Component } from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';
import is from 'styled-is';

const Wrapper = styled.div`
  position: fixed;
  top: ${remcalc(48)};;
  z-index: 9;
  padding: ${remcalc(24)} 0;
  margin-left: ${remcalc(10)};
  height: 96vh;
  overflow: auto;
  background: white;
  width: ${remcalc(270)};
  border-right: ${remcalc(1)} solid ${props => props.theme.grey};
  box-sizing: border-box;
`;
const List = styled.ul`

  list-style: none;
  padding: 0;

  ul.rsg--list-1 {
    padding-left: ${remcalc(36)};
  }

  a.rsg--link-6 {
    color: ${props => props.theme.text};
    margin-bottom: ${remcalc(6)};
  }
  .component-type{
    color:#aaa;
    font-size:16px
  }

`;

const Header = styled.p`
  line-height: ${remcalc(24)};
  color: ${props => props.theme.text};
  font-size: ${remcalc(15)};
  padding: ${remcalc(2)} ${remcalc(24)};
  margin-top: ${remcalc(10)};
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;

  text-decoration: none;
  :hover{
    background-color: #159957;
    background-image: linear-gradient(120deg,#155799,#155799);
  };
  ${is('active')`
    background-color: #159957;
    background-image: linear-gradient(120deg,#155799,#155799);
  `};
`;

const Link = styled.a`
  color: ${props => props.theme.text};
  text-decoration: none;

  :hover{
    color: #fff;
    font-weight: 600;
    .nickname{
      color: #eee;
    };
  };
  .nickname{
    font-size: 12px;
    margin-left: 3px;
    font-weight: 400;
    opacity: .5;
    color: #666;
  };
  .componentName{
    font-size: 15px;
    margin-left: 0;
    font-weight: 400;
    opacity: .85;
  };
  ${is('active')`
    color: #fff;
    font-weight: 600;
    text-decoration:none;
    .nickname{
      color: #eee;
      text-decoration:none;
    };
  `};
`;

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { currentLibrary = '', sections = [] } = this.props;
    const link = decodeURIComponent(window.location.href).split('/#!/')[1] || '/';
    const isActive = name => link === name;
    const items = sections.filter(item => !item.description
        || (item.description.suffix === currentLibrary && !item.description.isDemoPage));

    return (
      <Wrapper>
        <List>
          {
            items.map(({ name, description }) => (
              <li key={name}>
                <Header active={isActive(name)}>
                  <Link active={isActive(name)} href={`/#!/${name}`}>
                    <div className="componentName">{name.split('@')[0]}</div>
                    <div className="nickname">{description ? description.subtitle : null}</div>
                  </Link>
                </Header>
              </li>
            ))
          }
        </List>
      </Wrapper>
    );
  }
}

import React, { Fragment, Component } from 'react';
import { Row, Col, Icon } from 'antd';
import styled, { ThemeProvider } from 'styled-components';
import remcalc from 'remcalc';
import BASE, { topMenus } from './config';
import './common.less';

import theme from '../theme';
import Jimu from './components/jimu';
import Menu from './components/menu';


const Header = styled.header`
  background: ${props => props.theme.greyDarker};
  color: ${props => props.theme.white};
  height: ${remcalc(48)};
  padding: 0 ${remcalc(24)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  z-index: 2;
  right: 0;
  left: 0;
  top:0;
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;

  li {
    a {
      color: ${props => props.theme.white};
      text-decoration: none;
    }
    a.active{
     color: ${props => props.theme.green};
    }

    &:not(:last-child) {
      border-right: ${remcalc(1)} solid ${props => props.theme.text};
      padding-right: ${remcalc(24)};
      margin-right: ${remcalc(24)};
    }
  }
`;
const Content = styled.div`
  margin-left: 0;
  zIndex: 2;
  position: relative;
  background: #fbfbfb;
`;
const Main = styled(Row)`
  width: 100%;
`;
const link = decodeURIComponent(window.location.href).split('/#!/')[1] || '/';
const isMobileDemoPage = link.indexOf('demo') > -1;
const platform = link.split('-')[1];

class StyleGuideRenderer extends Component {
  state = {
    currentLibrary: platform,
  }

  changeLibrary = (library) => {
    this.setState({
      currentLibrary: library,
    });
    // window.scrollTo(0, document.getElementsByTagName('header')[0].offsetTop);
  }

  componentDidMount = () => {
    const { location } = window;
    if (location.hash) {
      this.setState({
        currentLibrary: location.hash.split('@')[1],
      });
    }
  }

  render() {
    const {
      children,
      toc,
    } = this.props;
    const { currentLibrary } = this.state;
    const icons = [<Icon type="dropbox" />, <Icon type="mobile" />, <Icon type="rocket" />];

    const iconsActive = [<Icon type="dropbox" spin />, <Icon type="mobile" spin />, <Icon type="rocket" spin />];

    if (isMobileDemoPage) return children;
    return (
      <ThemeProvider theme={theme}>
        <Fragment>
          <Header>
            <List>
              <li>
                <a href={`/${BASE}`} className={!currentLibrary ? 'active' : ''}>首页</a>
              </li>
              {
                topMenus.map((item, index) => (
                      <li key={item}>
                        <a
                          className={item === currentLibrary ? 'active' : ''}
                          onClick={() => { this.changeLibrary(item); }}
                        >
                          {item === currentLibrary ? iconsActive[index] : icons[index]}
                          {' '}
                          {item}
                        </a>
                      </li>
                    ))
                  }
              {/* <li key="utils"> */}
              {/*  <a target="_blank" rel="noreferrer noopener" href="http://fed.xingfu111.cn/utils/index.html">utils</a> */}
              {/* </li> */}
            </List>
          </Header>
          <Content>
            {
                !currentLibrary ? (
                  <Main>
                    <Col xs={24} lg={24} style={{ padding: '0px 0px 0px 0px' }}>
                      <Jimu />
                    </Col>
                  </Main>
                ) : (
                  <Main>
                    <Col xs={6} lg={4}>
                      <Menu {...toc.props} currentLibrary={currentLibrary} />
                    </Col>
                    <Col xs={18} lg={20} style={{ padding: '58px 10px 10px 10px' }}>
                      {children}
                    </Col>
                  </Main>
                )
              }

          </Content>
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default StyleGuideRenderer;

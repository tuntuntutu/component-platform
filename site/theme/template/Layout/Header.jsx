import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'bisheng/router';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { Menu, Row, Col, Dropdown, Input } from 'antd';
import * as utils from '../utils';

const { Search } = Input;
const fuzzyMath = (item, val) => (item ? item.toLowerCase().indexOf(val.toLowerCase()) > -1 : false);

export default class Header extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
    isMobile: PropTypes.bool.isRequired,
  }
  constructor(props) {
    super(props);

    const { picked = {} } = props;
    const allMenus = Object.values(picked).reduce((ret, item = {}) => {
      item.forEach((component) => {
        const { meta = {} } = component;
        const {
          filename = '', ...others
        } = meta;
        ret.push({
          url: filename.replace(/(\/index)?\.md$/i, '').toLowerCase(),
          ...others,
        });
      });
      return ret;
    }, []);

    this.state = {
      allMenus,
      searchMenuList: [],
    };
  }


  handleSearch = (e) => {
    const val = e.target.value;
    if (!val) {
      this.setState({
        searchMenuList: [],
      });
      return;
    }

    const { allMenus } = this.state;
    this.setState({
      searchMenuList:
        allMenus.filter(item => fuzzyMath(item.title, val) || fuzzyMath(item.subtitle, val)),
    });
  }

  render() {
    const {
      location,
    } = this.props;
    let activeMenuItem = location.pathname.replace(/(^\/|\/$)/g, '').split('/').slice(0, 1).join('/');

    switch (activeMenuItem) {
      case 'components':
      case 'docs':
        activeMenuItem = 'components';
        break;
      default:
        activeMenuItem = 'home';
    }

    const headerClassName = classNames({
      clearfix: true,
    });

    const menu = [
      <Menu className="menu-site" mode="horizontal" selectedKeys={[activeMenuItem]} id="nav" key="nav">
        <Menu.Item key="home">
          <Link to={utils.getLocalizedPathname('/')}>
            <FormattedMessage id="app.header.menu.home" />
          </Link>
        </Menu.Item>
        <Menu.Item key="components">
          <Link to={utils.getLocalizedPathname('/docs/introduce')}>
            <FormattedMessage id="app.header.menu.web" />
          </Link>
        </Menu.Item>
      </Menu>,
    ];

    const searchResult = (<div className="searchResult">{
        this.state.searchMenuList.map(d => (
          <div className="item">
            <Link to={utils.getLocalizedPathname(d.url)}>
              <span>{d.title} {d.subtitle}</span>
            </Link>
          </div>))
      }
    </div>);

    /* eslint-disable max-len */
    return (
      <header id="header" className={headerClassName}>
        <Row>
          <Col xxl={4} xl={5} lg={5} md={6} sm={24} xs={24}>
            <Link to={utils.getLocalizedPathname('/')} id="logo">

              <img alt="logo" src="https://avatars0.githubusercontent.com/u/20634858?s=400&u=29ef93455c186bab6f135e1e0c0b796879ddafde&v=4" />

            </Link>
          </Col>
          <Col xxl={20} xl={19} lg={19} md={18} sm={0} xs={0}>
            <div id="search-box">
              <Dropdown overlay={searchResult}>
                <Search
                  onChange={this.handleSearch}
                  placeholder="请输入组件名搜索"
                />
              </Dropdown>
            </div>
            {menu}
          </Col>
        </Row>
      </header>
    );
    /* eslint-disable max-len */
  }
}

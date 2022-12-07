import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Icon } from 'antd';
import BASE from './config';

const Wrapper = styled.section`
  margin-top: 1.5rem;
  margin-bottom: 2.875rem;
`;
const Section = styled.div`
  border: 1px solid #ced4de;
  display: inline-block;
  width: 100%;
  position: relative;
  margin: 0 0 16px;
`;
const Demo = styled.div`
  padding: 20px 24px 20px;
  color: rgba(0, 0, 0, 0.65);
  border-width: 1px;
  border-style: solid;
  border-color: rgb(206, 212, 222);
  border-image: initial;
`;
const MobileDemo = styled.div`
  width: 375px;
  height: 584px;
  margin: 10px 0;
  margin-left: 50px;
  overflow: auto;
  border-radius: 10px;
  border: 5px solid #444;
  .iframe {
    width: 100%;
    height: 543px;
    border-top: none;
    border-image: initial;
    box-shadow: rgb(235, 235, 235) 0px 2px 4px;
  }
  iframe {
    background-color: #f5f5f9;
  }
`;
const DemoHeader = styled.div`
  border-radius: 4px 4px 0 0;
  background: linear-gradient(rgba(55, 55, 55, 0.98), #545456);
  text-align: center;
  .statbar {
    height: 28px;
    img {
      margin: 0px 2px;
    }
  }
  .urlBox {
    width: 350px;
    height: 28px;
    line-height: 28px;
    color: #fff;
    background-color: #a2a2a2;
    margin: 0 auto;
    border-radius: 4px;
    white-space: nowrap;
    overflow-x: scroll;
    display: none;
  }
`;
const Code = styled.div`
  overflow: auto;
  line-height: 1.5;
`;
const MobilePage = styled.div`
  width: 100%;
  height: 100%;
  .toggleBtn {
    position: fixed;
    bottom: 20px;
    right: 0;
    padding: 5px 10px;
    background-color: #159957;
    background-image: linear-gradient(120deg, #155799, #0a3561);
    color: #fff;
    border-radius: 10px 0 0 10px;
    box-shadow: 0 1px 10px 1px rgba(59, 107, 174, 0.2);
    z-index: 9999;
  }
  .codePanel {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    z-index: 9999;
  }
  .closeBtn {
    position: fixed;
    top: 5px;
    right: 5px;
    padding: 5px;
    background-color: rgba(51, 136, 255, 0.95);
    color: #fff;
    z-index: 999;
    box-shadow: 0 1px 10px 1px rgba(59, 107, 174, 0.2);
  }
`;
const Toolbar = styled.div`
  display: flex;
  -webkit-box-pack: end;
  justify-content: flex-end;
  padding: 0px 5px;
  background: rgb(246, 247, 249);
  border-left: 1px solid rgb(206, 212, 222);
  border-bottom: 1px solid rgb(206, 212, 222);
  .btn {
    font-size: 12px;
    text-transform: uppercase;
    color: rgba(45, 55, 71, 0.4);
    background: transparent;
    transition: color 0.3s ease 0s;
    padding: 3px 10px;
    border-left: 1px solid rgb(206, 212, 222);
  }
`;
window.sessionStorage.setItem('update-mobile', '0');// 利用每次菜单点击会触发playground.js初始化来强制重刷mobile-demo
class Playground extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCode: false,
      showMobilePageCode: false,
    };
  }



  toggleCodePanel = () => {
    this.setState(prevState => ({ showCode: !prevState.showCode }));
  };

  toggleMobilePageCodePanel = tag => () => {
    this.setState({ showMobilePageCode: tag });
  };

  hashHandler = () => {
    const { location, sessionStorage } = window;

    if (location.hash.indexOf('mobile-demo') > -1 && window.sessionStorage.getItem('update-mobile') === '0') {
      sessionStorage.setItem('update-mobile', '1');
      location.reload();
    }
  }

  componentDidMount = () => {
    const { addEventListener } = window;
    addEventListener('hashchange', this.hashHandler);
  }

  componentWillUnmount() {
    const { removeEventListener } = window;
    removeEventListener('hashchange', this.hashHandler);
  }

  showPreview = (preview, code) => ({
    ...preview,
    props: {
      ...preview.props,
      code,
    },
  })


  render() {
    const { preview, tabBody, name } = this.props;
    const { showCode, showMobilePageCode } = this.state;
    const propCode = preview.props.code;
    let isMobile = false;
    const names = name.split('@');
    const link = decodeURIComponent(window.location.href).split('/#!/')[1];
    const isMobileDemoPage = (link || '').indexOf('demo') > -1;

    if (names.length > 1 && names[1] === 'mobile') {
      isMobile = true;
    }

    // 这是iframe嵌入的内容
    if (isMobileDemoPage) {
      return (
        <MobilePage>
          <span className="toggleBtn" onClick={this.toggleMobilePageCodePanel(true)}>
            修改代码
          </span>
          {this.showPreview(preview, propCode)}
          {showMobilePageCode ? (
            <div className="codePanel">
              <Button className="closeBtn" onClick={this.toggleMobilePageCodePanel(false)}>
                <Icon type="close" />
              </Button>
              {tabBody}
            </div>
          ) : null}
        </MobilePage>
      );
    }

    return (
      <Wrapper>
        {isMobile ? (
          <MobileDemo>
            <DemoHeader>
              <div className="statbar">
                <img
                  width="350Px"
                  alt="presentation"
                  src="https://os.alipayobjects.com/rmsportal/VfVHYcSUxreetec.png"
                />
              </div>
              {/* <div style={{ height: '40px' }}>
                    <div
                      className="urlBox"
                    >
                      {`${window.location.href}-demo`}
                    </div>
                  </div> */}
            </DemoHeader>
            <div className="iframe">
              <iframe
                frameBorder="0"
                title="效果展示"
                width="100%"
                height="100%"
                src={`${BASE ? `/${BASE}` : ''}/#!/${link}-demo`}
              />
            </div>
          </MobileDemo>
        ) : (
          <Section>
            <Demo>{this.showPreview(preview, propCode)}</Demo>
            <Toolbar>
              <span className="btn" onClick={this.toggleCodePanel}>
                &lt;&gt;
              </span>
            </Toolbar>
            {showCode ? <Code>{tabBody}</Code> : null}
          </Section>
        )}
      </Wrapper>
    );
  }
}

export default Playground;

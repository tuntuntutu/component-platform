import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Modal, message, Row, Col } from 'antd';

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {

  }


  render() {
    return (
      <footer id="footer">
        <div className="footer-wrap">
          <Row>
            <Col md={4} sm={24} xs={24}>
              <div className="footer-center">
                <h2><FormattedMessage id="app.footer.resources" /></h2>
              </div>
            </Col>
            <Col md={4} sm={24} xs={24}>
              <div className="footer-center">
                <h2>web技术文档</h2>
                <div>
                  <a target="_blank" href="http://webpack.css88.com/">webpack</a>
                </div>
                <div>
                  <a target="_blank" href="http://react.css88.com/">react</a>
                </div>
                <div>
                  <a target="_blank" href="http://www.css88.com/doc/chrome-devtools/">chrome调试</a>
                </div>
              </div>
            </Col>
            <Col md={4} sm={24} xs={24}>
              <div className="footer-center">
                <h2><FormattedMessage id="app.footer.tools" /></h2>
                <div>
                  <a target="_blank" href="http://tool.chinaz.com/regex/">正则测试</a>
                </div>
                <div>
                  <a target="_blank" href="http://zhitu.isux.us/">图片压缩</a>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="bottom-bar">
          Made with by <FormattedMessage id="app.footer.company" />
        </div>
      </footer>
    );
  }
}

export default injectIntl(Footer);

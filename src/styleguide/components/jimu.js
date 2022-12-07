import React from 'react';


let time = null;
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ['base start', 'stack start', 'cube start'],
    };
  }

  componentDidMount() {
    this.setState({ status: ['base', 'stack', 'cube'] });
    time = setInterval(() => {
      const { status } = this.state;
      this.setState({ status: status[0] === 'base start' ? ['base', 'stack', 'cube'] : ['base start', 'stack start', 'cube start'] });
    }, 2200);
  }

  componentWillUnmount() {
    clearInterval(time);
  }

  render() {
    const { status } = this.state;
    return (
      <div className="jimu-index">
        <div className="wrapper">
          <div className="artboard">
            <div className={status[0]}>
              <div className="top" />
              <div className="left" />
              <div className="right" />
            </div>
            <div className={status[1]} id="stack-1">
              <div className="top" />
              <div className="left" />
              <div className="right" />
            </div>
            <div className={status[1]} id="stack-2">
              <div className="top" />
              <div className="left" />
              <div className="right" />
            </div>
            <div className={status[1]} id="stack-3">
              <div className="top" />
              <div className="left" />
              <div className="right" />
            </div>
            <div className={status[2]} id="cube-1">
              <div className="top" />
              <div className="left" />
              <div className="right" />
            </div>
            <div className={status[2]} id="cube-2">
              <div className="top" />
              <div className="left" />
              <div className="right" />
            </div>
            <div className={status[2]} id="cube-3">
              <div className="top" />
              <div className="left" />
              <div className="right" />
            </div>
          </div>
        </div>
        <div className="box">
          <h3>
            前端文档库
          </h3>
          <p>减少相似业务场景重复造轮</p>
          <p>统一交互，统一UI，统一系统风格</p>
        </div>
      </div>
    );
  }
}

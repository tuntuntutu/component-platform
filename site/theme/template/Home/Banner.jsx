import React from 'react';
import PropTypes from 'prop-types';
import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';
import { Link } from 'bisheng/router';
import { FormattedMessage } from 'react-intl';
import * as utils from '../utils';

const loop = {
  duration: 3000,
  yoyo: true,
  repeat: -1,
};

class Banner extends React.PureComponent {
  static contextTypes = {
    intl: PropTypes.object.isRequired,
  }

  static propTypes = {
    className: PropTypes.string,
  }

  static defaultProps = {
    className: 'banner',
  }
  componentDidMount() {
    var $ = {};

    $.Particle = function( opt ) {
      this.radius = 7;
      this.x = opt.x;
      this.y = opt.y;
      this.angle = opt.angle;
      this.speed = opt.speed;
      this.accel = opt.accel;
      this.decay = 0.01;
      this.life = 1;
    };

    $.Particle.prototype.step = function( i ) {
      this.speed += this.accel;
      this.x += Math.cos( this.angle ) * this.speed;
      this.y += Math.sin( this.angle ) * this.speed;
      this.angle += $.PI / 64;
      this.accel *= 1.01;
      this.life -= this.decay;

      if( this.life <= 0 ) {
        $.particles.splice( i, 1 );
      }
    };

    $.Particle.prototype.draw = function( i ) {
      $.ctx.fillStyle = $.ctx.strokeStyle = 'hsla(' + ( $.tick + ( this.life * 120 ) ) + ', 100%, 60%, ' + this.life + ')';
      $.ctx.beginPath();
      if( $.particles[ i - 1 ] ) {
        $.ctx.moveTo( this.x, this.y );
        $.ctx.lineTo( $.particles[ i - 1 ].x, $.particles[ i - 1 ].y );
      }
      $.ctx.stroke();

      $.ctx.beginPath();
      $.ctx.arc( this.x, this.y, Math.max( 0.001, this.life * this.radius ), 0, $.TWO_PI );
      $.ctx.fill();

      var size = Math.random() * 1.25;
      $.ctx.fillRect( ~~( this.x + ( ( Math.random() - 0.5 ) * 35 ) * this.life ), ~~( this.y + ( ( Math.random() - 0.5 ) * 35 ) * this.life ), size, size );
    }

    $.step = function() {
      $.particles.push( new $.Particle({
        x: $.width / 2 + Math.cos( $.tick / 20 ) * $.min / 2,
        y: $.height / 2 + Math.sin( $.tick / 20 ) * $.min / 2,
        angle: $.globalRotation + $.globalAngle,
        speed: 0,
        accel: 0.01
      }));

      $.particles.forEach( function( elem, index ) {
        elem.step( index );
      });

      $.globalRotation += $.PI / 6;
      $.globalAngle += $.PI / 6;
    };

    $.draw = function() {
      $.ctx.clearRect( 0, 0, $.width, $.height );

      $.particles.forEach( function( elem, index ) {
        elem.draw( index );
      });
    };

    $.init = function() {
      $.canvas = document.getElementById('homeCanvas');
      $.ctx = $.canvas.getContext( '2d' );
      $.width = 800;
      $.height = 800;
      $.canvas.width = $.width * window.devicePixelRatio;
      $.canvas.height = $.height * window.devicePixelRatio;
      $.canvas.style.width = "50%";
      // $.canvas.style.height = $.height + 'px';
      $.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      $.min = $.width * 0.5;
      $.particles = [];
      $.globalAngle = 0;
      $.globalRotation = 0;
      $.tick = 0;
      $.PI = Math.PI;
      $.TWO_PI = $.PI * 2;
      $.ctx.globalCompositeOperation = 'lighter';
      document.body.appendChild( $.canvas );
      $.loop();
    };

    $.loop = function() {
      requestAnimationFrame( $.loop );
      $.step();
      $.draw();
      $.tick++;
    };

    $.init();
  }

  componentWillUnmount() {
     const node =  document.getElementById('homeCanvas');
     node && node.parentNode.removeChild(node)
  }

  render() {
    const { className } = this.props;
    const { intl: { locale } } = this.context;
    const circleList = [
        {x: 700, y: 10, r: 10 },
        {x: 1000, y: 50, r: 15 },
        {x: 1060, y: 390, r: 14 },
        {x: 990, y: 600, r: 7 },
        {x: 30, y: 550, r: 12 },
        {x: 230, y: 450, r: 15 },
        {x: 100, y: 100, r: 8 }
      ]

    return (
      <div className="home-page-wrapper banner-wrapper" id="banner">
        <div className="banner-bg-wrapper">
          <svg width="100%" height="100%" viewBox="0 0 1200 800" fill="none">
            { circleList.map((item, index)=>{
              return    <TweenOne key={index} component="g" animation={[{ opacity: 0, type: 'from', duration: 400 * index /2 }, { ...loop, y: 50 }]}>
                <circle id="Oval-9-Copy-4" cx={item.x} cy={item.y} r={item.r} stroke="#f5222d" strokeWidth="2"  />
              </TweenOne>
            }) }
          </svg>
        </div>
        <canvas id="homeCanvas" className="homeCanvas" />
        <QueueAnim className={`${className} page`} type="alpha" delay={150}>
          <QueueAnim
            className="text-wrapper"
            key="text"
            type="bottom"
          >
            <h1 key="h1">
              C³
            </h1>
            {/*<p key="p">*/}
              {/*<FormattedMessage id="app.home.introduce" />*/}
            {/*</p>*/}
            <div className="banner-btns" key="pcBtn">
              <Link className="banner-btn components mobile" to={utils.getLocalizedPathname('/docs/introduce')}>
                <FormattedMessage id="app.home.getting-started-web" />
              </Link>
            </div>
          </QueueAnim>
        </QueueAnim>
      </div>
    );
  }
}

export default Banner;

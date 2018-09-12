import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import DocumentTitle from 'react-document-title';
import { getChildren } from 'jsonml.js/lib/utils';
import { Timeline, Alert, Affix } from 'antd';
import delegate from 'delegate';
// import { ping } from '../utils';

export default class Article extends React.Component {
  static contextTypes = {
    intl: PropTypes.object.isRequired,
  }

  componentDidMount() {
    // Add ga event click
    this.delegation = delegate(this.node, '.resource-card', 'click', (e) => {
      if (window.ga) {
        window.ga('send', 'event', 'Download', 'resource', e.delegateTarget.href);
      }
    }, false);
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    const links = [...document.querySelectorAll('.outside-link.internal')];
    if (links.length === 0) {
      return;
    }
    // this.pingTimer = ping((status) => {
    //   if (status !== 'timeout' && status !== 'error') {
    //     links.forEach(link => (link.style.display = 'block'));
    //   } else {
    //     links.forEach(link => link.parentNode.removeChild(link));
    //   }
    // });
  }

  componentWillUnmount() {
    // clearTimeout(this.pingTimer);
    if (this.delegation) {
      this.delegation.destroy();
    }
  }

  getArticle(article) {
    const { content } = this.props;
    const { meta } = content;
    if (!meta.timeline) {
      return article;
    }
    const timelineItems = [];
    let temp = [];
    let i = 1;
    Children.forEach(article.props.children, (child) => {
      if (child.type === 'h2' && temp.length > 0) {
        timelineItems.push(<Timeline.Item key={i}>{temp}</Timeline.Item>);
        temp = [];
        i += 1;
      }
      temp.push(child);
    });
    if (temp.length > 0) {
      timelineItems.push(<Timeline.Item key={i}>{temp}</Timeline.Item>);
    }
    return cloneElement(article, {
      children: <Timeline>{timelineItems}</Timeline>,
    });
  }

  render() {
    const { props } = this;
    const { content } = props;
    const { meta, description } = content;
    const { title, subtitle, filename } = meta;
    const { intl: { locale } } = this.context;

    return (
      <DocumentTitle title={`${title[locale] || title}`}>
        <article className="markdown" ref={(node) => { this.node = node; }}>
          <h1>
            {title[locale] || title}
            {
              !subtitle
                ? null
                : <span className="subtitle">{subtitle}</span>
            }
          </h1>
          {
            !description
              ? null
              : props.utils.toReactComponent(
                ['section', { className: 'markdown' }].concat(getChildren(description))
              )
          }
          {
            (!content.toc || content.toc.length <= 1 || meta.toc === false) ? null : (
              <Affix className="toc-affix" offsetTop={16}>
                {
                  props.utils.toReactComponent(
                    ['ul', { className: 'toc' }].concat(getChildren(content.toc))
                  )
                }
              </Affix>
            )
          }
          {
            this.getArticle(props.utils.toReactComponent(
              ['section', { className: 'markdown' }].concat(getChildren(content.content))
            ))
          }
          {
            props.utils.toReactComponent(
              ['section', {
                className: 'markdown api-container',
              }].concat(getChildren(content.api || ['placeholder']))
            )
          }
        </article>
      </DocumentTitle>
    );
  }
}
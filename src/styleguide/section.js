import React from 'react';
import styled from 'styled-components';
import { Card } from 'antd';
import remcalc from 'remcalc';

const Header = styled.header`
  background: ${props => props.theme.primary};
  padding: ${remcalc(20)} ${remcalc(80)};
  position: relative;
  background-color: #159957;
  background-image: linear-gradient(120deg, #155799, #159957);
`;
const H2 = styled.h2`
  color: #fff;
  font-size:2rem;
  margin-bottom:0;
`;
const Tips = styled.div`
  font-size: 14px;
  color: #fbfbfb;
`;

const Main = styled.div`
  padding: ${remcalc(50)} ${remcalc(120)};

  h4[class*='rsg--heading'] {
    line-height: ${remcalc(26)};
    font-size: ${remcalc(21)};
  }
`;

export default (allProps) => {
  const {
    name, description, content, components, sections,
  } = allProps;
  const link = decodeURIComponent(window.location.href).split('/#!/')[1] || '/';
  const isMobileDemoPage = link.indexOf('demo') > -1;
  const contentOnlyDemo = React.cloneElement(content,
    {
      ...content.props,
      examples: content.props.examples.filter(item => item.type === 'code'),
    });

  if (isMobileDemoPage) {
    return contentOnlyDemo;
  }
  return (
    <Card style={{ minHeight: '90vh' }} bodyStyle={{ padding: 0 }}>
      <Header>
        <H2>{name.split('@')[0]}</H2>
        <Tips>{description.description}</Tips>
      </Header>
      <Main>
        <div className="md-content">
          {content}
        </div>
        {/* 渲染子组件，用于二级菜单 */}
        {components}
        {/* 渲染子文档，用于二级菜单 */}
        {sections}
      </Main>
    </Card>
  );
};

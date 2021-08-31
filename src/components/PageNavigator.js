import React from 'react';
import Scrollspy from './ScrollSpy';
import './PageNavigator.css';

const PageNavigator = ({
  items,
  offsetElementTop,
  offsetContainerTop,
  offsetContainerBottom,
}) => (
  <Scrollspy
    componentTag="nav"
    className="nav flex-nowrap justify-content-md-around page-navigator"
    currentClassName="active"
    items={items.map((item) => item.toLowerCase())}
    rootEl=".App-page-wrapper"
    offsetElementTop={offsetElementTop}
    offsetContainerTop={offsetContainerTop}
    offsetContainerBottom={offsetContainerBottom}
  >
    {items.map((item) => (
      <a key="item" className="nav-link" href={'#' + item.toLowerCase()}>
        {item}
      </a>
    ))}
  </Scrollspy>
);

export default PageNavigator;

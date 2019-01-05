import React from 'react';
import { Link } from 'gatsby';
import './Layout.css';

import { rhythm, scale } from '../utils/typography'
import { redirectTo } from '@reach/router';
import ThreeScene from './threeScene';

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    console.log(children);
    let header;
    return (
      <div className="main-wrapper">
        <div
          className="first-column"
        >
          <div style={{color: '#07ff13',}}>
            <h2 style={{color: '#07ff13', marginTop: 10, minWidth: '80vh'}}>ANDRÉ RODRÍGUEZ</h2>
            <div>
              <strong>Software Engineer</strong>
              <p>Based in San José, Costa Rica</p>
            </div>
          </div>
        </div>
        <div
          className="second-column">
          <ThreeScene>
            {header}
            {children}
            <footer className="footer">
              © {new Date().getFullYear()}, André Rodríguez
            </footer>
          </ThreeScene>
        </div>
      </div>
    )
  }
}

export default Layout;

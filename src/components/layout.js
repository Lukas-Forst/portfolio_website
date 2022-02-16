import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './header'

import {
  container,
  heading,
  navLinks,
  navLinkItem,
  navLinkText,
  siteTitle,
 
} from './layout.module.css'

const Layout = ({ pageTitle, children }) => {
    const data = useStaticQuery(graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `)
    
    return (
      <>
      <Header siteTitle={pageTitle}>{data.site.siteMetadata.title}</Header>
      <div className={container}>
         
        
        
        <div>
          
          {children}

        </div>

      </div>
      </>
    )
  }
  
  export default Layout
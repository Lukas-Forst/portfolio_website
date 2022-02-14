import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
//import styles from "./App.module.css";
import CardPage from "./Card";
import CardPage_2 from "./Card_2";
//import posts from "../data/posts";
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
      <div className={container}>
        <title>{pageTitle} | {data.site.siteMetadata.title}</title>
        <header className={siteTitle}>{data.site.siteMetadata.title}</header>
        <nav>
          <ul className={navLinks}>
            <li className={navLinkItem}>
              <Link to="/" className={navLinkText}>
                Home
              </Link>
            </li>
            <li className={navLinkItem}>
              <Link to="/about" className={navLinkText}>
                About
              </Link>
            </li>
            <li className={navLinkItem}>
              <Link to="/blog" className={navLinkText}>
                Blog
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <h1 className={heading}>{pageTitle}</h1>
          {children}

        </div>
        <CardPage link_1 = "https://github.com/Lukas-Forst/Movie_rec_sys" link_2 = "https://github.com/Lukas-Forst/DeepLearning" />
        <CardPage_2 link_1 = "https://github.com/Lukas-Forst/Movie_rec_sys" link_2 = "https://github.com/Lukas-Forst/DeepLearning" />

      </div>
    )
  }
  
  export default Layout
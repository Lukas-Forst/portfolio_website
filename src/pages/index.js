import * as React from 'react'
import Layout from '../components/layout'
import Hero from '../components/Hero';
import Project from '../components/project'
import AboutPage from './about';
import { Helmet } from "react-helmet"

const IndexPage = () => {
  return (
    <div style={{background:"#09273d"}}>
      <Helmet>
          
          <meta charSet="utf-8" name="description" content="personal portfolio site to highlight projects"/>
          <title>Lukas Forst</title>
          <link rel="canonical" href="http://mysite.com/example" />
          <html lang="en" />
        </Helmet>
    <Layout pageTitle="Home Page">
      
      
    </Layout>
    <Hero />
    <Project />
    <AboutPage />
    </div>
  )
}

export default IndexPage
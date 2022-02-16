import * as React from 'react'
import Layout from '../components/layout'
import Hero from '../components/Hero';
import Project from '../components/project'
import AboutPage from './about';

const IndexPage = () => {
  return (
    <div style={{background:"#09273d"}}>
    <Layout pageTitle="Home Page">
      
      
    </Layout>
    <Hero />
    <Project />
    <AboutPage />
    </div>
  )
}

export default IndexPage
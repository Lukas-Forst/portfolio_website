import * as React from 'react'
import Layout from '../components/layout'
import { StaticImage } from 'gatsby-plugin-image'
//import AboutPage from './about.js'

const IndexPage = () => {
  return (
    <Layout pageTitle="Home Page">
      <p>I'm making this by following the Gatsby Tutorial.</p>
      <StaticImage
        alt="Clifford, a reddish-brown pitbull, dozing in a bean bag chair"
        src="../images/geio-tischler.jpg"
      />
      <p>Photo by <a href="https://unsplash.com/@oww?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Geio Tischler</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  </p>
    </Layout>
   
  )
}

export default IndexPage
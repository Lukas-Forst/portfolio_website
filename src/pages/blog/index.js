import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layout'
import { Helmet } from "react-helmet"

const BlogPage = ({ data }) => {
  return (
    <div style={{background:"#09273d", height:"100vh"}}>
    <Helmet>
          
          <meta charSet="utf-8" name="personal portfolio site to highlight projects"/>
          <title>Lukas Forst</title>
          <link rel="canonical" href="http://mysite.com/example" />
          <html lang="en" />
        </Helmet>
    <Layout pageTitle="My Blog Posts" >
      <div style={{marginTop: "5%"}}>
      {
        data.allMdx.nodes.map(node => (
          <article key={node.id}>
            <h2 >
              <Link to={`/blog/${node.slug}`} style={{color: "white", textDecoration:"none"}}>
                {node.frontmatter.title}
              </Link>
            </h2>
            <p style={{color: "white"}}>Posted: {node.frontmatter.date}</p>
          </article>
        ))
      }
      </div>
    </Layout>
    </div>
  )
}

export const query = graphql`
  query {
    allMdx(sort: {fields: frontmatter___date, order: DESC}) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
        }
        id
        slug
      }
    }
  }
`

export default BlogPage
import * as React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { Helmet } from "react-helmet"

import Header from '../../components/header'

const BlogPost = ({ data }) => {
  //const image = getImage(data.mdx.frontmatter.hero_image)
  return (
    <div style={{background:"#09273d", color: "white", textDecoration: "none"}}>
      <Helmet>
          <meta charSet="utf-8" name="description" content={data.mdx.frontmatter.title}/>
          <title>{data.mdx.frontmatter.title}</title>
          <link rel="canonical" href="http://mysite.com/example" />
          <html lang="en" />
        </Helmet>
    <Header siteTitle={data.mdx.frontmatter.title}>{data.mdx.frontmatter.title}</Header>
    <div className='container'>
      <MDXRenderer>
        {data.mdx.body}
      </MDXRenderer>
    
    </div>
    </div>
  )
}

export const query = graphql`
  query($id: String) {
    mdx(id: {eq: $id}) {
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        hero_image_alt
        hero_image_credit_link
        hero_image_credit_text
        hero_image 
      }
    }
  }
`

export default BlogPost
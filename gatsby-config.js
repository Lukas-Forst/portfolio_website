module.exports = {
    siteMetadata: {
      title: "My Super Cool Blog",
      menuLinks:[
              {
                 name:'home',
                 link:'/'
              },
              {
                 name:'page2',
                 link:'/page-2'
              }
            ]
    },
    plugins: [
      "gatsby-plugin-image",
      "gatsby-plugin-sharp",
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `blog`,
          path: `${__dirname}/blog/`,
        },
      },
      "gatsby-plugin-mdx",
      "gatsby-transformer-sharp",
      "gatsby-plugin-postcss",
      "gatsby-plugin-react-helmet",
      `gatsby-plugin-fontawesome-css`,
      
    ],
  };
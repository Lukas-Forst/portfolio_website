import * as React from 'react'
import * as Style from './about.module.css'
import { StaticImage } from 'gatsby-plugin-image'

import {Link} from 'gatsby'

const AboutPage = () => {
  return (
    <section className='container'>
      
      <div className={Style.social}><h2>You can contact me over my other social platforms.</h2></div>
      <div className='row text-center'>
        
          <div className='col-sm'>
            <Link href="https://github.com/lukas-forst" aria-label="GitHub profile"><StaticImage style={{borderRadius:"55px", maxHeight: 'calc(50vh - 4rem)' }} className={Style.socialimage} src="../img/github.png" /></Link>
            <p style={{color: "white"}}><br/>Github</p>
          </div>
          <div className='col-sm'>
            <Link href="https://www.linkedin.com/in/lukasforst/" aria-label="LinkedIn profile"><StaticImage style={{borderRadius:"25px" }} className={Style.socialimage} src="../img/linkedin.png" /></Link>
            <p style={{color: "white"}}><br/>LinkedIn</p>
          </div>
          <div className='col-sm'>
            <Link href="https://medium.com/@lukas.forst" aria-label="Medium profile"><StaticImage style={{borderRadius:"25px" }} className={Style.socialimage} src="../img/medium.png" /></Link>
            <p style={{color: "white"}}><br/>Medium</p>
          </div>
          <div className='col-sm'>
            <Link href="https://public.tableau.com/app/profile/lukas.forst" aria-label="Tableau public profile"><StaticImage style={{borderRadius:"25px" }} className={Style.socialimage} src="../img/tableau.png" /></Link>
            <p style={{color: "white"}}><br/>Tableau Public</p>
          </div>
       
      </div>


      
    </section>
  )
}

export default AboutPage
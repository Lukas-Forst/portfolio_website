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


      <div className={Style.impressum}>
      <p>Icons from</p>
      <a href="https://www.flaticon.com/free-icons/python-file" title="python file icons">Python file icons created by Flat Icons - Flaticon</a>
      <a href="https://www.flaticon.com/de/kostenlose-icons/schiefer" title="schiefer Icons">Schiefer Icons erstellt von Eucalyp - Flaticon</a>
      <a href="https://www.flaticon.com/de/kostenlose-icons/graph" title="graph Icons">Graph Icons erstellt von Eucalyp - Flaticon</a>
      <a href="https://www.flaticon.com/free-icons/deep-learning" title="deep learning icons">Deep learning icons created by Becris - Flaticon</a>
      <a href="https://www.flaticon.com/free-icons/medium" title="medium icons">Medium icons created by Freepik - Flaticon</a>
      <a href="https://www.flaticon.com/de/kostenlose-icons/linkedin" title="linkedin Icons">Linkedin Icons erstellt von Google - Flaticon</a>
      <a href="https://icons8.com/icons/set/tableau-public" title="tableau icons">Tableau icon created by icons8</a>
      </div>
    </section>
  )
}

export default AboutPage
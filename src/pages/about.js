import * as React from 'react'
import * as Style from './about.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { fagithub } from '@fortawesome/free-solid-svg-icons'
import { StaticImage } from 'gatsby-plugin-image'

import {Link} from 'gatsby'

const AboutPage = () => {
  return (
    <section className='container'>
      
      <div className={Style.social}><h2>You can contact me over my other social platforms.</h2></div>
      <div className='row text-center'>
        
          <div className='col-sm'>
            <p>Github</p>
            <FontAwesomeIcon icon="fa-brands fa-github-alt" />
            <Link href="https://github.com/lukas-forst"><StaticImage style={{borderRadius:"55px", maxHeight: 'calc(50vh - 4rem)' }} className={Style.socialimage} src="../img/github.png" /></Link>
          </div>
          <div className='col-sm'>
            <p>LinkedIn</p>
            <Link href="https://www.linkedin.com/in/lukasforst/"><StaticImage style={{borderRadius:"25px" }} className={Style.socialimage} src="../img/linkedin.png" /></Link>
          </div>
          <div className='col-sm'>
            <p>Medium</p>
            <Link href="https://medium.com/@lukas.forst"><StaticImage style={{borderRadius:"25px" }} className={Style.socialimage} src="../img/medium.png" /></Link>
          </div>
          <div className='col-sm'>
            <p>Tableau Public</p>
            <Link href="https://public.tableau.com/app/profile/lukas.forst"><StaticImage style={{borderRadius:"25px" }} className={Style.socialimage} src="../img/tableau.png" /></Link>
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
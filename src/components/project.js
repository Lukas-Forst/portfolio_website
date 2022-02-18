import React from "react"
import {Link} from 'gatsby'
import classNames from "classnames";
import {textContainer, card,card1,card2 ,card3, card4 } from './project.module.css'




const Project = () => (
    <div className="container">
      <div className={textContainer}>
      <div className="content-section-heading text-center">
            <h2 className="mb-0">Portfolio</h2>
            <h2 className="mb-5">Recent Projects</h2>
        </div>
        </div>
  <div className="row row-cols-2">
    <div className="col">
    <Link to="https://github.com/Lukas-Forst/Python" className="nav-link" activeClassName="active">
      <div className={classNames([card, card1])}>
        <h3>Python projects</h3>
        <p>Collection of python projects containing simple projects like a time calculator upto a budget app.</p>
      </div>
      </Link>
    </div>
    <div className="col">
    <Link to="https://github.com/Lukas-Forst/Movie_rec_sys" className="nav-link" activeClassName="active">
      <div className={classNames([card, card2])}>
        <h3>Movie Recommendation</h3>
        <p>Python Command line project using the command line and tree datastructure.</p>
      </div>
      </Link>
    </div>
    <div className="col">
    <Link to="https://github.com/Lukas-Forst/DeepLearning" className="nav-link" activeClassName="active">
      <div className={classNames([card, card3])}>
        <h3>Deep learning projects</h3>
        <p>collection of different deep learning projects. Containing Dogbreed classification, bikeshare analysis and more.</p>
      </div>
      </Link>
    </div>
    <div className="col">
    <Link to="https://github.com/Lukas-Forst/data-analysis" className="nav-link" activeClassName="active">
      <div className={classNames([card, card4])}>
        <h3>Data visualization</h3>
        <p>Sample analysis of datasets ranging from boston airbnb data to world happiness report.</p>
      </div>
      </Link>
    </div>
  </div>
</div>
)

export default Project
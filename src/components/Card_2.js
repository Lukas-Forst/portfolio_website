import React from 'react';
import classNames from "classnames";
import {
  anchor_style,
  wrapper_blue,
  wrapper_text,
  flex_parent_element,
  wrapper_yellow,
} from './Card.module.css'

export const CardPage_2 = (link_1, link_2) => {
  
  const title= "abc"
  const body= "lorem ipsum dolorem"
  return (
    <section className={flex_parent_element}>
      
        
      <a href={link_1} className={anchor_style}>
        <div className={wrapper_blue} >
          <div className={wrapper_text}>
            <h1>{title}</h1>
              <p>{body}</p>
          </div>
        </div>
      </a>
 
     
      <a href={link_2} className={anchor_style}>
        <div className={wrapper_yellow}>
          <div className={wrapper_text}>
            <h1>{title}</h1>
              <p>{body}</p>
          </div>
        </div>
      </a>
      
    </section>

  );
};

export default CardPage_2;

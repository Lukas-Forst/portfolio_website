import React from 'react';
import classNames from "classnames";
import {
  anchor_style,
  wrapper,
  wrapper_text,
  flex_parent_element,
  flex_child_element,
  wrapper_green,
} from './Card.module.css'

export const CardPage = (link_1, link_2) => {
 
  const title= "abc"
  const body= "lorem ipsum dolorem"
  return (
    <section className={flex_parent_element}>
      
        
      <a href={link_1} className={anchor_style}>
        <div className={wrapper} >
          <div className={wrapper_text}>
            <h1>{title}</h1>
              <p>{body}</p>
          </div>
        </div>
      </a>
 
     
      <a href={link_2} className={anchor_style}>
        <div className={wrapper_green}>
          <div className={wrapper_text}>
            <h1>{title}</h1>
              <p>{body}</p>
          </div>
        </div>
      </a>
      
    </section>

  );
};

export default CardPage;

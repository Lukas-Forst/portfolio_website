import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"

export function Hero() {
  return (
    <div style={{ display: "grid" }}>
      
      <StaticImage
        style={{
          gridArea: "1/1",

        }}
        layout="fullWidth"
        aspectRatio={2 / 1}
        alt="river front kanazawa"
        src={
          "../images/river_front_v2_cut.jpg"
        }
        formats={["auto", "webp", "avif"]}
      />
      <div
        style={{
          gridArea: "1/1",
          position: "relative",
          placeItems: "center",
          display: "grid",
        }}
      >
        <div>
        <h1 style={{color:"white"}}>Hi I'm Lukas</h1>
        <p style={{color:"white"}}>a business computer science graduate who is intrested in anything related to data science, data analytics and data vizualisation. <br /> I enjoy fotography, coding, learning and anyform of exercise.</p>
        </div>
      </div>
    </div>
  )
}
export default Hero
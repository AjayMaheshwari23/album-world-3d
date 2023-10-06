import React, { useState, useEffect } from "react";
import "../CSS/View2.css";
import { Image } from "antd";
import img1 from '../assets/1.png'
let divs = [];

const View2 = () => {


  const [gallery, setGallery] = useState([]);

  let renderme = [];

  const n = 18;

  const resetImages = () => {

    // const importedImages = [];
    // for (let i = 1; i <= n; i++) {
    //   const imagePath = `../assets/${i}.png`;
    //   const importedImage = require(imagePath);
    //   importedImages.push(importedImage);
    // }

    renderme = [];
    const w = window.innerWidth;
    const k = Math.round(w / 400);
    const parts = w / k;
    divs = [];
    for (let i = 0; i < parts; i++) divs.push([]);

    for (let i = 0; i < n; i++) 
    {
      let useme = require(`../assets/${i+1}.png`);
      divs[i % k].push(
        <div className="image-item" key={i}>
          <Image className="img card-img-top" src={useme} />
          <div className="overlay">
            {/* <div className="item__details">
              <h4 className="card-text"> Title here </h4>
              <h4> &nbsp; - Author </h4>
            </div> */}
          </div>
        </div>
      );
    }

    for (let i = 0; i < k; i++) {
      renderme.push(
        <div className="column" key={i}>
          {divs[i]}
        </div>
      );
    }

    setGallery(renderme);
  };

  useEffect(() => {
    resetImages();
    window.addEventListener("resize", resetImages);
    return () => {
      window.removeEventListener("resize", resetImages);
    };
  }, []);

  return (
    <div className="container2">
      <div className="image-gallery">{gallery}</div>
    </div>
  );
};

export default View2;

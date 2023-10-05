import React, { useState, useEffect } from "react";
import "../CSS/View2.css";
import img01 from "../assets/01.jpg";
import img02 from "../assets/02.jpg";
import { Image } from "antd";

let divs = [];

const View2 = () => {
  const [gallery, setGallery] = useState([]);
  let renderme = [];

  const n = 12;

  const resetImages = () => {
    renderme = [];
    const w = window.innerWidth;
    const k = Math.round(w / 350);
    const parts = w / k;
    divs = [];
    for (let i = 0; i < parts; i++) divs.push([]);

    for (let i = 0; i < n; i++) {
      let a = i & 1 ? img01 : img02;
      divs[i % k].push(
        <div className="image-item" key={i}>
          <Image className="img card-img-top" src={a} />
          <div className="overlay">
            <div className="item__details">
              <h4 className="card-text"> Title here </h4>
              <h4> &nbsp; - Author </h4>
            </div>
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
      <div className="image-gallery">
        {gallery}
      </div>
    </div>
  );
};

export default View2;

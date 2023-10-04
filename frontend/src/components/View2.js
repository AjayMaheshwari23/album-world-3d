import React from "react";
import "../CSS/View2.css";
import img01 from "../assets/01.jpg";

const View2 = () => {

     const images = [];

     for (let i = 0; i < 10; i++) {
       images.push(
         <div className="item item--medium" key={i}>
           <div className="item__details">jelly-o brownie sweet</div>
         </div>
       );
     }

  return (
    <section className="section">
      <h1> Gallery</h1>
      <div className="grid">
        {images}
      </div>
    </section>
  );
};

export default View2;


/*

<div className="item ">
          <div className="item__details">jelly-o brownie sweet</div>
        </div>
        <div className="item item--large">
          <div className="item__details">Muffin jelly gingerbread</div>
        </div>
        <div className="item item--medium">
          <div className="item__details">sesame snaps chocolate</div>
        </div>
        <div className="item item--large">
          <div className="item__details">Oat cake</div>
        </div>
        <div className="item item--medium">
          <div className="item__details">jujubes cheesecake</div>
        </div>
        <div className="item item--medium">
          <div className="item__details">Dragée pudding brownie</div>
        </div>
        <div className="item item--large">
          <div className="item__details">Oat cake</div>
        </div>
        <div className="item">
          <div className="item__details">powder toffee</div>
        </div>
        <div className="item item--medium">
          <div className="item__details">pudding cheesecake</div>
        </div>
        <div className="item item--large">
          <div className="item__details">toffee bear claw</div>
        </div>
        <div className="item">
          <div className="item__details">cake cookie croissant</div>
        </div>
        <div className="item item--medium">
          <div className="item__details">liquorice sweet roll</div>
        </div>
        <div className="item item--medium">
          <div className="item__details">chocolate marzipan</div>
        </div>
        <div className="item item--large">
          <div className="item__details">danish dessert lollipop</div>
        </div>
        <div className="item">
          <div className="item__details">sugar plum dragée</div>
        </div>

*/
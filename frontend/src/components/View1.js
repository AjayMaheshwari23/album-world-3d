import React, { useEffect } from "react";
import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image, ScrollControls, Scroll, useScroll } from "@react-three/drei";
import { proxy, useSnapshot } from "valtio";

const damp = THREE.MathUtils.damp;
// const material = new THREE.LineBasicMaterial({ color: 'white' })
// const geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -0.5, 0), new THREE.Vector3(0, 0.5, 0)])

const urllss = [];
for(let i=0;i<18;i++) 
{
  const urL = require(`../assets/${i+1}.png`)
  urllss.push(urL);
}

const state = proxy({
  clicked: null,
  urls: urllss,
});

// function Minimap() {
//   const ref = useRef()
//   const scroll = useScroll()
//   const { urls } = useSnapshot(state)
//   const { height } = useThree((state) => state.viewport)
//   useFrame((state, delta) => {
//     ref.current.children.forEach((child, index) => {
//       // Give me a value between 0 and 1
//       //   starting at the position of my item
//       //   ranging across 4 / total length
//       //   make it a sine, so the value goes from 0 to 1 to 0.
//       const y = scroll.curve(index / urls.length - 1.5 / urls.length, 4 / urls.length)
//       child.scale.y = damp(child.scale.y, 0.1 + y / 6, 8, 8, delta)
//     })
//   })
//   return (
//     <group ref={ref}>
//       {urls.map((_, i) => (
//         <line key={i} geometry={geometry} material={material} position={[i * 0.06 - urls.length * 0.03, -height / 2 + 0.6, 0]} />
//       ))}
//     </group>
//   )
// }

function Item({ index, position, scale, c = new THREE.Color(), ...props }) {
  const speed = 10;
  const ref = useRef();
  const scroll = useScroll();
  const { clicked, urls } = useSnapshot(state);
  const [hovered, hover] = useState(false);
  const click = () => (state.clicked = index === clicked ? null : index);
  const over = () => hover(true);
  const out = () => hover(false);
  useFrame((state, delta) => {
    const y = scroll.curve(
      index / urls.length - 1.5 / urls.length,
      4 / urls.length
    );

    const a = damp(
      ref.current.scale.y,
      clicked === index ? 5 : 4 + y,
      speed,
      delta
    );
    // console.log(a);
    ref.current.material.scale[1] = ref.current.scale.y = a;

    ref.current.material.scale[0] = ref.current.scale.x = damp(
      ref.current.scale.x,
      clicked === index ? 4.7 : scale[0],
      6,
      delta
    );
    if (clicked !== null && index < clicked)
      ref.current.position.x = damp(
        ref.current.position.x,
        position[0] - 2,
        6,
        delta
      );
    if (clicked !== null && index > clicked)
      ref.current.position.x = damp(
        ref.current.position.x,
        position[0] + 2,
        6,
        delta
      );
    if (clicked === null || clicked === index)
      ref.current.position.x = damp(
        ref.current.position.x,
        position[0],
        6,
        delta
      );
    ref.current.material.grayscale = damp(
      ref.current.material.grayscale,
      hovered || clicked === index ? 0 : Math.max(0, 1 - y),
      6,
      delta
    );
    ref.current.material.color.lerp(
      c.set(hovered || clicked === index ? "white" : "#aaa"),
      hovered ? 0.3 : 0.1
    );
  });
  return (
    <Image
      ref={ref}
      {...props}
      position={position}
      scale={scale}
      onClick={click}
      onPointerOver={over}
      onPointerOut={out}
    />
  );
}

function Items({ w = 0.7, gap = 0.15 }) {
  const { urls } = useSnapshot(state);
  // console.log(urls);

  const { width } = useThree((state) => state.viewport);
  const xW = w + gap;
  return (
    <ScrollControls
      horizontal
      damping={0}
      pages={(width - xW + urls.length * xW) / width}
    >
      {/* <Minimap /> */}
      <Scroll>
        {urls.map((url, i) => (
          <Item
            key={i}
            index={i}
            position={[i * xW, 0, 0]}
            scale={[w, 114, 10]}
            url={url}
          />
        ))}
      </Scroll>
    </ScrollControls>
  );
}

const View1 = () => {
  return (
    <Canvas
      gl={{ antialias: false }}
      dpr={[1, 1.5]}
      onPointerMissed={() => (state.clicked = null)}
      style={{ height: "100vh" }}
    >
      <Items />
    </Canvas>
  );
};

export default View1;

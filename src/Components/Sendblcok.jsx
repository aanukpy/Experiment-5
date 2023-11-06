import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Text } from 'troika-three-text';

const Hexagonal = () => {
  const containerRef = useRef();
  const [animationCompleted, setAnimationCompleted] = useState(false);
  useEffect(() => {


    const imageUrls = [
      process.env.PUBLIC_URL + "/images/user.png",
      process.env.PUBLIC_URL + "/images/user.png",
    ];
 
 
 const imagePositions = [
  new THREE.Vector3(-2, 2, -0.1), 
  new THREE.Vector3(2, 2, -0.1), 
];

const textureLoader = new THREE.TextureLoader();


imageUrls.forEach((imageUrl, index) => {
  textureLoader.load(imageUrl, (texture) => {
    const imageMaterial = new THREE.MeshBasicMaterial({ map: texture });
    const imageGeometry = new THREE.PlaneGeometry(1, 1); 
    const imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
    imageMesh.position.copy(imagePositions[index]);
    scene.add(imageMesh);

   
    const imageTextLabel = new Text();
    imageTextLabel.text = `User ${index + 1}`;
    imageTextLabel.color = 'white';
    imageTextLabel.fontSize = 0.15; 
    imageTextLabel.position.set(imagePositions[index].x, imagePositions[index].y - 0.3, imagePositions[index].z);
    scene.add(imageTextLabel);
  });
});
const additionalImageUrls = [
  process.env.PUBLIC_URL + "/images/smart-contract.png",
  process.env.PUBLIC_URL + "/images/smart-contract.png",
  process.env.PUBLIC_URL + "/images/smart-contract.png",
];

const additionalImagePositions = [
  new THREE.Vector3(-1, 2.3, -0.1), 
  new THREE.Vector3(1.1, 2.3, -0.1), 
  new THREE.Vector3(3, 0, -0.1),
];

const additionalImageSizes = [.5, 0.5];

additionalImageUrls.forEach((imageUrl, index) => {
  textureLoader.load(imageUrl, (texture) => {
    const imageMaterial = new THREE.MeshBasicMaterial({ map: texture });
    const size = additionalImageSizes[index] || 1; 
    const imageGeometry = new THREE.PlaneGeometry(size, size); 
    const imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
    imageMesh.position.copy(additionalImagePositions[index] || new THREE.Vector3(0, 0, -0.1)); 
    scene.add(imageMesh);

    const imageTextLabel = new Text();
    imageTextLabel.color = 'white';
    imageTextLabel.fontSize = 0.08; 
    imageTextLabel.position.set(
      additionalImagePositions[index]?.x || 0,
      additionalImagePositions[index]?.y || 0,
      additionalImagePositions[index]?.z || -0.1
    );
    scene.add(imageTextLabel);
  });
});






    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor('black'); 
    renderer.setSize(window.innerWidth/1.2, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

     const nodes = [];
    const numNodes = 6;
    const radius = 2;
    const angleIncrement = (2 * Math.PI) / numNodes;

    for (let i = 0; i < numNodes; i++) {
      const x = radius * Math.cos(i * angleIncrement);
      const y = radius * Math.sin(i * angleIncrement);
      const z = 0;
      let nodeColor = 0xff0000;
      if (i === 0) {
        nodeColor = 'blue'; 
      }
      if (i === 1 || i === 2) {
        
        nodeColor = 0xffff00;
      }
      const node = new THREE.Mesh(
        new THREE.CircleGeometry(0.2, 16),
        new THREE.MeshBasicMaterial({ color: nodeColor })
      );
      node.position.set(x, y, z);
      scene.add(node);
      nodes.push(node);

      
      const labelText = (i + 1).toString();
      const text = new Text();
      text.text = labelText;
      text.color="Black"
      text.fontSize = 0.2; 
      text.position.set(x  - .0, y - (-.2));
      scene.add(text);
    }
    const squares = [];
    const numSquares = 5;
    const squareMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });

    for (let i = 0; i < numSquares; i++) {
      const square = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.2, 0.2),
        squareMaterial
      );
      square.position.copy(nodes[0].position);
      squares.push(square);
      scene.add(square);
    }

    camera.position.z = 5;

    const linesGroup = new THREE.Group();
    const lineMaterials = [];

    for (let i = 0; i < numNodes; i++) {
      for (let j = i + 1; j < numNodes; j++) {
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
          nodes[i].position,
          nodes[j].position,
        ]);

      
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
        lineMaterials.push(lineMaterial);

        const line = new THREE.Line(lineGeometry, lineMaterial);
        linesGroup.add(line);
      }
    }

    scene.add(linesGroup);

    const animateSquares = () => {
      const squareStartPositions = [];
      const squareEndPositions = [];

      for (let i = 0; i < numSquares; i++) {
        squareStartPositions.push(nodes[0].position.clone());
        squareEndPositions.push(nodes[i + 1].position.clone());
      }

      const duration = 5000;
      const animate = () => {
        const currentTime = Date.now() - startTime;
        const t = Math.min(currentTime / duration, 1);

        for (let i = 0; i < numSquares; i++) {
          squares[i].position.lerpVectors(
            squareStartPositions[i],
            squareEndPositions[i],
            t
          );
        }

        if (t < 0.1) {
          for (let i = 0; i < numNodes - 1; i++) {
            lineMaterials[i].color.setHex(0xff0000);
            lineMaterials[i].needsUpdate = true;
          }
        }

        if (t < 1) {
          requestAnimationFrame(animate);
        } else {
          for (let i = 0; i < numSquares; i++) {
            squares[i].position.copy(squareStartPositions[i]);
          }
          startTime = Date.now();
          setAnimationCompleted(true); // Mark the animation as completed
        }
      };

      animate();
      setTimeout(() => {
        for (let i = 0; i < numSquares; i++) {
          squares[i].position.copy(squareStartPositions[i]);
        }
      }, 3000); // 3000 milliseconds (3 seconds) delay
    };

    let startTime = Date.now();
    animateSquares();

    const animate = () => {
      requestAnimationFrame(animate);

      renderer.render(scene, camera);
    };

    animate();
  }, [animationCompleted]);

  return <div ref={containerRef} />;
};

export default Hexagonal;

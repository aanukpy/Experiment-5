import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Text } from 'troika-three-text';

const Hex = () => {
  const containerRef = useRef();
  const animateBox = useRef(false);
  const animationInProgress = useRef(false);
  const numBoxes = 3;

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
      const imageGeometry = new THREE.PlaneGeometry(1, 1); // Adjust the size as needed
      const imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
      imageMesh.position.copy(imagePositions[index]);
      scene.add(imageMesh);

   
      const imageTextLabel = new Text();
      imageTextLabel.text = `User ${index + 1}`;
      imageTextLabel.color = 'white';
      imageTextLabel.fontSize = 0.15; // Adjust the font size
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
    new THREE.Vector3(-1, 2.3, -0.1), // Adjust the position of the third image
    new THREE.Vector3(1.1, 2.3, -0.1),
    new THREE.Vector3(3, 0, -0.1), // Adjust the position of the fourth image
  ];

  const additionalImageSizes = [.5, 0.5]; // Adjust the sizes of the third and fourth images

  // Load and add additional images to the scene
  additionalImageUrls.forEach((imageUrl, index) => {
    textureLoader.load(imageUrl, (texture) => {
      const imageMaterial = new THREE.MeshBasicMaterial({ map: texture });
      const size = additionalImageSizes[index] || 1; // Use the specified size or default to 1
      const imageGeometry = new THREE.PlaneGeometry(size, size); // Adjust the size as needed
      const imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
      imageMesh.position.copy(additionalImagePositions[index] || new THREE.Vector3(0, 0, -0.1)); // Use the specified position or default
      scene.add(imageMesh);

      const imageTextLabel = new Text();
      // imageTextLabel.text = `Image ${index + 3}`; // Adjust the label
      imageTextLabel.color = 'white';
      imageTextLabel.fontSize = 0.08; // Adjust the font size
      imageTextLabel.position.set(
        additionalImagePositions[index]?.x || 0,
        additionalImagePositions[index]?.y || 0,
        additionalImagePositions[index]?.z || -0.1
      ); // Use the specified position or default
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
            nodeColor = 'Blue';
          }
        if (i === 1 || i === 2) {
        
          nodeColor = 0xffff00;
        }
  

      const node = new THREE.Mesh(new THREE.CircleGeometry(0.2, 16), new THREE.MeshBasicMaterial({ color: nodeColor }));
      node.position.set(x, y, z);
      scene.add(node);

      const labelText = (i + 1).toString();
      const text = new Text();
      text.text = labelText;
      text.color="Black"
      text.fontSize = 0.2; 
      text.position.set(x  - .0, y - (-.2));
      scene.add(text);

      nodes.push(node);
    }

    


    for (let i = 0; i < numNodes; i++) {
      for (let j = i + 1; j < numNodes; j++) {
        let lineColor = 0x00ff00; 

        if (i === 1 && j === 0) {
       
          lineColor = 0xff0000; 
        }

        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
          nodes[i].position,
          nodes[j].position,
        ]);
        const lineMaterial = new THREE.LineBasicMaterial({ color: lineColor });
        const line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);
      }
    }

    const boxes = [];
    const boxSpacing = 0.7;
    const spaceBetweenHexagonAndBoxes = 0.7;

    for (let i = 0; i < numBoxes; i++) {
      const x = (i - 1) * (boxSpacing + 0.2);
      const y = -2 - spaceBetweenHexagonAndBoxes;
      const z = 0;
      const box = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.2, 0.2),
        new THREE.MeshBasicMaterial({ color: 0x00ff00 })
      );
      box.position.set(x, y, z);
      scene.add(box);
      boxes.push(box);

      if (i > 0) {
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
          box.position,
          boxes[i - 1].position,
        ]);
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
        const line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);
      }
    }

    const newBox = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.2, 0.2),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    );
    const initialPosition = new THREE.Vector3(4, -2 - spaceBetweenHexagonAndBoxes, 0);
    newBox.position.copy(initialPosition);
    scene.add(newBox);

    camera.position.z = 5;

    const animateBoxMovement = () => {
      if (animateBox.current && !animationInProgress.current) {
        const targetX = (numBoxes - 1) * (boxSpacing + 0.2);
        const targetY = -2 - spaceBetweenHexagonAndBoxes;

        animationInProgress.current = true;

        const animationDuration = 5600;
        const start = Date.now();

        const animateBoxPosition = () => {
          const now = Date.now();
          const progress = (now - start) / animationDuration;
          if (progress < 1) {
            newBox.position.set(
              initialPosition.x + (targetX - initialPosition.x) * progress,
              initialPosition.y + (targetY - initialPosition.y) * progress,
              initialPosition.z
            );
            requestAnimationFrame(animateBoxPosition);
          } else {
            newBox.position.set(targetX, targetY, initialPosition.z);
            animationInProgress.current = false;

            const nearestBox = boxes[boxes.length - 1];
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([
              nearestBox.position,
              newBox.position,
            ]);
            const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
            const line = new THREE.Line(lineGeometry, lineMaterial);
            scene.add(line);
            boxes.push(newBox);
            animateBox.current = false;
          }
        };

        animateBoxPosition();
      }
    };

    setTimeout(() => {
      animateBox.current = true;
    }, 2000); // 3000 milliseconds (3 seconds) delay

    const animate = () => {
      requestAnimationFrame(animate);

      animateBoxMovement();

      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return <div ref={containerRef} />;
};

export default Hex;
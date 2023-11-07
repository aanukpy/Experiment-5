import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Text } from "troika-three-text";

const Hex = () => {
  const containerRef = useRef();
  const animateBox = useRef(false);
  const animationInProgress = useRef(false);
  const numBoxes = 3;

  useEffect(() => {
    //image url of users
    const imageUrls = [
      process.env.PUBLIC_URL + "/images/user14.png",
      process.env.PUBLIC_URL + "/images/user14.png",
    ];

    const imagePositions = [
      new THREE.Vector3(-2, 2, -0.1),
      new THREE.Vector3(2, 2, -0.1),
    ];

    const textureLoader = new THREE.TextureLoader();

    const imageSizes = [0.6, 0.6];

    imageUrls.forEach((imageUrl, index) => {
      textureLoader.load(imageUrl, (texture) => {
        const size = imageSizes[index] || 1.0; 
        const imageMaterial = new THREE.MeshBasicMaterial({ map: texture });
        const imageGeometry = new THREE.PlaneGeometry(size, size); 
        const imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
        imageMesh.position.copy(imagePositions[index]);
        scene.add(imageMesh);

        const imageTextLabel = new Text();
        imageTextLabel.text = `User ${index + 1}`;
        imageTextLabel.color = "white";
        imageTextLabel.fontSize = 0.15;
        imageTextLabel.position.set(
          imagePositions[index].x - 0.15,
          imagePositions[index].y - 0.3,
          imagePositions[index].z
        );
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
    //image url of smart contract
    const additionalImageSizes = [0.5, 0.5, 0.7];

    const textLabels = ["", "", "Smart Contract"];

    const labelPositions = [
      new THREE.Vector3(-1, 1.8, -0.1),
      new THREE.Vector3(1.1, 1.8, -0.1),
      new THREE.Vector3(3.5, -0.26, -0.1),
    ];

    additionalImageUrls.forEach((imageUrl, index) => {
      textureLoader.load(imageUrl, (texture) => {
        const imageMaterial = new THREE.MeshBasicMaterial({ map: texture });
        const size = additionalImageSizes[index] || 1;
        const imageGeometry = new THREE.PlaneGeometry(size, size);
        const imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
        imageMesh.position.copy(
          additionalImagePositions[index] || new THREE.Vector3(0, 0, -0.1)
        );
        scene.add(imageMesh);

        const imageTextLabel = new Text();
        imageTextLabel.text = textLabels[index];
        imageTextLabel.color = "white";
        imageTextLabel.fontSize = 0.16;

        // Set the position of the image label
        imageTextLabel.position.copy(
          labelPositions[index] || new THREE.Vector3(0, 0, -0.1)
        );

        scene.add(imageTextLabel);
      });
    });

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();

    renderer.setClearColor("black");
    renderer.setSize(window.innerWidth / 1.2, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);
    //code for hexagon-6 nodes
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
        nodeColor = "Blue";
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

      const labelText = (i + 1).toString();
      const text = new Text();
      text.text = labelText;
      text.color = "Black";
      text.fontSize = 0.2;
      text.position.set(x - 0.0, y - -0.2);
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

    //initialization-box moving from use1 to user 2
    const squareGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const squareMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const square = new THREE.Mesh(squareGeometry, squareMaterial);

    const startNodeIndex = 2;
    square.position.copy(nodes[startNodeIndex].position);
    scene.add(square);

    const targetNodeIndex = 1;
    const targetPosition = nodes[targetNodeIndex].position;
    const animationDuration = 4000;
    let startTime = null;

    const animateSquareMovement = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = (timestamp - startTime) / animationDuration;

      if (progress < 1) {
        square.position.lerpVectors(
          nodes[startNodeIndex].position,
          targetPosition,
          progress
        );
        requestAnimationFrame(animateSquareMovement);
      } else {
        square.position.copy(targetPosition);
        animateBox.current = false;
      }

      renderer.render(scene, camera);
    };

    setTimeout(() => {
      animateBox.current = true;
      requestAnimationFrame(animateSquareMovement);
    }, 0);

    //send  added block to all nodes
    const numSquares = 5;
    const squareStartNode = 0;
    
    const squares = [];
    
    const createAndAnimateSquaresSimultaneously = () => {
      const squareSpacing = 0.2;
      const animationDuration = 100000;
      const delayBeforeSimultaneousMovement = 6000;
      let animationDone = false;
    
      const squareGeometries = [];
      const squareMaterials = [];
      const squareTargetPositions = [];
    
      for (let i = 0; i < numSquares; i++) {
        const squareGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        const squareMaterial = new THREE.MeshBasicMaterial({ color: "blue" });
    
        const targetNodeIndex = (squareStartNode + i + 1) % numNodes;
    
        const targetPosition = nodes[targetNodeIndex].position;
    
        squareGeometries.push(squareGeometry);
        squareMaterials.push(squareMaterial);
        squareTargetPositions.push(targetPosition);
      }
    
      const squareObjects = squareGeometries.map((squareGeometry, index) => {
        const squareMaterial = squareMaterials[index];
        const square = new THREE.Mesh(squareGeometry, squareMaterial);
    
        square.position.copy(nodes[squareStartNode].position);
    
        scene.add(square);
    
        return square;
      });
    
      setTimeout(() => {
        const start = Date.now();
    
        const animateSquaresSimultaneously = () => {
          if (animationDone) return; 
    
          const now = Date.now();
    
          const progress = Math.min((now - start) / animationDuration, 1);
    
          squareObjects.forEach((square, index) => {
            const targetPosition = squareTargetPositions[index];
            square.position.lerp(targetPosition, progress);
          });
    
          if (progress < 1) {
            requestAnimationFrame(animateSquaresSimultaneously);
          } else {
            squares.push(...squareObjects);
            squareObjects.forEach((square) => {
              scene.remove(square);
              animationDone = true; 
            });
          }
        };
    
        animateSquaresSimultaneously();
      }, delayBeforeSimultaneousMovement);
    };
    
    createAndAnimateSquaresSimultaneously();
    
    //mined block
    setTimeout(() => {
      const newX = 3;
      const newY = -0.8;
      const newZ = 0;

      const box = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.2, 0.2),
        new THREE.MeshBasicMaterial({ color: 0xff0000 })
      );

      const labelText = new Text();
      labelText.text = "Mined Block";
      labelText.color = "white";
      labelText.fontSize = 0.15;

      box.position.set(newX, newY, newZ);
      labelText.position.set(newX - 0.2, newY + -0.2, newZ);

      scene.add(box);
      scene.add(labelText);
    }, 4000);

    const arrowX = 3;
    const arrowY = -2;
    const lineEndX = nodes[1].position.x + 2;
    const lineEndY = nodes[1].position.y - 3;

    setTimeout(() => {
      // Create an arrow geometry
      const arrowGeometry = new THREE.ConeGeometry(0.1, 0.4, 32);
      const arrowMaterial = new THREE.MeshBasicMaterial({ color: "green" });
      const arrow = new THREE.Mesh(arrowGeometry, arrowMaterial);

      arrow.position.set(arrowX, arrowY, 0.1);

      arrow.rotation.x = 0;
      arrow.rotation.y = 0;
      arrow.rotation.z = Math.PI;

      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(arrowX, arrowY, 0.1),
        new THREE.Vector3(lineEndX, lineEndY, 0.1),
      ]);
      const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
      const line = new THREE.Line(lineGeometry, lineMaterial);

      scene.add(arrow);
      scene.add(line);
    }, 4000);
    const boxes = [];
    const boxSpacing = 0.7;
    const spaceBetweenHexagonAndBoxes = 0.7;
    setTimeout(() => {
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
    }, 4000);
   //bock chain and added block
    const delayToShowBox = 6000; 
    const delayToStartAnimation =4000
    
    const newBox = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.2, 0.2),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    );
    
    const initialPosition = new THREE.Vector3(4, -2 - spaceBetweenHexagonAndBoxes, 0);
    newBox.position.copy(initialPosition);
    
   
    newBox.visible = false;
    
    scene.add(newBox);
    
    camera.position.z = 5;
    
 
    const animateBoxMovement = () => {
      if (animateBox.current && !animationInProgress.current) {
        const targetX = (numBoxes - 1) * (boxSpacing + 0.2);
        const targetY = -2 - spaceBetweenHexagonAndBoxes;
    
        const animationDuration = 10000;
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
          }
        };
    
        animateBoxPosition();
      }
    };
    
    // Set a timeout to display the box
    setTimeout(() => {
      newBox.visible = true;
      // Set a timeout to start the animation
      setTimeout(() => {
        animateBoxMovement();
      }, delayToStartAnimation);
    }, delayToShowBox);
    
  

    const animate = () => {
      requestAnimationFrame(animate);
  
      animateBoxMovement();
  
      renderer.render(scene, camera);
    };
  
   
    setTimeout(() => {
      animate();
    }, 0); 
  
  }, []);
  return <div ref={containerRef} />;
};

export default Hex;

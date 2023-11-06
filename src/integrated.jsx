import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Component1 = () => {
  const containerRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const nodes = [];
    const numNodes = 6;
    const radius = 2;
    const angleIncrement = (2 * Math.PI) / numNodes;

    for (let i = 0; i < numNodes; i++) {
      const x = radius * Math.cos(i * angleIncrement);
      const y = radius * Math.sin(i * angleIncrement);
      const z = 0;
      let nodeColor = 0xff0000; // Default color
      if (i === 0) {
        nodeColor = 0x00ff00; // Change color of the starting node
      }
      const node = new THREE.Mesh(
        new THREE.CircleGeometry(0.2, 16),
        new THREE.MeshBasicMaterial({ color: nodeColor })
      );
      node.position.set(x, y, z);
      scene.add(node);
      nodes.push(node);
    }


    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return <div ref={containerRef} />;
};
const Component2 = () => {
    const containerRef = useRef();
  
    useEffect(() => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();
  
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current.appendChild(renderer.domElement);
  
      const nodes = [];
      const numNodes = 6;
      const radius = 2;
      const angleIncrement = (2 * Math.PI) / numNodes;
  
      for (let i = 0; i < numNodes; i++) {
        const x = radius * Math.cos(i * angleIncrement);
        const y = radius * Math.sin(i * angleIncrement);
        const z = 0;
        let nodeColor = 0xff0000; // Default color
        if (i === 0) {
          nodeColor = 0x00ff00; // Change color of the starting node
        }
        const node = new THREE.Mesh(
          new THREE.CircleGeometry(0.2, 16),
          new THREE.MeshBasicMaterial({ color: nodeColor })
        );
        node.position.set(x, y, z);
        scene.add(node);
        nodes.push(node);
      }
  
      camera.position.z = 5;
  
      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
  
      animate();
    }, []);
  
    return <div ref={containerRef} />;
  };
  

const Component3 = () => {
  const containerRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const nodes = [];
    const numNodes = 6;
    const radius = 2;
    const angleIncrement = (2 * Math.PI) / numNodes;

    for (let i = 0; i < numNodes; i++) {
      const x = radius * Math.cos(i * angleIncrement);
      const y = radius * Math.sin(i * angleIncrement);
      const z = 0;
      let nodeColor = 0xff0000; // Default color
      if (i === 0) {
        nodeColor = 0x00ff00; // Change color of the starting node
      }
      const node = new THREE.Mesh(
        new THREE.CircleGeometry(0.2, 16),
        new THREE.MeshBasicMaterial({ color: nodeColor })
      );
      node.position.set(x, y, z);
      scene.add(node);
      nodes.push(node);
    }

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return <div ref={containerRef} />;
};

const App = () => {
  const components = [Component1, Component2, Component3];
  const [currentComponent, setCurrentComponent] = React.useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentComponent < components.length - 1) {
        setCurrentComponent(currentComponent + 1);
      }
    }, 5000); // Change components every 5 seconds

    return () => clearTimeout(timer);
  }, [currentComponent]);

  return (
    <Canvas>
      {components[currentComponent]()}
    </Canvas>
  );
};

export default App;

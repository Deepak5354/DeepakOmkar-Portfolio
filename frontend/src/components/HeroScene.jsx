import { useEffect, useRef } from 'react';

export default function HeroScene() {
  const hostRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let disposeScene = () => {};

    import('three').then((THREE) => {
      const host = hostRef.current;
      if (cancelled || !host) return;

      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
      } catch {
        return;
      }

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.z = 7.5;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setClearColor(0x000000, 0);
      host.appendChild(renderer.domElement);

      const orbit = new THREE.Group();
      scene.add(orbit);

      const core = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.35, 1),
        new THREE.MeshBasicMaterial({ color: '#71e6dc', wireframe: true, transparent: true, opacity: 0.38 })
      );
      orbit.add(core);

      const ringMaterial = new THREE.MeshBasicMaterial({ color: '#a6f4ef', transparent: true, opacity: 0.42 });
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.85, 0.009, 8, 144), ringMaterial);
      ring.rotation.set(0.82, 0.18, -0.36);
      orbit.add(ring);

      const secondRing = new THREE.Mesh(
        new THREE.TorusGeometry(2.15, 0.006, 8, 144),
        new THREE.MeshBasicMaterial({ color: '#b4c5ff', transparent: true, opacity: 0.3 })
      );
      secondRing.rotation.set(-0.5, 0.9, 0.4);
      orbit.add(secondRing);

      const nodeGeometry = new THREE.SphereGeometry(0.035, 10, 8);
      const nodeMaterial = new THREE.MeshBasicMaterial({ color: '#d5fffb' });
      for (let index = 0; index < 18; index += 1) {
        const angle = (index / 18) * Math.PI * 2;
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        node.position.set(Math.cos(angle) * 2.1, Math.sin(angle * 2) * 0.45, Math.sin(angle) * 1.35);
        orbit.add(node);
      }

      const resize = () => {
        const width = Math.max(host.clientWidth, 1);
        const height = Math.max(host.clientHeight, 1);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
      };

      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);
      resize();

      let scrollProgress = 0;
      let pointerX = 0;
      let pointerY = 0;
      const updateScroll = () => {
        const scrollableHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        scrollProgress = Math.min(window.scrollY / scrollableHeight, 1);
      };
      const updatePointer = (event) => {
        const bounds = host.getBoundingClientRect();
        pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
        pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
      };

      window.addEventListener('scroll', updateScroll, { passive: true });
      host.addEventListener('pointermove', updatePointer);
      updateScroll();

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const startedAt = performance.now();
      let animationFrame = 0;
      const render = () => {
        const elapsed = (performance.now() - startedAt) / 1000;
        orbit.rotation.y = elapsed * 0.1 + scrollProgress * 0.55 + pointerX * 0.12;
        orbit.rotation.x = Math.sin(elapsed * 0.22) * 0.08 + scrollProgress * 0.22 + pointerY * 0.08;
        core.rotation.y = elapsed * 0.11;
        core.rotation.x = elapsed * 0.07;
        ring.rotation.z = -0.36 + elapsed * 0.035;
        renderer.render(scene, camera);
        if (!reducedMotion) animationFrame = window.requestAnimationFrame(render);
      };
      render();

      disposeScene = () => {
        window.cancelAnimationFrame(animationFrame);
        window.removeEventListener('scroll', updateScroll);
        host.removeEventListener('pointermove', updatePointer);
        resizeObserver.disconnect();
        scene.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            const materials = Array.isArray(object.material) ? object.material : [object.material];
            materials.forEach((material) => material.dispose());
          }
        });
        renderer.dispose();
        renderer.domElement.remove();
      };
    }).catch((error) => console.error('Unable to load the 3D hero scene.', error));

    return () => {
      cancelled = true;
      disposeScene();
    };
  }, []);

  return <div ref={hostRef} className="hero-scene" aria-hidden="true" />;
}
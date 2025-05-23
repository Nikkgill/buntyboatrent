// 3D Animated Water-Themed Background using Three.js
window.addEventListener('DOMContentLoaded', () => {
    // Create a full-window canvas for the background
    const bgCanvas = document.createElement('canvas');
    bgCanvas.id = 'bg3d';
    bgCanvas.style.position = 'fixed';
    bgCanvas.style.top = '0';
    bgCanvas.style.left = '0';
    bgCanvas.style.width = '100vw';
    bgCanvas.style.height = '100vh';
    bgCanvas.style.zIndex = '-1';
    bgCanvas.style.pointerEvents = 'none';
    document.body.prepend(bgCanvas);

    // Setup Three.js scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f2027);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ canvas: bgCanvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create floating particles (bubbles/water drops)
    const particles = [];
    const particleGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const particleMaterial = new THREE.MeshPhongMaterial({ color: 0x00c6ff, transparent: true, opacity: 0.55 });
    for (let i = 0; i < 60; i++) {
        const mesh = new THREE.Mesh(particleGeometry, particleMaterial.clone());
        mesh.position.x = (Math.random() - 0.5) * 12;
        mesh.position.y = (Math.random() - 0.5) * 8;
        mesh.position.z = (Math.random() - 0.5) * 6;
        mesh.material.opacity = 0.35 + Math.random() * 0.4;
        scene.add(mesh);
        particles.push(mesh);
    }

    // Soft blue light
    const ambientLight = new THREE.AmbientLight(0x99ccff, 0.7);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0x00c6ff, 0.7);
    dirLight.position.set(3, 6, 7);
    scene.add(dirLight);

    // Animate particles (floating up and gently oscillating)
    function animate() {
        particles.forEach((p, i) => {
            p.position.y += 0.01 + Math.sin(Date.now() * 0.0005 + i) * 0.003;
            p.position.x += Math.sin(Date.now() * 0.0003 + i * 2) * 0.002;
            if (p.position.y > 5) p.position.y = -4.5;
        });
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    animate();

    // Responsive resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});

/**
 * Peças de xadrez em 3D para a seção Processo.
 *
 * Modelos: "Chess Set" do Poly Haven, por Riley Queen (CC0), https://polyhaven.com/a/chess_set
 * Preparados por scripts/build-chess-model.mjs -> public/models/chess-pieces.glb
 * (cinco peças, base em y = 0, eixo de giro no centro da base, proporção real entre elas).
 *
 * Um único contexto WebGL renderiza as peças uma a uma e copia cada quadro para o
 * <canvas> 2D da etapa. O único movimento é o giro lento no próprio eixo.
 * Só anima com a seção visível; com prefers-reduced-motion desenha uma pose parada.
 *
 * Este módulo é carregado sob demanda (import dinâmico): o Three.js não pesa na abertura.
 */
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const MODEL_URL = "/models/chess-pieces.glb";
const ORDER = ["pawn", "knight", "bishop", "rook", "queen"] as const;

/** Ponto para onde a câmera olha: no celular o centro de cada peça vai para cá */
const TARGET_Y = 0.93;

/** Uma volta completa a cada 26 segundos */
const SPEED = (Math.PI * 2) / 26;

type Slot = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  /** Peça + sombra: só o conjunto da etapa fica visível no quadro dela */
  holder: THREE.Group;
  /** Só a peça gira; a sombra de contato fica parada */
  piece: THREE.Object3D;
  /** Altura do centro da peça (meio da caixa delimitadora) */
  center: number;
  phase: number;
};

/** Sombra de contato: elipse escura e difusa sob a base, para assentar a peça. */
function contactShadow(radius: number) {
  const size = 128;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const g = c.getContext("2d");
  if (g) {
    const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, "rgba(0,0,0,0.55)");
    grad.addColorStop(0.45, "rgba(0,0,0,0.28)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, size, size);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false });
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(radius * 2, radius * 2), mat);
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = 0.002;
  plane.renderOrder = -1;
  return plane;
}

/** Monta as peças nos canvases e devolve a função de limpeza. */
export function mountChess(canvases: HTMLCanvasElement[], host: HTMLElement): () => void {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  } catch {
    return () => {};
  }
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1;

  const scene = new THREE.Scene();

  // Luz de estúdio: ambiente suave (reflexos realistas) + luz principal + recorte
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTexture;
  scene.environmentIntensity = 0.55;

  const key = new THREE.DirectionalLight("#fff3e8", 1.9);
  key.position.set(-2.5, 4, 3.5);
  scene.add(key);
  const rim = new THREE.DirectionalLight("#f3e9dd", 1.1);
  rim.position.set(2.5, 2.5, -3.5);
  scene.add(rim);

  const camera = new THREE.PerspectiveCamera(24, 1, 0.1, 50);
  camera.position.set(0, 1.72, 5.6);
  camera.lookAt(0, TARGET_Y, 0);

  // Desktop: todas as bases na mesma linha, como num tabuleiro.
  // Celular: cada peça centrada no próprio quadro, que o CSS centra no bloco de texto.
  const wide = window.matchMedia("(min-width: 56.25em)");

  const material = new THREE.MeshStandardMaterial({
    color: "#ecdfd1",
    roughness: 0.42,
    metalness: 0,
  });

  const shadows: THREE.Mesh[] = [];
  const slots: Slot[] = [];
  let disposed = false;
  let w = 0;
  let h = 0;

  const resize = () => {
    const first = canvases[0];
    if (!first) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    w = Math.max(1, Math.round(first.clientWidth * dpr));
    h = Math.max(1, Math.round(first.clientHeight * dpr));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    for (const s of slots) {
      s.canvas.width = w;
      s.canvas.height = h;
      s.holder.position.y = wide.matches ? 0 : TARGET_Y - s.center;
    }
  };

  const draw = (t: number) => {
    for (const s of slots) {
      s.holder.visible = true;
      s.piece.rotation.y = s.phase + t * SPEED;
      renderer.render(scene, camera);
      s.ctx.clearRect(0, 0, w, h);
      s.ctx.drawImage(renderer.domElement, 0, 0, w, h);
      s.holder.visible = false;
    }
  };

  let frame = 0;
  let running = false;
  let elapsed = 0;
  let last = 0;

  const loop = (now: number) => {
    // Avança só enquanto anima: ao voltar à tela, o giro continua de onde parou
    elapsed += Math.min(0.1, (now - last) / 1000);
    last = now;
    draw(elapsed);
    frame = window.requestAnimationFrame(loop);
  };

  const play = () => {
    if (running || reduced || !slots.length) return;
    running = true;
    last = performance.now();
    frame = window.requestAnimationFrame(loop);
  };

  const pause = () => {
    running = false;
    if (frame) window.cancelAnimationFrame(frame);
    frame = 0;
  };

  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) play();
      else pause();
    },
    { rootMargin: "120px 0px" },
  );

  const onResize = () => {
    resize();
    if (!running) draw(elapsed);
  };

  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  loader
    .loadAsync(MODEL_URL)
    .then((gltf) => {
      if (disposed) return;

      // O GLTFLoader pode acrescentar sufixos aos nomes ("bishop_1"): compara pelo nome-base
      const byName = new Map<string, THREE.Mesh>();
      gltf.scene.updateMatrixWorld(true);
      gltf.scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (!mesh.isMesh) return;
        const base = (mesh.name || mesh.parent?.name || "").replace(/_\d+$/, "");
        if (!byName.has(base)) byName.set(base, mesh);
      });

      canvases.forEach((canvas, i) => {
        const ctx = canvas.getContext("2d");
        const name = ORDER[Number(canvas.dataset.piece ?? i) % ORDER.length];
        const source = byName.get(name);
        if (!ctx || !source) return;

        // A malha vem quantizada: escala e posição do nó (às vezes num grupo pai) desfazem isso.
        // Aplicar a matriz de mundo completa deixa cada peça na medida real, com a base em y = 0.
        const mesh = new THREE.Mesh(source.geometry, material);
        mesh.applyMatrix4(source.matrixWorld);
        const piece = new THREE.Group();
        piece.add(mesh);

        const box = new THREE.Box3().setFromObject(mesh);
        const radius = Math.max(box.max.x - box.min.x, box.max.z - box.min.z) * 0.62 || 0.45;

        const shadow = contactShadow(radius);
        shadows.push(shadow);

        const holder = new THREE.Group();
        holder.add(piece, shadow);
        holder.visible = false;
        scene.add(holder);

        // Fases espalhadas: cada peça mostra um ângulo diferente no mesmo instante
        slots.push({
          canvas,
          ctx,
          holder,
          piece,
          center: (box.min.y + box.max.y) / 2,
          phase: 0.6 + (i * Math.PI * 2) / 5,
        });
      });

      if (!slots.length) return;
      resize();
      draw(elapsed);
      host.classList.add("is-3d");
      io.observe(host);
      window.addEventListener("resize", onResize);
    })
    .catch(() => {
      /* sem o modelo: continuam as peças em SVG */
    });

  return () => {
    disposed = true;
    pause();
    io.disconnect();
    window.removeEventListener("resize", onResize);
    host.classList.remove("is-3d");
    for (const m of shadows) {
      m.geometry.dispose();
      const mat = m.material as THREE.MeshBasicMaterial;
      mat.map?.dispose();
      mat.dispose();
    }
    for (const s of slots) {
      s.piece.traverse((o) => {
        if ((o as THREE.Mesh).isMesh) (o as THREE.Mesh).geometry.dispose();
      });
    }
    material.dispose();
    envTexture.dispose();
    pmrem.dispose();
    renderer.dispose();
  };
}

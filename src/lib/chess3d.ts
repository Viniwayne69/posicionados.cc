/**
 * Peças de xadrez em 3D para a seção Processo.
 *
 * Peão, bispo, torre e dama são torneadas (LatheGeometry), como uma peça real feita no torno.
 * O cavalo tem base torneada e cabeça esculpida a partir do perfil, com bordas arredondadas.
 *
 * Um único contexto WebGL renderiza as cinco peças, uma por vez, e copia cada quadro
 * para o <canvas> 2D da etapa. Só anima com a seção visível; com prefers-reduced-motion
 * desenha uma pose parada.
 *
 * Este módulo é carregado sob demanda (import dinâmico), então o Three.js não pesa na abertura.
 */
import * as THREE from "three";

const TERRACOTA = "#b9705a";
const SHADOW_TONE = "#6e3b2c";

const V = (x: number, y: number) => new THREE.Vector2(x, y);

/** Arco de perfil para o torno: centro no eixo (x = raio), de a0 a a1 em radianos. */
function arc(cy: number, r: number, a0: number, a1: number, n: number) {
  const pts: THREE.Vector2[] = [];
  for (let i = 0; i <= n; i++) {
    const a = a0 + ((a1 - a0) * i) / n;
    pts.push(V(Math.max(0, r * Math.cos(a)), cy + r * Math.sin(a)));
  }
  return pts;
}

/** Base comum: disco com chanfro, filete e anel. */
const BASE = [
  V(0, 0),
  V(0.58, 0),
  V(0.6, 0.025),
  V(0.6, 0.08),
  V(0.56, 0.12),
  V(0.5, 0.14),
  V(0.5, 0.19),
  V(0.54, 0.22),
  V(0.52, 0.26),
  V(0.42, 0.3),
];

function lathe(points: THREE.Vector2[], mat: THREE.Material) {
  return new THREE.Mesh(new THREE.LatheGeometry(points, 96), mat);
}

function pawn(mat: THREE.Material) {
  const g = new THREE.Group();
  g.add(
    lathe(
      [
        ...BASE,
        V(0.34, 0.38),
        V(0.27, 0.55),
        V(0.22, 0.75),
        V(0.2, 0.86),
        V(0.3, 0.9),
        V(0.32, 0.94),
        V(0.3, 0.98),
        V(0.18, 1.01),
        ...arc(1.28, 0.27, -1.2, Math.PI / 2, 24),
      ],
      mat,
    ),
  );
  return g;
}

function bishop(mat: THREE.Material) {
  const g = new THREE.Group();
  g.add(
    lathe(
      [
        ...BASE,
        V(0.34, 0.38),
        V(0.27, 0.58),
        V(0.21, 0.82),
        V(0.19, 0.96),
        V(0.3, 1.0),
        V(0.32, 1.04),
        V(0.29, 1.08),
        V(0.17, 1.11),
        V(0.21, 1.16),
        V(0.27, 1.27),
        V(0.29, 1.38),
        V(0.26, 1.5),
        V(0.19, 1.6),
        V(0.1, 1.68),
        V(0.05, 1.71),
        ...arc(1.78, 0.075, -1.0, Math.PI / 2, 12),
      ],
      mat,
    ),
  );
  return g;
}

function rook(mat: THREE.Material) {
  const g = new THREE.Group();
  g.add(
    lathe(
      [
        ...BASE,
        V(0.4, 0.36),
        V(0.36, 0.5),
        V(0.32, 0.7),
        V(0.31, 1.12),
        V(0.36, 1.18),
        V(0.4, 1.22),
        V(0.41, 1.4),
        V(0.3, 1.4),
        V(0.3, 1.34),
        V(0, 1.34),
      ],
      mat,
    ),
  );
  // Ameias: quatro setores de anel extrudados
  const span = 0.95;
  for (let i = 0; i < 4; i++) {
    const a0 = (i * Math.PI) / 2 + 0.3;
    const shape = new THREE.Shape();
    shape.absarc(0, 0, 0.41, a0, a0 + span, false);
    shape.absarc(0, 0, 0.3, a0 + span, a0, true);
    shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.16,
      bevelEnabled: true,
      bevelThickness: 0.015,
      bevelSize: 0.012,
      bevelSegments: 2,
      curveSegments: 24,
    });
    geo.rotateX(-Math.PI / 2);
    const m = new THREE.Mesh(geo, mat);
    m.position.y = 1.4;
    g.add(m);
  }
  return g;
}

function queen(mat: THREE.Material) {
  const g = new THREE.Group();
  g.add(
    lathe(
      [
        ...BASE,
        V(0.34, 0.38),
        V(0.27, 0.6),
        V(0.21, 0.86),
        V(0.19, 1.0),
        V(0.31, 1.05),
        V(0.33, 1.09),
        V(0.3, 1.13),
        V(0.18, 1.16),
        V(0.2, 1.24),
        V(0.27, 1.4),
        V(0.34, 1.52),
        V(0.35, 1.56),
        V(0.3, 1.58),
        V(0.2, 1.6),
        V(0.14, 1.64),
        ...arc(1.73, 0.09, -1.0, Math.PI / 2, 12),
      ],
      mat,
    ),
  );
  // Coroa: esferas ao redor da borda
  const ball = new THREE.SphereGeometry(0.048, 20, 14);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const m = new THREE.Mesh(ball, mat);
    m.position.set(Math.cos(a) * 0.33, 1.6, Math.sin(a) * 0.33);
    g.add(m);
  }
  return g;
}

function knight(mat: THREE.Material, dark: THREE.Material) {
  const g = new THREE.Group();
  g.add(lathe([...BASE, V(0.38, 0.34), V(0.36, 0.4), V(0, 0.4)], mat));

  // Perfil da cabeça, voltado para a direita (+x)
  const p = [
    V(-0.3, 0.36),
    V(-0.36, 0.62),
    V(-0.37, 0.9),
    V(-0.31, 1.18),
    V(-0.2, 1.42),
    V(-0.08, 1.6),
    V(-0.02, 1.76),
    V(0.06, 1.66),
    V(0.16, 1.58),
    V(0.3, 1.44),
    V(0.44, 1.26),
    V(0.52, 1.12),
    V(0.5, 1.04),
    V(0.38, 1.0),
    V(0.22, 1.02),
    V(0.1, 0.98),
    V(0.12, 0.8),
    V(0.22, 0.6),
    V(0.3, 0.36),
  ];
  const shape = new THREE.Shape();
  shape.moveTo(p[0].x, p[0].y);
  shape.splineThru(p.slice(1));
  shape.closePath();

  const depth = 0.3;
  const head = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.11,
    bevelSize: 0.07,
    bevelSegments: 8,
    curveSegments: 72,
  });
  head.translate(0, 0, -depth / 2);

  // Esculpe o volume: focinho e orelhas mais finos, pescoço mais cheio
  const pos = head.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const nose = Math.min(1, Math.max(0, (x - 0.05) / 0.47));
    const ears = Math.min(1, Math.max(0, (y - 1.45) / 0.3));
    const neck = Math.min(1, Math.max(0, (1.0 - y) / 0.6));
    const k = (1 - 0.42 * nose) * (1 - 0.35 * ears) * (1 + 0.12 * neck);
    pos.setZ(i, pos.getZ(i) * k);
  }
  head.computeVertexNormals();
  g.add(new THREE.Mesh(head, mat));

  // Olhos, na superfície já afinada
  const eye = new THREE.SphereGeometry(0.024, 14, 10);
  const eyeZ = (depth / 2 + 0.11) * (1 - 0.42 * ((0.2 - 0.05) / 0.47));
  for (const z of [-1, 1]) {
    const m = new THREE.Mesh(eye, dark);
    m.position.set(0.2, 1.36, z * eyeZ);
    g.add(m);
  }
  return g;
}

type Slot = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  obj: THREE.Group;
  phase: number;
  speed: number;
  isKnight: boolean;
};

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

  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight("#f3e9dd", "#222121", 1.15));
  const key = new THREE.DirectionalLight("#fff4ea", 2.3);
  key.position.set(-3, 5, 4);
  scene.add(key);
  const fill = new THREE.DirectionalLight("#f3d9c8", 0.45);
  fill.position.set(4, 1.5, 2.5);
  scene.add(fill);
  const rim = new THREE.DirectionalLight("#f3e9dd", 0.9);
  rim.position.set(1, 3, -4);
  scene.add(rim);

  const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 50);
  camera.position.set(0, 1.3, 5);
  camera.lookAt(0, 0.9, 0);

  const mat = new THREE.MeshStandardMaterial({ color: TERRACOTA, roughness: 0.6, metalness: 0 });
  const dark = new THREE.MeshStandardMaterial({ color: SHADOW_TONE, roughness: 0.8, metalness: 0 });

  const builders = [
    () => pawn(mat),
    () => knight(mat, dark),
    () => bishop(mat),
    () => rook(mat),
    () => queen(mat),
  ];

  const slots: Slot[] = [];
  canvases.forEach((canvas, i) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const index = Number(canvas.dataset.piece ?? i) % builders.length;
    const obj = builders[index]();
    obj.visible = false;
    scene.add(obj);
    slots.push({ canvas, ctx, obj, phase: i * 1.37, speed: 0.34 + (i % 3) * 0.05, isKnight: index === 1 });
  });

  let w = 0;
  let h = 0;
  const resize = () => {
    const first = slots[0]?.canvas;
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
    }
  };

  const pose = (s: Slot, t: number) => {
    const o = s.obj;
    if (s.isKnight) {
      // Cavalo: balança em três quartos, sempre olhando para a direita
      o.rotation.y = -0.22 + Math.sin(t * 0.45 + s.phase) * 0.3;
    } else {
      o.rotation.y = t * s.speed + s.phase;
    }
    o.rotation.z = Math.sin(t * 0.6 + s.phase) * 0.05;
    o.position.y = Math.sin(t * 0.85 + s.phase) * 0.035;
  };

  const draw = (t: number) => {
    for (const s of slots) {
      s.obj.visible = true;
      pose(s, t);
      renderer.render(scene, camera);
      s.ctx.clearRect(0, 0, w, h);
      s.ctx.drawImage(renderer.domElement, 0, 0, w, h);
      s.obj.visible = false;
    }
  };

  let frame = 0;
  let running = false;
  let start = performance.now();

  const loop = (now: number) => {
    draw((now - start) / 1000);
    frame = window.requestAnimationFrame(loop);
  };

  const play = () => {
    if (running || reduced) return;
    running = true;
    start = performance.now() - 4000;
    frame = window.requestAnimationFrame(loop);
  };

  const pause = () => {
    running = false;
    if (frame) window.cancelAnimationFrame(frame);
    frame = 0;
  };

  resize();
  draw(4);
  host.classList.add("is-3d");

  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) play();
      else pause();
    },
    { rootMargin: "120px 0px" },
  );
  io.observe(host);

  const onResize = () => {
    resize();
    if (!running) draw(4);
  };
  window.addEventListener("resize", onResize);

  return () => {
    pause();
    io.disconnect();
    window.removeEventListener("resize", onResize);
    host.classList.remove("is-3d");
    scene.traverse((o) => {
      if (o instanceof THREE.Mesh) o.geometry.dispose();
    });
    mat.dispose();
    dark.dispose();
    renderer.dispose();
  };
}

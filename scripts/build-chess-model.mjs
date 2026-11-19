/**
 * Gera public/models/chess-pieces.glb a partir do "Chess Set" do Poly Haven (CC0, por Riley Queen).
 * https://polyhaven.com/a/chess_set
 *
 * Uso:
 *   node scripts/build-chess-model.mjs <caminho/chess_set_1k.gltf> [saida.glb]
 *
 * O que faz:
 * - Lê só a geometria (as texturas de mármore não são usadas: o site pinta as peças de terracota).
 * - Mantém cinco peças brancas: peão, cavalo, bispo, torre e dama.
 * - Põe cada peça com a base em y = 0 e o eixo de giro no centro da base,
 *   numa escala única (dama = 1,85 de altura), preservando a proporção real entre elas.
 * - Remove UVs, solda vértices e comprime com Meshopt.
 */
import { readFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { dedup, meshopt, prune, weld } from "@gltf-transform/functions";
import { MeshoptEncoder } from "meshoptimizer";

const [, , input, outputArg] = process.argv;
if (!input) {
  console.error("Informe o caminho do chess_set_1k.gltf");
  process.exit(1);
}
const output = outputArg ?? path.join("public", "models", "chess-pieces.glb");

const PIECES = {
  piece_pawn_white_01: "pawn",
  piece_knight_white_01: "knight",
  piece_bishop_white_01: "bishop",
  piece_rook_white_01: "rook",
  piece_queen_white: "queen",
};
const QUEEN_HEIGHT = 1.85;

// glTF sem as texturas (não baixadas): remove imagens e referências de textura
const json = JSON.parse(await readFile(input, "utf8"));
delete json.images;
delete json.textures;
delete json.samplers;
for (const mat of json.materials ?? []) {
  const pbr = mat.pbrMetallicRoughness ?? {};
  delete pbr.baseColorTexture;
  delete pbr.metallicRoughnessTexture;
  delete mat.normalTexture;
  delete mat.occlusionTexture;
  delete mat.emissiveTexture;
  delete mat.extensions;
}
const resources = {};
for (const buffer of json.buffers ?? []) {
  if (buffer.uri && !buffer.uri.startsWith("data:")) {
    resources[buffer.uri] = new Uint8Array(await readFile(path.join(path.dirname(input), buffer.uri)));
  }
}

await MeshoptEncoder.ready;
const io = new NodeIO()
  .registerExtensions(ALL_EXTENSIONS)
  .registerDependencies({ "meshopt.encoder": MeshoptEncoder });

const doc = await io.readJSON({ json, resources });
const root = doc.getRoot();

const material = doc
  .createMaterial("terracota")
  .setBaseColorFactor([0.485, 0.162, 0.102, 1]) // #B9705A em linear
  .setRoughnessFactor(0.6)
  .setMetallicFactor(0);

// Mede cada peça mantida
const kept = [];
for (const node of root.listNodes()) {
  const name = PIECES[node.getName()];
  if (!name) continue;
  const prim = node.getMesh().listPrimitives()[0];
  const arr = prim.getAttribute("POSITION").getArray();
  let minY = Infinity;
  let maxY = -Infinity;
  for (let i = 1; i < arr.length; i += 3) {
    minY = Math.min(minY, arr[i]);
    maxY = Math.max(maxY, arr[i]);
  }
  // Eixo de giro: centro da base (vértices nos 6% inferiores)
  const limit = minY + (maxY - minY) * 0.06;
  let bx0 = Infinity, bx1 = -Infinity, bz0 = Infinity, bz1 = -Infinity;
  for (let i = 0; i < arr.length; i += 3) {
    if (arr[i + 1] > limit) continue;
    bx0 = Math.min(bx0, arr[i]);
    bx1 = Math.max(bx1, arr[i]);
    bz0 = Math.min(bz0, arr[i + 2]);
    bz1 = Math.max(bz1, arr[i + 2]);
  }
  kept.push({ node, name, prim, minY, height: maxY - minY, cx: (bx0 + bx1) / 2, cz: (bz0 + bz1) / 2 });
}

if (kept.length !== 5) throw new Error(`Esperava 5 peças, encontrei ${kept.length}`);
const queen = kept.find((k) => k.name === "queen");
const scale = QUEEN_HEIGHT / queen.height;

for (const k of kept) {
  const attr = k.prim.getAttribute("POSITION");
  const arr = attr.getArray().slice();
  for (let i = 0; i < arr.length; i += 3) {
    arr[i] = (arr[i] - k.cx) * scale;
    arr[i + 1] = (arr[i + 1] - k.minY) * scale;
    arr[i + 2] = (arr[i + 2] - k.cz) * scale;
  }
  attr.setArray(arr);
  for (const semantic of k.prim.listSemantics()) {
    if (semantic.startsWith("TEXCOORD")) k.prim.setAttribute(semantic, null);
  }
  k.prim.setMaterial(material);
  k.node.getMesh().setName(k.name);
  k.node.setName(k.name).setTranslation([0, 0, 0]).setRotation([0, 0, 0, 1]).setScale([1, 1, 1]);
  console.log(`${k.name}: altura ${(k.height * scale).toFixed(3)}, eixo (${k.cx.toFixed(4)}, ${k.cz.toFixed(4)})`);
}

// Descarta tabuleiro e demais peças
const keep = new Set(kept.map((k) => k.node));
for (const node of root.listNodes()) {
  if (!keep.has(node)) node.dispose();
}

await doc.transform(prune(), dedup(), weld(), meshopt({ encoder: MeshoptEncoder, level: "medium" }));

await mkdir(path.dirname(output), { recursive: true });
await io.write(output, doc);
const { size } = await import("node:fs").then((fs) => fs.promises.stat(output));
console.log(`OK: ${output} (${(size / 1024).toFixed(1)} KB)`);

import fs from 'fs';
import path from 'path';

const srcFire = "C:\\Users\\sergi\\.gemini\\antigravity-ide\\brain\\0f797738-e41a-40de-8818-61a11989b642\\celebra_fire_luxury_1788304981868.jpg";
const srcJuggler = "C:\\Users\\sergi\\.gemini\\antigravity-ide\\brain\\0f797738-e41a-40de-8818-61a11989b642\\celebra_juggler_show_1788305000919.jpg";

const destDirPublic = path.join(process.cwd(), 'public', 'assets', 'images');
const destDirAssets = path.join(process.cwd(), 'assets', 'images');

if (!fs.existsSync(destDirPublic)) fs.mkdirSync(destDirPublic, { recursive: true });
if (!fs.existsSync(destDirAssets)) fs.mkdirSync(destDirAssets, { recursive: true });

fs.copyFileSync(srcFire, path.join(destDirPublic, 'fire-performer-luxury.jpg'));
fs.copyFileSync(srcJuggler, path.join(destDirPublic, 'juggler-gala-show.jpg'));

fs.copyFileSync(srcFire, path.join(destDirAssets, 'fire-performer-luxury.jpg'));
fs.copyFileSync(srcJuggler, path.join(destDirAssets, 'juggler-gala-show.jpg'));

console.log("Images copied successfully to public/assets/images and assets/images");

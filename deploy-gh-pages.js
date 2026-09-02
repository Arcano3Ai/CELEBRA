import { execSync } from 'child_process';
import path from 'path';

const distPath = path.join(process.cwd(), 'dist');

try {
  console.log('Inicializando git en dist...');
  execSync('git init', { cwd: distPath, stdio: 'inherit' });
  execSync('git checkout -b gh-pages', { cwd: distPath, stdio: 'inherit' });
  execSync('git add -A', { cwd: distPath, stdio: 'inherit' });
  execSync('git commit -m "deploy: build compilado para GitHub Pages"', { cwd: distPath, stdio: 'inherit' });
  try {
    execSync('git remote add origin https://github.com/Arcano3Ai/CELEBRA.git', { cwd: distPath, stdio: 'inherit' });
  } catch (e) {
    execSync('git remote set-url origin https://github.com/Arcano3Ai/CELEBRA.git', { cwd: distPath, stdio: 'inherit' });
  }
  execSync('git config http.postBuffer 524288000', { cwd: distPath, stdio: 'inherit' });
  console.log('Subiendo a la rama gh-pages...');
  execSync('git push origin gh-pages -f', { cwd: distPath, stdio: 'inherit' });
  console.log('¡Rama gh-pages subida exitosamente!');
} catch (error) {
  console.error('Error al desplegar gh-pages:', error);
}

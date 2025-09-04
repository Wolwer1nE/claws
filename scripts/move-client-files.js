import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdir, rename, rmdir, stat, mkdir } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

async function ensureDir(dirPath) {
  try {
    await mkdir(dirPath, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

async function moveFiles(source, destination) {
  try {
    const items = await readdir(source);

    // Убеждаемся, что целевая папка существует
    await ensureDir(destination);

    for (const item of items) {
      const sourcePath = join(source, item);
      const destPath = join(destination, item);

      const stats = await stat(sourcePath);

      if (stats.isDirectory()) {
        // Рекурсивно обрабатываем подпапки
        await moveFiles(sourcePath, destPath);
      } else {
        // Перемещаем файл
        await rename(sourcePath, destPath);
        console.log(`Moved: ${item}`);
      }
    }

    // Удаляем пустую папку источник
    try {
      await rmdir(source);
      console.log(`Removed empty directory: ${source}`);
    } catch (error) {
      // Игнорируем ошибки удаления папки
      console.log(`Could not remove directory ${source}:`, error.message);
    }
  } catch (error) {
    console.error('Error moving files:', error);
  }
}

async function main() {
  const clientDir = join(projectRoot, 'docs', 'client');
  const docsDir = join(projectRoot, 'docs');

  console.log('Moving client files to docs root...');
  await moveFiles(clientDir, docsDir);
  console.log('Done!');
}

main().catch(console.error);

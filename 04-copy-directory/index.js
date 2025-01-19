const fs = require('fs/promises');
const path = require('path');

const sourceFolder = path.join(__dirname, 'files');
const destinationFolder = path.join(__dirname, 'files-copy');

// Функция копирования директории
async function copyDir() {
  try {
    // Удаляем целевую папку, если она существует
    await fs.rm(destinationFolder, { recursive: true, force: true });

    // Создаём целевую папку
    await fs.mkdir(destinationFolder, { recursive: true });

    // Читаем содержимое исходной папки
    const items = await fs.readdir(sourceFolder, { withFileTypes: true });

    // Копируем каждый элемент
    for (const item of items) {
      const sourcePath = path.join(sourceFolder, item.name);
      const destinationPath = path.join(destinationFolder, item.name);

      if (item.isDirectory()) {
        // Рекурсивно копируем папки
        await copyDirRecursive(sourcePath, destinationPath);
      } else if (item.isFile()) {
        // Копируем файлы
        await fs.copyFile(sourcePath, destinationPath);
      }
    }

    console.log('Directory copied successfully!');
  } catch (err) {
    console.error('Error copying directory:', err.message);
  }
}

// Рекурсивная функция для копирования поддиректорий
async function copyDirRecursive(source, destination) {
  await fs.mkdir(destination, { recursive: true });

  const items = await fs.readdir(source, { withFileTypes: true });

  for (const item of items) {
    const sourcePath = path.join(source, item.name);
    const destinationPath = path.join(destination, item.name);

    if (item.isDirectory()) {
      await copyDirRecursive(sourcePath, destinationPath);
    } else if (item.isFile()) {
      await fs.copyFile(sourcePath, destinationPath);
    }
  }
}

copyDir();

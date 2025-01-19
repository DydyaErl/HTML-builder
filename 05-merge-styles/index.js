const fs = require('fs/promises');
const path = require('path');

// Пути к папкам и файлу
const stylesFolder = path.join(__dirname, 'styles');
const bundleFile = path.join(__dirname, 'project-dist', 'bundle.css');

async function mergeStyles() {
  try {
    // Удаляем старый bundle.css, если он существует
    await fs.writeFile(bundleFile, '', 'utf8');

    // Читаем содержимое папки styles
    const items = await fs.readdir(stylesFolder, { withFileTypes: true });

    for (const item of items) {
      const itemPath = path.join(stylesFolder, item.name);

      // Проверяем, что элемент - файл и имеет расширение .css
      if (item.isFile() && path.extname(item.name) === '.css') {
        // Читаем содержимое файла
        const data = await fs.readFile(itemPath, 'utf8');

        // Добавляем содержимое в bundle.css
        await fs.appendFile(bundleFile, data + '\n');
      }
    }

    console.log('Styles merged successfully into bundle.css!');
  } catch (err) {
    console.error('Error merging styles:', err.message);
  }
}

mergeStyles();

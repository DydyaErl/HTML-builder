const fs = require('fs/promises');
const path = require('path');

// Путь к папке secret-folder
const folderPath = path.join(__dirname, 'secret-folder');

(async () => {
  try {
    // Чтение содержимого папки
    const items = await fs.readdir(folderPath, { withFileTypes: true });

    for (const item of items) {
      if (item.isFile()) {
        const filePath = path.join(folderPath, item.name);
        const fileStats = await fs.stat(filePath);

        // Извлечение имени файла и расширения
        const fileName = path.basename(item.name, path.extname(item.name));
        const fileExtension = path.extname(item.name).slice(1);
        const fileSize = (fileStats.size / 1024).toFixed(3);

        // Вывод в консоль
        console.log(`${fileName} - ${fileExtension} - ${fileSize}kb`);
      }
    }
  } catch (err) {
    console.error('Error reading folder:', err.message);
  }
})();

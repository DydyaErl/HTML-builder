const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Создаём путь к файлу, в который будем записывать
const filePath = path.join(__dirname, 'output.txt');

const writeStream = fs.createWriteStream(filePath, { flags: 'a' });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Приветственное сообщение
console.log('Welcome! Please enter text. Type "exit" or press Ctrl+C to quit.');

// Событие ввода текста
rl.on('line', (input) => {
  if (input.trim().toLowerCase() === 'exit') {
    // Завершаем процесс, если пользователь ввёл "exit"
    farewell();
  } else {
    // Пишем текст в файл
    writeStream.write(input + '\n', (err) => {
      if (err) {
        console.error('Error writing to file:', err.message);
      }
    });
  }
});

// завершение процесса (Ctrl+C)
rl.on('SIGINT', farewell);

// Функция прощания
function farewell() {
  console.log('\nGoodbye! Have a nice day!');
  writeStream.end(); // Закрываем поток записи
  rl.close(); // Закрываем readline
}

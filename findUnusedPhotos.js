const fs = require('fs');
const path = require('path');

// Указываете путь к папке с изображениями
const photoFolderPath = './img/';

// Указываете путь к проекту (корневой папке проекта)
const projectFolderPath = './html/';

// Функция для чтения всех файлов в указанной папке
function readFilesInFolder(folderPath) {
    return fs.readdirSync(folderPath);
}

// Функция для поиска неиспользуемых файлов
function findUnusedPhotos(photoFolder, projectFolder) {
    const allPhotos = getAllFiles(photoFolder).map(photo=>photo.replace(/\\/g, '/'));
    const usedPhotos = new Set();

    // Проходит по всем файлам в проекте и добавляет используемые фото в Set
    function processFile(filePath) {
        const fileContent = fs.readFileSync(filePath, 'utf-8'); // Изменили чтение файла на строку
        allPhotos.forEach(photo => {
            if (fileContent.includes(photo)) { // Теперь можно использовать includes прямо с строкой
                usedPhotos.add(photo);
            }
        });
    }

    // Рекурсивно получает все файлы в указанной папке
    function getAllFiles(folderPath) {
        const files = readFilesInFolder(folderPath);

        return files.flatMap(file => {
            const filePath = path.join(folderPath, file);

            if (fs.statSync(filePath).isDirectory()) {
                return getAllFiles(filePath); // Рекурсивно обрабатываем подпапки
            } else {
                return filePath;
            }
        });
    }

    // Проходит по всем файлам в проекте
    function traverseProjectFolder(folderPath) {
        const files = readFilesInFolder(folderPath);

        files.forEach(file => {
            const filePath = path.join(folderPath, file);

            if (fs.statSync(filePath).isDirectory()) {
                traverseProjectFolder(filePath); // Рекурсивно обрабатываем подпапки
            } else {
                processFile(filePath); // Обрабатываем каждый файл
            }
        });
    }


    traverseProjectFolder(projectFolder);

    // Фильтрует неиспользуемые фото
    const unusedPhotos = allPhotos.filter(photo => !usedPhotos.has(photo));
    return unusedPhotos;
}

// Получаем список неиспользуемых фото
const result = findUnusedPhotos(photoFolderPath, projectFolderPath);

// Выводим результат
console.log('Неиспользуемые фото:');
result.forEach(photo => console.log(photo));

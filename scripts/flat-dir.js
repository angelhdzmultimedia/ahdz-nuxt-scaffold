/*
  Code generated from ChatGPT prompted by: AngelHdz
  Code Modified by: AngelHdz
  2023
*/

import fs from 'node:fs'
import path from 'node:path'

// Function to rename the file and move it to the parent directory
function moveFile(source, destination) {
  fs.renameSync(source, destination);
}

// Function to remove a directory
function removeDirectory(directory) {
  if (fs.existsSync(directory)) {
    fs.readdirSync(directory).forEach((file) => {
      const curPath = path.join(directory, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        removeDirectory(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(directory);
  }
}

// Function to process each subdirectory
function processSubdirectory(subDirPath) {
  const subDirName = path.basename(subDirPath);

  // Check if index.ts or index.js exists in the subdirectory
  const indexTspath = path.join(subDirPath, 'index.ts');
  const indexJspath = path.join(subDirPath, 'index.js');
  if (fs.existsSync(indexTspath)) {
    // Move the index.ts file to the same level of the subdirectory
    const destinationPath = path.join(path.dirname(subDirPath), subDirName + '.ts');
    moveFile(indexTspath, destinationPath);

    // Remove the subdirectory
    removeDirectory(subDirPath);

    console.log(`Moved '${indexTspath}' to '${destinationPath}' and removed '${subDirPath}'.`);
  } else if (fs.existsSync(indexJspath)) {
    // Move the index.js file to the same level of the subdirectory
    const destinationPath = path.join(path.dirname(subDirPath), subDirName + '.js');
    moveFile(indexJspath, destinationPath);

    // Remove the subdirectory
    removeDirectory(subDirPath);

    console.log(`Moved '${indexJspath}' to '${destinationPath}' and removed '${subDirPath}'.`);
  }
}

// Function to recursively loop through the directory
function processDirectory(directory) {
  const items = fs.readdirSync(directory);

  for (const item of items) {
    const itemPath = path.join(directory, item);
    const isDirectory = fs.statSync(itemPath).isDirectory();

    if (isDirectory) {
      processDirectory(itemPath); // Recursive call for subdirectories
      processSubdirectory(itemPath);
    }
  }
}


// Replace 'path/to/directory' with the actual path to the parent directory
const parentDirectory = process.argv[2]
processDirectory(parentDirectory)

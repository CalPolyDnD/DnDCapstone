
export default class FileDataObject {
  constructor(fileName, fileDescription, fileHeader) {
    this.fileName = fileName;
    this.fileDescription = fileDescription;
    this.fileHeader = fileHeader;
  }
  getFileName() {
    return this.fileName;
  }
  getFileDescription() {
      return this.fileDescription;
   }
}




export class FileObject {
  constructor(name, path, classifications, header) {
    this._name = name;
    this._path = path;
    this._classifications = classifications;
    this._header = header;
  }

  get name() {
    return this._name;
  }

  set name(newName) {
    this._name = newName;
  }

  get path() {
    return this._path;
  }

  set filePath(newPath) {
    this._path = newPath;
  }

  get classifications() {
    return this._classifications;
  }

  set classifications(newClassifications) {
    this._classifications = newClassifications;
  }

  get header() {
    return this._header;
  }

  set header(newHeader) {
    this._header = newHeader;
  }
}

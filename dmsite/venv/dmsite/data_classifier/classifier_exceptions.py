class Error(Exception):
    pass


class UnsupportedFileTypeError(Error):
    def __init__(self, file_type):
        self.file_type = file_type
        self.message = "File type '{}' not supported.".format(file_type)

    def __init__(self, file_type, message):
        self.file_type = file_type
        self.message = message

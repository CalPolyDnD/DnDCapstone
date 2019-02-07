class Error(Exception):
    pass


class UnsupportedFileTypeError(Error):
    def __init__(self, file_type):
        self.file_type = file_type
        self.message = f"File type '{file_type}' not supported."

    def __init__(self, file_type, message):
        self.file_type = file_type
        self.message = message

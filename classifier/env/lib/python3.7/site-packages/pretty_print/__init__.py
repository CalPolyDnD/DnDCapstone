__author__ = 'Ian Davis'

# import environment
# environment.setup()

from smart_json import SmartJSONEncoder


def encoder():
    return PrettyPrinter()


class PrettyPrinter(SmartJSONEncoder):
    """ Overloaded JSON Encoder to support encoding any python object that exposes support with a __pretty__ method on
        any class object that can handle returning a standard python data type that json can represent.
    """

    def __init__(self):
        super(PrettyPrinter, self).__init__(sort_keys=True, indent=4, separators=(',', ': '))

    def default(self, obj):
        if hasattr(obj, '__pretty__'):
            return obj.__pretty__()

        return super(PrettyPrinter, self).default(obj)
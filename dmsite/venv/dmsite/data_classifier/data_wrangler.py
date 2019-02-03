import pandas as pd
import os
from pandas.io.json import json_normalize
import json
#import xmltodict
from .classifier_exceptions import UnsupportedFileTypeError


class Wrangler:
    @staticmethod
    def _get_file_type(filename):
        return os.path.splitext(filename)[-1]

    @staticmethod
    def _massage_and_clean(df):
        df = df.transpose()
        df['category'] = df.index
        # TODO: Actually clean data by dropping/replacing null/NaN
        return df.drop('id').melt(id_vars='category').drop('variable', axis=1)

    def _parse_xml(self):
        return
        # """Internal function used to parse XML files"""
        # # try:
        # json_data = json.loads(json.dumps(xmltodict.parse(self.file.read())))
        #
        # # print(json.dumps(json.loads(json_data), indent=4, sort_keys=True))
        # self.data = pd.DataFrame.from_records(json_data)
        # print(self.data)
        # self._calculate_column_metrics()
        # # except:
        # #     print("Error reading file")

    def _parse_json(self):
        return
        # """Internal function used to parse JSON input files"""
        # #try:
        # print(json_normalize(json.load(self.file)))
        # self.data = pd.read_json(json_normalize(json.loads(json.dumps(self.file.read()))))
        # print(self.data)
        # self._calculate_column_metrics()
        # #except:
        #     #print("Error reading file")

    def _parse_csv(self):
        """Internal function that should be used to parse CSV files. It will also generate metadata about the info in
           the CSV file.
        """
        try:
            df = pd.read_csv(self.file_name)
            self.data = self._massage_and_clean(df)
        except IOError:
            print("Error reading file")

    def parse_file(self):
        """Parses the file associated with this wrangler"""
        self._parser(self)

    parsers = {
        ".XML": _parse_xml,
        ".JSON": _parse_json,
        ".CSV": _parse_csv
    }

    def __init__(self, file_name):
        self.file_name = file_name
        self.file_type = self._get_file_type(file_name)
        self.data = None
        if self.file_type.upper() in Wrangler.parsers:
            self._parser = Wrangler.parsers.get(self.file_type.upper())
        else:
            raise UnsupportedFileTypeError(self.file_type)

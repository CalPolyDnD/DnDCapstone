import pandas as pd
from pandas.io.json import json_normalize
import json
import xmltodict


class Wrangler:

    @staticmethod
    def _calculate_min(column):
        if column.dtype == object:
            return column.min().replace("\"", "").strip()
        return column.min()

    @staticmethod
    def _calculate_max(column):
        if column.dtype == object:
            return column.max().replace("\"", "").strip()
        return column.max()

    @staticmethod
    def _calculate_average(column):
        if column.dtype != object:
            return column.mean()
        return 0

    def _calculate_column_metrics(self):
        """
        This method is an internal method used to calculate metadata about the table built from the file associated with
        an instance of DataWrangler. The results of this function are found in the property self.metrics
        """
        self.metrics = pd.DataFrame(columns=["Name", "DType", "Average", "Minimum", "Maximum"])
        for col in self.data:
            col_name = col.replace("\"", "").strip()
            dtype = self.data.dtypes[col]
            avg = self._calculate_average(self.data[col])
            _min = self._calculate_min(self.data[col])
            _max = self._calculate_max(self.data[col])

            entry = pd.Series({"Name": col_name, "DType": dtype, "Average": avg, "Minimum": _min, "Maximum": _max})
            self.metrics = self.metrics.append(entry, ignore_index=True)
        self.metrics.set_index(self.metrics["Name"], inplace=True)
        self.metrics.drop("Name", inplace=True, axis=1)

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
            self.data = pd.read_csv(self.file)
            self._calculate_column_metrics()
        except:
            print("Error reading file")

    def parse_file(self):
        """Parses the file associated with this wrangler"""
        self._parser(self)

    parsers = {
        ".XML": _parse_xml,
        ".JSON": _parse_json,
        ".CSV": _parse_csv
    }

    def __init__(self, file, file_type: str):
        self.file = file
        self.file_type = file_type
        self.data = None
        self.metrics = None
        if file_type.upper() in Wrangler.parsers:
            self._parser = Wrangler.parsers.get(file_type.upper())
        else:
            print("File type not supported")

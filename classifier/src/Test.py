import data_classifier.data_wrangler as dw
import file_manager.file_manager as fm
import os
import pandas as pd


def main():
    path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    path_to_file = os.path.join(path, "data/demographics.csv")
    file = open(path_to_file)
    wrangler = dw.Wrangler(file, ".csv")
    wrangler.parse_file()
    print(wrangler.data.head())
    print('\n')
    with pd.option_context('display.max_rows', None, 'display.max_columns', None):
        print(wrangler.metrics.head(10))

    fm.upload_file(path_to_file)
    fm.fetch_file("demographics.csv")


if __name__ == "__main__":
    main()

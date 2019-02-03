import joblib as jl
import pandas as pd
from .data_wrangler import Wrangler

GROUPING_THRESHOLD = 0.75


class Classification:

    def add_column(self, column):
        self.columns.append(column)

    def add_example(self, example):
        self.examples.append(example)

    def to_json(self):
        return \
            f"""\
{{
    "name": "{self.name}",
    "columns": {self.columns},
    "examples": {self.examples}
}}

            """.replace("'", '"')

    def __eq__(self, other):
        return isinstance(other, self.__class__) and (self.name == other.name)

    def __str__(self):
        f"""Name: {self.name}
            Columns: {self.columns}
            Examples: {self.examples}
        """

    def __init__(self, name):
        self.name = name
        self.examples = []
        self.columns = []


class Classifier:

    @staticmethod
    def _build_results_dict(df):
        result = {}
        for t in df.itertuples():
            actual = t.category
            guess = t.guess

            if actual not in result.keys():
                result[actual] = {}

            if guess not in result[actual].keys():
                result[actual][guess] = 1
            else:
                result[actual][guess] = result[actual][guess] + 1

        return result

    def _build_classifications(self, df):
        results = pd.DataFrame(self._build_results_dict(df)).fillna(0)
        freq = results.apply(max)/results.apply(sum)

        classification_map = {}
        for k, v in freq.items():
            if v >= GROUPING_THRESHOLD:
                classification_map[k] = [results[k].idxmax()]
            else:
                classification_map[k] = [results[k].idxmax(), results[k].drop(results[k].idxmax()).idxmax()]

        classifications = []
        for k, v in classification_map.items():
            for c in v:
                classification = Classification(c)
                if classification not in classifications:
                    classification.add_column(k)
                    for ex in df[df['category'] == k]['value'].head():
                        classification.add_example(ex)
                    classifications.append(classification)

        return classifications

    def _classify_data(self, df):
        classified_df = df
        classified_df['guess'] = self._model.predict(self._vectorize_data(df['value']))

        return self._build_classifications(classified_df)

    def _vectorize_data(self, x):
        return self._vectorizer.fit_transform(x)

    def classify(self, file_name):
        wrangler = Wrangler(file_name)
        wrangler.parse_file()

        return self._classify_data(wrangler.data)

    def __init__(self):
        self._model = jl.load('model.joblib')
        self._vectorizer = jl.load('vectorizer.joblib')

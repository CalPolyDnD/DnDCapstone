import joblib as jl
import pandas as pd
import numpy as np
import dmsite.data_classifier.data_wrangler as dw
import json

GROUPING_THRESHOLD = 0.75


class Classification:

    def add_column(self, column):
        self.columns.append(column)

    def add_example(self, example):
        self.examples.append(example)

    def to_json(self):
        return  {
            "name": self.name,
            "columns": self.columns,
            "examples": self.examples
        }

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
                guess = results[k].idxmax()
                second_best_guess = results[k].drop(results[k].idxmax()).idxmax()

                if guess == 'Unknown':
                    classification_map[k] = [guess, second_best_guess]
                else:
                    classification_map[k] = [guess]

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
        model_input = self._vectorize_data(df['value'])

        model_output = self._model.decision_function(model_input)

        guess = [self._model.classes_[np.argmax(value)] if np.max(value) > 0 else 'Unknown' for value in model_output]

        classified_df['guess'] = guess

        return self._build_classifications(classified_df)

    def _vectorize_data(self, x):
        return self._vectorizer.fit_transform(x)

    def classify(self, file_name):
        wrangler = dw.Wrangler(file_name)
        wrangler.parse_file()

        return self._classify_data(wrangler.data)

    def __init__(self):
        self._model = jl.load('dmsite/data_classifier/model.joblib')
        self._vectorizer = jl.load('dmsite/data_classifier/vectorizer.joblib')

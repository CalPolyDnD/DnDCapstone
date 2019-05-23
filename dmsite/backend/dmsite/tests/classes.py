class TestTable:
    def __init__(self):
        self.file = []
        self.data = []

    def add_data(self, data):
        self.file = data

    def query(self, IndexName=None, KeyConditionExpression=None):
        dict = {}
        dict['Items'] = []
        for i in range(0, len(self.data)):
            dict['Items'].append(self.data[i]['Item'])
        return dict

    def put_item(self, Item = None):
        self.data.append({'Item': Item})

    def update_item(self, Key = None,
                          UpdateExpression=None,
                          ExpressionAttributeNames=None,
                          ExpressionAttributeValues = None):
        for i in range(0, len(self.data)):
            if 'name' in self.data[i]['Item'] and self.data[i]['Item']['name'] == Key['name']:
                for j in range(0, len(ExpressionAttributeValues[':values'])):
                    self.data[i]['Item']['examples'].append(ExpressionAttributeValues[':values'][j])
        if 'filename' in Key:
            for i in range(0, len(self.data)):
                if '#examples' not in ExpressionAttributeNames and 'description' in self.data[i]['Item']:
                    self.data[i]['Item']['description'] = ExpressionAttributeValues[':values']
                elif '#examples' in ExpressionAttributeNames and 'examples' in self.data[i]['Item']:
                    self.data[i]['Item']['examples'] = ExpressionAttributeValues[':values']



    def get_item(self, Key = None):
        for i in range(0, len(self.data)):
            if self.data[i]['Item']['name'] == Key['name']:
                return self.data[i]
        return {}

    def response(self, key):
        for i in range(0, len(self.data)):
            item = self.data[i]['Item']
            if 'name' in key and 'name' in item and key['name'] == item['name']:
                return self.data[i]
            if 'filename' in key and 'filename' in item and key['filename'] == item['filename']:
                return self.data[i]
        return {}


class TestDB:
    def __init__(self):
        self.tbl = TestTable()

    def Table(self, table):
        return self.tbl

    def response(self, key):
        return self.tbl.response(key)

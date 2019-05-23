from dmsite.db_manager import db_manager as db

def get_classifications(data):
    response = db.get_item("files", data)
    new_data = response['Item']
    for classification in response['Item']['classifications']:
        #TODO: need to modify query based on owner, so extra data isn't returned
        key = {"name": classification['name'], "campaign": response['Item']['campaign']} #, 'owner': response['Item']['owner']}
        response = db.get_item("classifications", key)
        classification['examples'] = response['Item']['examples']
    return new_data, 0


def save_classifications(data):
    file = data['files']
    new_classifications = []
    for classification in file['classifications']:
        key = {"name": classification['oldName'], "campaign": file['campaign']}
        response = db.del_item("classifications", key)
        response = db.add_item(
            "classifications",
            {
                "name": classification['name'],
                "campaign": file['campaign'],
                "owner": file['owner'],
                "examples": classification['examples'],
                "is_sensitive": classification['is_sensitive']
            }
        )
        del classification['oldName']
    key = {"filename": file['filename'], "campaign": file['campaign']}
    response = db.update_item(
        "files",
        key,
        'set #classifications = :values ',
        {"#classifications": "classifications"},
        {":values": file['classifications']}
    )
    return data, 0

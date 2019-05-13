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
    return data, 0

'''
{'files': {  
   'filename': 'MOCK_DATA.csv', 
   'classifications': [
      {
         'name': 'lname', 
         'is_sensitive': '0', 
         'examples': ['Cornell', 'Joseph', 'Pegeen', 'Janith', 'Cissiee'], 
         'oldName': 'lname'
      }, {'name': 'test', 'is_sensitive': '0', 'examples': ['cnye0@sciencedirect.com', 'jdeverill1@whitehouse.gov', 'plerego2@amazon.co.jp', 'jpanons3@berkeley.edu', 'cmyhill4@newyorker.com'], 'oldName': 'test'}, {'name': 'gender', 'is_sensitive': '0', 'examples': ['Male', 'Male', 'Female', 'Female', 'Female'], 'oldName': 'gender'}, {'name': 'ip_address', 'is_sensitive': '0', 'examples': ['171.95.103.238', '173.130.94.151', '108.48.103.4', '34.27.99.66', '28.172.195.129'], 'oldName': 'ip_address'}, {'name': 'phone', 'is_sensitive': '0', 'examples': ['128-612-4011', '278-837-7782', '353-423-4599', '535-128-9172', '717-836-1731'], 'oldName': 'phone'}, {'name': 'address', 'is_sensitive': '0', 'examples': ['86 Mcbride Street', '6620 Clarendon Road', '5711 Troy Junction', '32 Manley Alley', '750 Corben Junction'], 'oldName': 'address'}, {'name': 'ssn', 'is_sensitive': '0', 'examples': ['608-45-8721', '409-65-3396', '204-67-8040', '396-47-0769', '691-91-8581'], 'oldName': 'ssn'}, {'name': 'money', 'is_sensitive': '0', 'examples': ['608-45-8721', '409-65-3396', '204-67-8040', '396-47-0769', '691-91-8581'], 'oldName': 'money'}], 'labels': {'address': {'0': '86 Mcbride Street', '1': '6620 Clarendon Road', '2': '5711 Troy Junction', '3': '32 Manley Alley', '4': '750 Corben Junction', '5': '94120 Ilene Avenue', '6': '6553 Farwell Pass', '7': '8 Lerdahl Terrace', '8': '07324 Texas Pass', '9': '8 Rigney Parkway', '10': '91 Tony Center', '11': '22541 Maywood Road', '12': '0163 Bluestem Terrace', '13': '76 Clyde Gallagher Street', '14': '69819 Tennessee Parkway'}, 'gender': {'0': 'Male', '1': 'Male', '2': 'Female', '3': 'Female', '4': 'Female', '5': 'Male', '6': 'Female', '7': 'Female', '8': 'Female', '9': 'Male', '10': 'Male', '11': 'Male', '12': 'Male', '13': 'Male', '14': 'Female'}, 'phone': {'0': '128-612-4011', '1': '278-837-7782', '2': '353-423-4599', '3': '535-128-9172', '4': '717-836-1731', '5': '232-641-2554', '6': '961-528-1763', '7': '404-540-3686', '8': '900-866-9467', '9': '582-157-5830', '10': '589-155-1478', '11': '638-395-9506', '12': '999-763-6756', '13': '846-173-6469', '14': '784-727-6854'}, 'last_name': {'0': 'Nye', '1': 'Deverill', '2': 'Lerego', '3': 'Panons', '4': 'Myhill', '5': 'Itzkovwitch', '6': 'Kynnd', '7': 'Lanktree', '8': 'Wakeman', '9': 'Blaske', '10': 'Adame', '11': 'Mallord', '12': 'Yukhnini', '13': 'Robilliard', '14': 'Spores'}, 'id': {'0': '1', '1': '2', '2': '3', '3': '4', '4': '5', '5': '6', '6': '7', '7': '8', '8': '9', '9': '10', '10': '11', '11': '12', '12': '13', '13': '14', '14': '15'}, 'ip_address': {'0': '171.95.103.238', '1': '173.130.94.151', '2': '108.48.103.4', '3': '34.27.99.66', '4': '28.172.195.129', '5': '187.4.247.67', '6': '69.161.64.47', '7': '23.124.48.207', '8': '242.19.17.111', '9': '237.41.32.171', '10': '112.155.13.173', '11': '115.236.51.18', '12': '88.118.248.63', '13': '182.187.229.165', '14': '176.172.251.252'}, 'first_name': {'0': 'Cornell', '1': 'Joseph', '2': 'Pegeen', '3': 'Janith', '4': 'Cissiee', '5': 'Berty', '6': 'Thelma', '7': 'Roze', '8': 'Laurena', '9': 'Tris', '10': 'Osbourne', '11': 'Nevile', '12': 'Bailie', '13': 'Theodore', '14': 'Jenilee'}, 'email': {'0': 'cnye0@sciencedirect.com', '1': 'jdeverill1@whitehouse.gov', '2': 'plerego2@amazon.co.jp', '3': 'jpanons3@berkeley.edu', '4': 'cmyhill4@newyorker.com', '5': 'bitzkovwitch5@globo.com', '6': 'tkynnd6@omniture.com', '7': 'rlanktree7@theatlantic.com', '8': 'lwakeman8@businessinsider.com', '9': 'tblaske9@dion.ne.jp', '10': 'oadamea@mozilla.org', '11': 'nmallordb@google.com', '12': 'byukhninic@uol.com.br', '13': 'trobilliardd@moonfruit.com', '14': 'jsporese@vimeo.com'}, 'ssn': {'0': '608-45-8721', '1': '409-65-3396', '2': '204-67-8040', '3': '396-47-0769', '4': '691-91-8581', '5': '362-44-7446', '6': '223-43-4071', '7': '274-21-5681', '8': '863-58-5434', '9': '775-29-5872', '10': '375-45-2283', '11': '577-23-2405', '12': '420-04-2224', '13': '819-41-7586', '14': '553-92-4339'}}, 
   'is_classified': '1', 
   'owner': 'test_email@test.com', 
   'description': 'Placeholder Description', 
   'campaign': 'test_campaign'}
}
'''

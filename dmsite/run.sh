cd backend
if [ -n `pip3 freeze | grep -q -e virtualenv` ]; then
   echo "Virtual Environment not active."
   echo "Activating Virtual Environment - please rerun this script if the server does not start."
   cd ..
   source backend/env/bin/activate
fi
mkdir -p media
python3 manage.py runserver

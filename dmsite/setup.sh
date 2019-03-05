#Python Virtualenv setup
if [ -n "$CAPSTONE_ENV" ]; then
   echo "Activating virtual environment..."
   source $CAPSTONE_ENV/bin/activate
   echo "Installing dependencies..."
   pip3 install -r backend/requirements.txt
   echo "Finished installing python dependencies"
else
   echo "CAPSTONE_ENV not set, searching for environment at default location:
   ./backend/env"
   export CAPSTONE_ENV=backend/env

   if [ -d $CAPSTONE_ENV ]; then
      echo "Found an existing virtual environment"
   else
      echo "Could not find existing virtual environment"
      echo "Starting virtual environment setup..."
      if [ -n `pip3 freeze | grep -q -e virtualenv` ]; then
         echo "virtualenv is not installed"
         echo "installing virtualenv..."
         sudo pip3 install virtualenv
      fi
      echo "Creating virtual environment at: ${CAPSTONE_ENV}"
      python3 -m virtualenv $CAPSTONE_ENV
      echo "Virtual environment created"
   fi
   ./setup.sh
   exit
fi

echo "Installing npm packages..."
npm install --prefix frontend
echo "Finihsed installing npm packages"

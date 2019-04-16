@echo off
IF EXIST "backend\env" (
   echo "Virtual Environment Found. Activating virtual environment..."
   backend\env\scripts\activate.bat
   echo "Installing dependencies..."
   pip3 install -r backend\requirements.txt
   echo "Finished installing python dependencies"
   echo "Installing npm packages..."
   npm install --prefix ./frontend
   echo "Finihsed installing npm packages"
) ELSE (
   echo "Could not find existing virtual environment"
   echo "Starting virtual environment setup..."
   pip3 freeze | findstr virtualenv >NUL
   IF ERRORLEVEL 1 (
      echo "virtualenv is not installed"
      echo "installing virtualenv..."
      pip3 install virtualenv
   )
   echo "Creating virtual environment at: backend\env"
   virtualenv backend\env
   echo "Virtual environment created"
   setup.bat
)

@echo off
cd backend
pip3 --version | findstr dmsite\backend >NUL
IF ERRORLEVEL 1 (
   echo "Virtual environment not started."
   echo "Starting Virtual Environment - re-run this script to start the server."
   cd ..
   "backend/env/Scripts/activate"
)
IF NOT EXIST (media) mkdir media
py manage.py runserver
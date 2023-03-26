ssh dur0133@srvfeia0be.vsb.cz
cd backend/
source env/bin/activate
uvicorn main:app --reload --port 10000 --host 158.196.145.23
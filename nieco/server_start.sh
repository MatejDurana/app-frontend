ssh dur0133@srvfeia0be.vsb.cz
cd backend/
source env/bin/activate
uvicorn main:app --reload --host 158.196.145.23 --port 10100
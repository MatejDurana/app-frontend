cd dist/
PORT=8000
fuser -k $PORT/tcp
serve -s -p $PORT
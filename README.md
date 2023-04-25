# app-frontend

## Pre sputenie je doporučené mať naištalované nasledovné nástroje s danými verziami
```
nvm -v
0.39.3

npm -v
8.0.0

node -v
v16.11.1

serve -v
13.0.2

```

### Prvotné naištalovanie a build frontend časti spustíme pomocou príkazov
```
npm install
npm run build
```

### Server pre hostovanie webstránky následne spúštame pomocou príkazov
```
cd dist/
PORT=8000
fuser -k $PORT/tcp
serve -s -p $PORT
```

# backend

## Pre sputenie je doporučené mať naištalované nasledovné nástroje s danými verziami
```
python3.6 --version
Python 3.6.9

python3.10 --version
Python 3.10.8
```

## Taktiež je kvôli niektorým modelom odporučené mať nainštalovanú platformu CUDA

### Pre nainštalovanie virtuálnych prostredí backendu a jednotlivých modelov je potrebné spustiť súbor
```
install_script.sh
```

### Následné spustenie API servera spúštame pomocou príkazov
```
source env/bin/activate
PORT=10100
fuser -k $PORT/tcp
uvicorn main:app --host 158.196.145.23 --port $PORT 
```

# Postup spustenia aplikácie
### Príkazy je potrebné spúšťať v Linux systéme pre ich správnu funkčnosť
### Frontend a backend musia bežať súčasne (prednastanený je localhost na portoch: frontend - 8000, backend - 10100) 

# Spustenie frontendu - zložka app-frontend

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

# Spustenie backendu - zložka backend

## Pre sputenie je doporučené mať naištalované nasledovné nástroje s danými verziami
```
python3.7 --version
Python 3.7.16

pip --version                                           
pip 23.1  #(pre python 3.7)


python3.10 --version
Python 3.10.8

pip --version 
pip 22.2.2  #(pre python 3.10)
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
uvicorn main:app --host 127.0.0.1 --port $PORT 
```

### Zmena IP adresy backendu

1. Zmeníme posledný príkaz pri spúšťaní na -  ```uvicorn main:app --host NOVA_ADRESA --port $PORT```
2. Zmeníme túto adresu aj vo frontend časti v súbore: <br /> 
app-frontend/src/components/ModelPage.vue riadok 142 - premenná ```host: "NOVA_ADRESA"```

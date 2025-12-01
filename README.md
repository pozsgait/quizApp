# Logo Quiz App

Ez egy React + Node.js + MariaDB alapú saját logófelismerő verseny alkalmazás.

## Jellemzők

- Sorszámozott képek (pl. `public/logos/1.png`)
- Felhasználónév megadása után induló teszt
- Lapozható kérdések, fix képméret
- Eredmények és jó válaszok a végén
- Minden eredmény és időtartam MariaDB-ben tárolva
- Admin felület külön `/admin` útvonalon, jelszóval (képet nem mutat)
- Képek a `frontend/public/logos/` mappában

## Indítás

1. **MariaDB tábla létrehozás**  
   Lásd backend/server.js vagy lent.

2. **Backend indítása**
   ```sh
   cd backend
   npm install
   node server.js
   ```

3. **Frontend indítása**
   ```sh
   cd frontend
   npm install
   npm start
   ```

4. **Képek feltöltése**
   A táblában lévő képeket (`frontend/public/logos/`) kell feltölteni.

5. **Admin:**  
   Menj `/admin` útvonalra (`http://localhost:3000/admin`), és add meg a frontenden beállított jelszót.

## Adatbázistábla
```sql
CREATE TABLE logos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(32) NOT NULL,
    solution VARCHAR(128) NOT NULL
);

CREATE TABLE results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(64) NOT NULL,
    datetime DATETIME NOT NULL,
    score INT NOT NULL,
    details TEXT,
    duration_seconds INT
);
```

## .gitignore
```
node_modules
.env
```

---
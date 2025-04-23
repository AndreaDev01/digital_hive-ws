# DigitalHive WebService

Questo repository contiene il backend WebService per **DigitalHive**, progettato per essere scalabile, sicuro e facilmente integrabile.

## 🔗 Documentazione API

La documentazione completa delle API è disponibile qui:  
👉 [https://digitalhive-ws.andreasalvatoredeveloper.it/api-docs](https://digitalhive-ws.andreasalvatoredeveloper.it/api-docs)

---

## 🚀 Avvio del progetto

Per eseguire il WebService in locale, assicurati di avere [Node.js](https://nodejs.org/) installato, quindi segui questi passaggi:

### 1. Clona il repository

```bash
git clone https://github.com/tuo-username/digitalhive-ws.git
cd digitalhive-ws
```

### 2. Installa le dipendenze

```bash
npm install
```

### 3. Crea il file `.env`

Crea un file `.env` nella root del progetto con le seguenti variabili:

```env
MONGODB_URI=mongodb+srv://your-mongo-uri
PORT=3000
JWT_SECRET=your-secret-key
```

### 4. Avvia il server

```bash
npm start
```

Il server sarà in esecuzione all’indirizzo `http://localhost:PORT` (di default `http://localhost:3000`).

---

## 🛠️ Tecnologie principali

- Node.js
- Express
- MongoDB
- JWT Authentication

---

## 🧑‍💻 Autore

**Andrea Salvatore**  
[andreasalvatoredeveloper.it](https://andreasalvatoredeveloper.it)

---

## 📄 Licenza

Questo progetto è distribuito sotto licenza Apache2.

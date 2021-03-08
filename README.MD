# EQ mock work

1. Run backend

config.env

```json
PGHOST=work-samples-db.cx4wctygygyq.us-east-1.rds.amazonaws.com
PGPORT=5432
PGDATABASE=work_samples
PGUSER=readonly
PGPASSWORD=w2UIO@#bg532!
```

```javascript
// Fix error BE install and paste this code into index.js
require('dotenv').config();
```

```nodejs
yarn
yarn run dev
```

2. [Turn off CORS](https://www.moesif.com/blog/technical/cors/Authoritative-Guide-to-CORS-Cross-Origin-Resource-Sharing-for-REST-APIs/)

3. Run FE

```nodejs
yarn
yarn start
```

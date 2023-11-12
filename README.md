![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

# School App
An app made with the intent of studying Java Spring.

## API
To run the API:
- Create an account on [ElephantSQL](https://www.elephantsql.com/) and create an instance.
- Run the following command (on Linux/Mac):
    ```bash
    git clone https://github.com/diegorezm/school_app && cd school && touch src/main/resources/env.properties
    ```
- Create the environmental variables:
  - **DB_NAME='DB_URL'**
  - **DB_PASSWORD='YOUR PASSWORD'**
  - **TOKEN_SECRET='YOUR_PASSWORD'**

Now, all you have to do is run the application. I would recommend reading [the docs](https://github.com/diegorezm/school_app/blob/main/school/README.md).

## Frontend

To run the frontend:

```bash
git clone https://github.com/diegorezm/school_app && cd frontend && npm i && npm run dev
```

Keep in mind that most features on the frontend will only work with the API running.

# Known issues
 - When i rebuild the page (saving while i'm coding) the authorization token stops being sent to the backend. As long as i don't change anything in the code itself
 it is fine.

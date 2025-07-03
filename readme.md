## Команды:

Запуск приложения:
```bash
docker-compose up --build
```

Остановить приложение:
```bash
docker-compose down
```

Остановить и удалить все данные:
```bash
docker-compose down -v
```

## Формат .env файла:
```bash
POSTGRES_PORT=5432
POSTGRES_DB=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=db

APP_PORT=5000

WB_API_KEY=api_key
WB_API_URL=https://common-api.wildberries.ru/api

GOOGLE_SHEETS_IDS=id1,id2...
GOOGLE_SERVICE_ACCOUNT_EMAIL=vladimir@adsfg.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n\n-----END PRIVATE KEY-----\n"

```

id google таблицы находиться между /d/ и /edit в ссылке на гугл таблицу

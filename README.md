# Настройка

Сделать копию файла .env.example -> .env

Поменять в новосозданном фале .env значения:
```bash
BASE_URL=***  //(адрес апи, например: https://public.foodloveapp.ru)
YMAPS_KEY=*** //(апи ключ яндекс карт)

CONSUMER_KEY=***
CONSUMER_SECRET=***
```

## Выделенный Сервер

- Залить файлы на сервер
- Собрать проект
```bash
npm run build
```

- Отслеживать собранные файлы процесс менеджером (например pm2)
```bash
node .output/server/index.mjs
```

## Статический Хостинг

- Собрать проект
```bash
npm run generate
```

- Использовать собранные файлы из директории
```bash
.output/public
```

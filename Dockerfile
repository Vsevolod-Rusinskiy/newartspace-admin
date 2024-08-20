# Этап 1: Сборка
FROM node:20.9.0-alpine AS builder

# Создаем рабочую директорию
WORKDIR /app

# Копируем только необходимые файлы для установки зависимостей
COPY package.json yarn.lock ./

# Устанавливаем все зависимости
RUN yarn install --frozen-lockfile

# Копируем остальные файлы проекта
COPY . .

# Компилируем TypeScript код
RUN yarn build

# Этап 2: Продакшн
FROM node:20.9.0-alpine AS production

# Создаем рабочую директорию
WORKDIR /app

# Копируем только необходимые файлы из builder-а
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/dist ./dist

# Устанавливаем только production-зависимости
# RUN yarn install --frozen-lockfile --production
RUN yarn install --frozen-lockfile

# Указываем команду для запуска приложения
# CMD ["yarn", "serve"]
CMD ["vite", "preview", "--host"]

# Указываем, что контейнер будет слушать порт 4173
EXPOSE 4173

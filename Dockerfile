# Этап 1: Сборка
FROM node:20.9.0-alpine AS builder

# Создаем рабочую директорию
WORKDIR /app

# Добавляем поддержку аргументов сборки
ARG VITE_APP_API_URL

# Выводим значение переменной для отладки
RUN echo "VITE_APP_API_URL is set to $VITE_APP_API_URL"

# Копируем только необходимые файлы для установки зависимостей
COPY package.json yarn.lock ./

# Устанавливаем все зависимости
RUN yarn install --frozen-lockfile

# Копируем остальные файлы проекта
COPY . .

# Компилируем TypeScript код
#RUN #yarn build
RUN VITE_APP_API_URL=$VITE_APP_API_URL yarn build

# Этап 2: Продакшн
FROM node:20.9.0-alpine AS production

# Создаем рабочую директорию
WORKDIR /app

# Копируем только необходимые файлы из builder-а
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/vite.config.ts ./

# Устанавливаем только production-зависимости
RUN yarn install --frozen-lockfile --production

# Указываем команду для запуска приложения
CMD ["node_modules/.bin/http-server", "./dist", "-p", "4173"]

# Указываем, что контейнер будет слушать порт 4173
EXPOSE 4173

const selectLists = {
  artTypesList: [
    { id: 1, value: 'Графика' },
    { id: 2, value: 'Декоративно-прикладное искусство' },
    { id: 3, value: 'Другое' },
    { id: 4, value: 'Живопись' },
    { id: 5, value: 'Плоскостная скульптура' },
    { id: 6, value: 'Работы на бумаге' },
    { id: 7, value: 'Скульптура' },
    { id: 8, value: 'Фотография' },
    { id: 9, value: 'Ювелирное искусство' },
  ],
  colorsList: [
    { id: 1, value: 'Бежевый' },
    { id: 2, value: 'Белый' },
    { id: 3, value: 'Бледно-оранжевый' },
    { id: 4, value: 'Бронзовый' },
    { id: 5, value: 'Голубой' },
    { id: 6, value: 'Желтый' },
    { id: 7, value: 'Зеленый' },
    { id: 8, value: 'Золотой' },
    { id: 9, value: 'Коричневый' },
    { id: 10, value: 'Красный' },
    { id: 11, value: 'Лиловый' },
    { id: 12, value: 'Оранжевый' },
    { id: 13, value: 'Розовый' },
    { id: 14, value: 'Светло-зеленый' },
    { id: 15, value: 'Серебряный' },
    { id: 16, value: 'Серый' },
    { id: 17, value: 'Синий' },
    { id: 18, value: 'Темно-зеленый' },
    { id: 19, value: 'Фиолетовый' },
    { id: 20, value: 'Черный' },
  ],
  formatsList: [
    { id: 1, value: 'Диптих' },
    { id: 2, value: 'Другое' },
    { id: 3, value: 'Квадрат' },
    { id: 4, value: 'Круг' },
    { id: 5, value: 'Многоугольник' },
    { id: 6, value: 'Овал' },
    { id: 7, value: 'Полиптих' },
    { id: 8, value: 'Прямоугольник вертикальный' },
    { id: 9, value: 'Прямоугольник горизонтальный' },
    { id: 10, value: 'Ромб' },
    { id: 11, value: 'Триптих' },
    { id: 12, value: 'Фигуративизм' },
    { id: 13, value: 'Шестиугольник' },
  ],
  materialsList: [
    { id: 1, value: 'Акрил' },
    { id: 2, value: 'Акварель' },
    { id: 3, value: 'Алла Прима' },
    { id: 4, value: 'Алюминий' },
    { id: 5, value: 'Аэрозольная краска' },
    { id: 6, value: 'Авторская печать' },
    { id: 7, value: 'Асфальт' },
    { id: 8, value: 'Бетон' },
    { id: 9, value: 'Бронза' },
    { id: 10, value: 'Бумага' },
    { id: 11, value: 'Гипс' },
    { id: 12, value: 'Глазурь' },
    { id: 13, value: 'Гуашь' },
    { id: 14, value: 'Двп' },
    { id: 15, value: 'Деколь' },
    { id: 16, value: 'Дерево' },
    { id: 17, value: 'Камень' },
    { id: 18, value: 'Каменная масса' },
    { id: 19, value: 'Карандаш' },
    { id: 20, value: 'Картон' },
    { id: 21, value: 'Керамика' },
    { id: 22, value: 'Коллаж' },
    { id: 23, value: 'Кожа' },
    { id: 24, value: 'Лак' },
    { id: 25, value: 'Левкас' },
    { id: 26, value: 'Лентикулярная варио-печать' },
    { id: 27, value: 'Линеры' },
    { id: 28, value: 'Линогравюра' },
    { id: 29, value: 'Лён' },
    { id: 30, value: 'Масло' },
    { id: 31, value: 'Маркеры' },
    { id: 32, value: 'Мдф' },
    { id: 33, value: 'Мелки' },
    { id: 34, value: 'Металл' },
    { id: 35, value: 'Мозаика' },
    { id: 36, value: 'Нержавеющая сталь' },
    { id: 37, value: 'Оргалит' },
    { id: 38, value: 'Пастель' },
    { id: 39, value: 'Патина' },
    { id: 40, value: 'Пвх' },
    { id: 41, value: 'Переработанный пластик' },
    { id: 42, value: 'Пластик' },
    { id: 43, value: 'Планшет' },
    { id: 44, value: 'Полимерный фарфор' },
    { id: 45, value: 'Полуфарфор' },
    { id: 46, value: 'Поталь' },
    { id: 47, value: 'Рисовая бумага' },
    { id: 48, value: 'Ручная проявка' },
    { id: 49, value: 'Скальола' },
    { id: 50, value: 'Смешанная техника' },
    { id: 51, value: 'Стекло' },
    { id: 52, value: 'Стеклопластик' },
    { id: 53, value: 'Сухая игла' },
    { id: 54, value: 'Темпера' },
    { id: 55, value: 'Тиражная печать' },
    { id: 56, value: 'Ткань' },
    { id: 57, value: 'Тушь' },
    { id: 58, value: 'Фанера' },
    { id: 59, value: 'Фарфор' },
    { id: 60, value: 'Фотобумага' },
    { id: 61, value: 'Фотография' },
    { id: 62, value: 'Хлопок' },
    { id: 63, value: 'Холст' },
    { id: 64, value: 'Цемент' },
    { id: 65, value: 'Цифровая фотография' },
    { id: 66, value: 'Чернила' },
    { id: 67, value: 'Шамот' },
    { id: 68, value: 'Шамотированная масса' },
    { id: 69, value: 'Эгломизе' },
    { id: 70, value: 'Эко кожа' },
    { id: 71, value: 'Led неон' },
    { id: 72, value: 'Винил' },
    { id: 73, value: 'Воск' },
    { id: 74, value: 'Другое' },
  ],
  stylesList: [
    { id: 1, value: 'Абстракционизм' },
    { id: 2, value: 'Абстрактный импрессионизм' },
    { id: 3, value: 'Абстрактный экспрессионизм' },
    { id: 4, value: 'Академизм' },
    { id: 5, value: 'Акционизм' },
    { id: 6, value: 'Американский реализм' },
    { id: 7, value: 'Андеграунд' },
    { id: 8, value: 'Анималистика' },
    { id: 9, value: 'Аппликация' },
    { id: 10, value: 'Артбарокко' },
    { id: 11, value: 'Артдеко' },
    { id: 12, value: 'Артклассицизм' },
    { id: 13, value: 'Артклассика' },
    { id: 14, value: 'Артрококо' },
    { id: 15, value: 'Арт-феминизм' },
    { id: 16, value: 'Актуальное искусство' },
    { id: 17, value: 'Ар-нуво (модерн)' },
    { id: 18, value: 'Арте повера' },
    { id: 19, value: 'Аэрография' },
    { id: 20, value: 'Баухаус' },
    { id: 21, value: 'Батальный жанр' },
    { id: 22, value: 'Бидермейр' },
    { id: 23, value: 'Будущее' },
    { id: 24, value: 'Бытовой жанр' },
    { id: 25, value: 'Византийский стиль' },
    { id: 26, value: 'Впечатление' },
    { id: 27, value: 'Вчувствование' },
    { id: 28, value: 'Геометрический абстракционизм' },
    { id: 29, value: 'Гиперреализм' },
    { id: 30, value: 'Городской пейзаж' },
    { id: 31, value: 'Готика' },
    { id: 32, value: 'Графика' },
    { id: 33, value: 'Дадаизм' },
    { id: 34, value: 'Декоративная живопись' },
    { id: 35, value: 'Дивизионизм' },
    { id: 36, value: 'Другое' },
    { id: 37, value: 'Живопись цветового поля' },
    { id: 38, value: 'Земляничное настроение' },
    { id: 39, value: 'Импрессионизм' },
    { id: 40, value: 'Иппический жанр' },
    { id: 41, value: 'Исторический жанр' },
    { id: 42, value: 'Каллиграфия' },
    { id: 43, value: 'Каприччо' },
    { id: 44, value: 'Китч' },
    { id: 45, value: 'Классицизм' },
    { id: 46, value: 'Кобофутуризм' },
    { id: 47, value: 'Конструктивизм' },
    { id: 48, value: 'Концептуализм' },
    { id: 49, value: 'Кубизм' },
    { id: 50, value: 'Ленд-арт' },
    { id: 51, value: 'Лоуброу арт (поп-сюрреализм)' },
    { id: 52, value: 'Лучизм' },
    { id: 53, value: 'Магический реализм' },
    { id: 54, value: 'Маньеризм' },
    { id: 55, value: 'Марина' },
    { id: 56, value: 'Метафизическая живопись' },
    { id: 57, value: 'Метареализм' },
    { id: 58, value: 'Модернизм' },
    { id: 59, value: 'Наивное искусство/примитивизм' },
    { id: 60, value: 'Натурализм' },
    { id: 61, value: 'Натюрморт' },
    { id: 62, value: 'Неодадаизм' },
    { id: 63, value: 'Неоимпрессионизм' },
    { id: 64, value: 'Неоэкспрессионизм' },
    { id: 65, value: 'Неопластитизм' },
    { id: 66, value: 'Новый стиль' },
    { id: 67, value: 'Новейший стиль' },
    { id: 68, value: 'Ню' },
    { id: 69, value: 'Оп-арт' },
    { id: 70, value: 'Орфизм' },
    { id: 71, value: 'Пастораль' },
    { id: 72, value: 'Перфоманс' },
    { id: 73, value: 'Пейзаж' },
    { id: 74, value: 'Постимпрессионизм' },
    { id: 75, value: 'Поп-арт' },
    { id: 76, value: 'Примитивизм' },
    { id: 77, value: 'Пуантилизм' },
    { id: 78, value: 'Пуантелизм' },
    { id: 79, value: 'Пуризм' },
    { id: 80, value: 'Реализм' },
    { id: 81, value: 'Романтизм' },
    { id: 82, value: 'Рококо' },
    { id: 83, value: 'Сентиментализм' },
    { id: 84, value: 'Современность' },
    { id: 85, value: 'Спациализм' },
    { id: 86, value: 'Соединение стилей' },
    { id: 87, value: 'Сочетание стилей' },
    { id: 88, value: 'Стрит–арт' },
    { id: 89, value: 'Супрематизм' },
    { id: 90, value: 'Сюрреализм' },
    { id: 91, value: 'Сюрреализм' },
    { id: 92, value: 'Таланты' },
    { id: 93, value: 'Техника' },
    { id: 94, value: 'Трудолюбие' },
    { id: 95, value: 'Ультраартнуво' },
    { id: 96, value: 'Фигуративизм' },
    { id: 97, value: 'Фигуративное искусство' },
    { id: 98, value: 'Фовизм' },
    { id: 99, value: 'Флуксус' },
    { id: 100, value: 'Фотография' },
    { id: 101, value: 'Футуризм' },
    { id: 102, value: 'Цифровое искусство' },
    { id: 103, value: 'Чувства' },
    { id: 104, value: 'Экспрессионизм' },
  ],
  themesList: [
    { id: 1, value: '21 Век' },
    { id: 2, value: 'Абстракция' },
    { id: 3, value: 'Ароматы' },
    { id: 4, value: 'Бабочки' },
    { id: 5, value: 'Благотворительность' },
    { id: 6, value: 'Бог' },
    { id: 7, value: 'Будущее' },
    { id: 8, value: 'Быт' },
    { id: 9, value: 'Весна' },
    { id: 10, value: 'Взгляд' },
    { id: 11, value: 'Вкусы' },
    { id: 12, value: 'Внимание' },
    { id: 13, value: 'Вода' },
    { id: 14, value: 'Гендер' },
    { id: 15, value: 'Город' },
    { id: 16, value: 'Гравитация' },
    { id: 17, value: 'Грация' },
    { id: 18, value: 'День' },
    { id: 19, value: 'Дела' },
    { id: 20, value: 'Детские' },
    { id: 21, value: 'Для Нее' },
    { id: 22, value: 'Для Него' },
    { id: 23, value: 'Дома' },
    { id: 24, value: 'Другое' },
    { id: 25, value: 'Деревня' },
    { id: 26, value: 'Еда' },
    { id: 27, value: 'Животные' },
    { id: 28, value: 'Жизнь' },
    { id: 29, value: 'Звери' },
    { id: 30, value: 'Земля' },
    { id: 31, value: 'Зима' },
    { id: 32, value: 'Известные Лица' },
    { id: 33, value: 'Изящность' },
    { id: 34, value: 'Игры' },
    { id: 35, value: 'Камни' },
    { id: 36, value: 'Классика' },
    { id: 37, value: 'Книги' },
    { id: 38, value: 'Космос' },
    { id: 39, value: 'Красота' },
    { id: 40, value: 'Лето' },
    { id: 41, value: 'Лес' },
    { id: 42, value: 'Линии' },
    { id: 43, value: 'Личное' },
    { id: 44, value: 'Ловля Рыбы' },
    { id: 45, value: 'Люди' },
    { id: 46, value: 'Любовь' },
    { id: 47, value: 'Математика' },
    { id: 48, value: 'Металлы' },
    { id: 49, value: 'Мечты' },
    { id: 50, value: 'Мода' },
    { id: 51, value: 'Модерн' },
    { id: 52, value: 'Мосты' },
    { id: 53, value: 'Музыка' },
    { id: 54, value: 'Мужественность' },
    { id: 55, value: 'Настоящее' },
    { id: 56, value: 'Натюрморт' },
    { id: 57, value: 'Наука' },
    { id: 58, value: 'Нежность' },
    { id: 59, value: 'Ночь' },
    { id: 60, value: 'Новое' },
    { id: 61, value: 'Ню' },
    { id: 62, value: 'Огонь' },
    { id: 63, value: 'Организация' },
    { id: 64, value: 'Осень' },
    { id: 65, value: 'Оригинальная Деревня' },
    { id: 66, value: 'Основа' },
    { id: 67, value: 'Пейзаж' },
    { id: 68, value: 'Поля' },
    { id: 69, value: 'Портрет' },
    { id: 70, value: 'Поступки' },
    { id: 71, value: 'Птицы' },
    { id: 72, value: 'Природа' },
    { id: 73, value: 'Производства' },
    { id: 74, value: 'Простота' },
    { id: 75, value: 'Прогулка' },
    { id: 76, value: 'Реализм' },
    { id: 77, value: 'Решимость' },
    { id: 78, value: 'Роскошь' },
    { id: 79, value: 'Рыбы' },
    { id: 80, value: 'Свет' },
    { id: 81, value: 'Сады' },
    { id: 82, value: 'Семья' },
    { id: 83, value: 'Современность' },
    { id: 84, value: 'Слова' },
    { id: 85, value: 'Спорт' },
    { id: 86, value: 'Стиль' },
    { id: 87, value: 'Строения' },
    { id: 88, value: 'Сюжет' },
    { id: 89, value: 'Сюрреализм' },
    { id: 90, value: 'Таланты' },
    { id: 91, value: 'Творчество' },
    { id: 92, value: 'Твердость' },
    { id: 93, value: 'Техника' },
    { id: 94, value: 'Трудолюбие' },
    { id: 95, value: 'Успехи' },
    { id: 96, value: 'Уют' },
    { id: 97, value: 'Фигуративизм' },
    { id: 98, value: 'Фотография' },
    { id: 99, value: 'Цветы' },
    { id: 100, value: 'Чувства' },
    { id: 101, value: 'Элегантность' },
    { id: 102, value: 'Характер' },
    { id: 103, value: 'Хозяйство' },
    { id: 104, value: 'Актуальное искусство' },
    { id: 106, value: 'Животные' },
    { id: 107, value: 'Любовь' },
    { id: 108, value: 'Модерн' },
    { id: 109, value: 'Ню' },
    { id: 110, value: 'Поп-арт' },
  ],
}

function sortSelectLists(selectLists) {
  const sortedList = {}
  const selectListsKeys = Object.keys(selectLists)

  selectListsKeys.forEach((category) => {
    if (typeof selectLists[category][0].value === 'string') {
      sortedList[category] = selectLists[category].sort((a, b) =>
        a.value.localeCompare(b.value)
      )
    } else {
      sortedList[category] = selectLists[category].sort(
        (a, b) => a.value - b.value
      )
    }
  })
  return sortedList
}

export const sortedSelectList = sortSelectLists(selectLists)

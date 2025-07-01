# VoiceBot API Documentation

## Описание

Полноценное API для управления голосовым ботом технической поддержки с интеграцией SIP-телефонии, 1С:Итилиум и голосовых движков.

## Базовый URL

```
http://localhost:8080/api
```

## Группы эндпоинтов

### 1. SIP Телефония (`/api/sip/`)

#### `POST /api/sip/test`

Тестирует подключение к SIP серверу

```json
{
  "server": "192.168.1.100",
  "port": 5060,
  "username": "voicebot",
  "password": "password123",
  "domain": "company.com"
}
```

#### `POST /api/sip/register`

Регистрирует SIP клиента на сервере

```json
{
  "server": "192.168.1.100",
  "port": 5060,
  "username": "voicebot",
  "password": "password123"
}
```

#### `GET /api/sip/status`

Возвращает текущий статус SIP подключения

#### `POST /api/sip/simulate-call`

Симулирует входящий звонок (для тестирования)

```json
{
  "callerId": "+7-495-123-4567"
}
```

### 2. 1С:Итилиум (`/api/1c/`)

#### `POST /api/1c/test`

Тестирует подключение к 1С API

```json
{
  "baseUrl": "https://1c.company.com/api/odata",
  "apiKey": "your-api-key-here",
  "username": "admin",
  "password": "password"
}
```

#### `POST /api/1c/connect`

Подключается к 1С системе

#### `POST /api/1c/tickets`

Создает новую заявку в 1С

```json
{
  "title": "Проблема с сервером",
  "description": "Подробное описание проблемы",
  "priority": "high",
  "category": "Серверы",
  "customerName": "Иванов Петр",
  "customerPhone": "+7-495-123-4567"
}
```

#### `GET /api/1c/tickets?limit=20`

Получает список заявок из 1С

#### `GET /api/1c/status`

Статус подключения к 1С

### 3. Голосовые движки (`/api/voice/`)

#### `POST /api/voice/initialize`

Инициализирует TTS и STT движки

```json
{
  "ttsEngine": "coqui",
  "sttEngine": "vosk",
  "language": "ru",
  "voiceModel": "ru_v3",
  "speechRate": 1.0,
  "pitch": 0.0,
  "volume": 0.8
}
```

#### `POST /api/voice/synthesize`

Синтезирует речь из текста

```json
{
  "text": "Здравствуйте! Как дела?"
}
```

Возвращает аудио файл

#### `POST /api/voice/recognize`

Распознает речь из аудио файла

- Content-Type: multipart/form-data
- Поле: `audio` (файл)

#### `POST /api/voice/test`

Тестирует работу голосовых движков

#### `GET /api/voice/status`

Статус голосовых движков

#### `PUT /api/voice/config`

Обновляет конфигурацию голосовых движков

### 4. Логи и мониторинг (`/api/logs/` и `/api/metrics/`)

#### `GET /api/logs/calls?limit=50&offset=0&status=active`

Получает логи звонков

#### `POST /api/logs/calls`

Создает запись о звонке

```json
{
  "callId": "call-123",
  "callerNumber": "+7-495-123-4567",
  "startTime": "2024-01-01T10:00:00Z",
  "status": "active"
}
```

#### `PUT /api/logs/calls/:callId`

Обновляет запись о звонке

#### `GET /api/dashboard/stats`

Статистика для дашборда

#### `GET /api/metrics?hours=24`

Системные метрики за указанный период

#### `POST /api/metrics`

Записывает системные метрики

## Форматы ответов

### Успешный ответ

```json
{
  "success": true,
  "data": {...},
  "message": "Operation completed"
}
```

### Ответ с ошибкой

```json
{
  "success": false,
  "error": "Error description",
  "message": "User-friendly message"
}
```

## Реальные интеграции

### SIP Телефония

- Подключение к Asterisk/FreePBX серверам
- Реальная регистрация SIP клиента
- Обработка входящих/исходящих звонков
- Мониторинг состояния подключения

### 1С:Итилиум

- OData API интеграция
- Создание заявок в реальной базе 1С
- Получение статусов заявок
- Синхронизация данных

### Голосовые движки

- Coqui.ai, Mozilla TTS, Silero для синтеза речи
- Vosk, Whisper.cpp, Silero для распознавания
- Поддержка русского языка
- Настройка параметров голоса

### База данных

- SQLite для логов и метрик
- Автоматическое создание таблиц
- Индексы для быстрого поиска
- Ротация старых данных

## Безопасность

- Все пароли и ключи API хранятся в зашифрованном виде
- HTTPS для всех внешних подключений
- Валидация входных данных
- Логирование всех операций

## Мониторинг

- Real-time статус всех подсистем
- Автоматические проверки здоровья
- Алерты при сбоях
- Метрики производительности

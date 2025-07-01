# 📝 Примеры конфигураций VoiceBot

## 🏢 Конфигурации для разных случаев использования

### 1. Малый офис (10-50 сотрудников)

#### Оборудование:

- **Сервер**: 1 машина (4GB RAM, 2 CPU cores)
- **PBX**: FreePBX или 3CX
- **Интернет**: 10 Мбит/с
- **1С**: Облачная или локальная

#### Настройки VoiceBot:

```json
{
  "sip": {
    "server": "192.168.1.10",
    "port": 5060,
    "username": "voicebot",
    "password": "secure123",
    "maxConcurrentCalls": 3
  },
  "voice": {
    "ttsEngine": "silero",
    "sttEngine": "vosk",
    "language": "ru",
    "speechRate": 1.0,
    "qualityLevel": "medium"
  },
  "oneC": {
    "baseUrl": "https://company.1c-cloud.ru/api/odata",
    "apiKey": "your-api-key",
    "autoSync": true,
    "syncInterval": 300
  }
}
```

---

### 2. Средний офис (50-200 сотрудников)

#### Оборудование:

- **Сервер**: 2 машины (8GB RAM, 4 CPU cores)
- **PBX**: Asterisk с высокой доступностью
- **Интернет**: 50 Мбит/с
- **1С**: Локальная установка

#### Настройки VoiceBot:

```json
{
  "sip": {
    "servers": [
      {
        "primary": true,
        "server": "192.168.1.10",
        "port": 5060,
        "username": "voicebot_primary",
        "password": "secure123"
      },
      {
        "backup": true,
        "server": "192.168.1.11",
        "port": 5060,
        "username": "voicebot_backup",
        "password": "secure456"
      }
    ],
    "maxConcurrentCalls": 10,
    "loadBalancing": true
  },
  "voice": {
    "ttsEngine": "coqui",
    "sttEngine": "whisper",
    "language": "ru",
    "speechRate": 1.0,
    "qualityLevel": "high",
    "useGPU": true
  },
  "oneC": {
    "baseUrl": "http://192.168.1.50:8080/company/odata/standard.odata",
    "username": "voicebot_user",
    "password": "secure789",
    "database": "company_db",
    "autoSync": true,
    "syncInterval": 60
  },
  "monitoring": {
    "enableMetrics": true,
    "alertEmail": "admin@company.com",
    "alertThresholds": {
      "cpuUsage": 80,
      "memoryUsage": 85,
      "callQueueLength": 5
    }
  }
}
```

---

### 3. Крупная организация (200+ сотрудников)

#### Оборудование:

- **Кластер**: 3+ серверов (16GB RAM, 8 CPU cores)
- **PBX**: Asterisk кластер или enterprise решение
- **Интернет**: 100+ Мбит/с
- **1С**: Кластер серверов 1С

#### Настройки VoiceBot:

```json
{
  "cluster": {
    "enabled": true,
    "nodes": [
      {
        "id": "node1",
        "host": "voicebot1.company.local",
        "primary": true
      },
      {
        "id": "node2",
        "host": "voicebot2.company.local",
        "backup": true
      },
      {
        "id": "node3",
        "host": "voicebot3.company.local",
        "backup": true
      }
    ]
  },
  "sip": {
    "serverPool": [
      "asterisk1.company.local:5060",
      "asterisk2.company.local:5060",
      "asterisk3.company.local:5060"
    ],
    "credentials": {
      "username": "voicebot_cluster",
      "password": "ultra_secure_password"
    },
    "maxConcurrentCalls": 50,
    "loadBalancing": "round_robin",
    "failover": {
      "enabled": true,
      "healthCheckInterval": 30,
      "maxRetries": 3
    }
  },
  "voice": {
    "ttsEngine": "coqui",
    "sttEngine": "whisper",
    "language": "ru",
    "speechRate": 1.0,
    "qualityLevel": "ultra",
    "useGPU": true,
    "gpuMemoryLimit": "8GB",
    "modelCache": true
  },
  "oneC": {
    "clusterUrls": [
      "http://1c-server1.company.local:8080/company/odata/standard.odata",
      "http://1c-server2.company.local:8080/company/odata/standard.odata"
    ],
    "authentication": {
      "type": "oauth2",
      "clientId": "voicebot_client",
      "clientSecret": "very_secure_secret"
    },
    "connectionPool": {
      "maxConnections": 10,
      "timeout": 30000
    },
    "autoSync": true,
    "syncInterval": 30
  }
}
```

---

## 🌐 Интеграция с облачными сервисами

### Microsoft Teams / Skype for Business

```json
{
  "integrations": {
    "teams": {
      "enabled": true,
      "tenantId": "your-tenant-id",
      "clientId": "your-client-id",
      "clientSecret": "your-client-secret",
      "botName": "IT Support Bot",
      "channels": ["support", "it-help"]
    }
  }
}
```

### Telegram Bot

```json
{
  "integrations": {
    "telegram": {
      "enabled": true,
      "botToken": "your-bot-token",
      "chatIds": ["@support_chat", "-1001234567890"],
      "notifications": {
        "newTicket": true,
        "systemAlerts": true,
        "dailyReport": true
      }
    }
  }
}
```

### Email уведомления

```json
{
  "integrations": {
    "email": {
      "enabled": true,
      "smtp": {
        "host": "smtp.company.com",
        "port": 587,
        "secure": false,
        "auth": {
          "user": "voicebot@company.com",
          "pass": "email_password"
        }
      },
      "templates": {
        "newTicket": "templates/new_ticket.html",
        "callSummary": "templates/call_summary.html"
      },
      "recipients": {
        "support": ["support@company.com"],
        "alerts": ["admin@company.com", "it@company.com"]
      }
    }
  }
}
```

---

## 🔧 Специализированные настройки

### Медицинское учреждение

```json
{
  "domain": "medical",
  "compliance": {
    "hipaaCompliant": true,
    "dataEncryption": true,
    "auditLogging": true
  },
  "voice": {
    "language": "ru",
    "medicalTerminology": true,
    "confidentialMode": true
  },
  "categories": [
    "Запись к врачу",
    "Результаты анализов",
    "Техподдержка медоборудования",
    "IT поддержка"
  ],
  "workingHours": {
    "monday": "08:00-20:00",
    "tuesday": "08:00-20:00",
    "wednesday": "08:00-20:00",
    "thursday": "08:00-20:00",
    "friday": "08:00-20:00",
    "saturday": "09:00-15:00",
    "sunday": "closed"
  }
}
```

### Образовательное учреждение

```json
{
  "domain": "education",
  "voice": {
    "language": "ru",
    "youthFriendly": true,
    "educationalTerms": true
  },
  "categories": [
    "Проблемы с компьютерами",
    "Интернет и Wi-Fi",
    "Проекторы и презентации",
    "Электронный журнал",
    "Дистанционное обучение"
  ],
  "specialFeatures": {
    "studentMode": true,
    "teacherMode": true,
    "parentMode": true
  },
  "workingHours": {
    "schoolYear": "09:00-17:00",
    "holidays": "10:00-16:00"
  }
}
```

### Производственное предприятие

```json
{
  "domain": "manufacturing",
  "voice": {
    "language": "ru",
    "industrialTerms": true,
    "urgentMode": true
  },
  "categories": [
    "Аварийная ситуация",
    "Поломка оборудования",
    "Проблемы с сетью",
    "1С и учетные системы",
    "Офисная техника"
  ],
  "priority": {
    "emergency": {
      "keywords": ["авария", "поломка", "не работает", "срочно"],
      "escalation": "immediate",
      "notifications": ["supervisor", "engineer", "it_manager"]
    }
  },
  "workingHours": {
    "shifts": ["06:00-14:00", "14:00-22:00", "22:00-06:00"],
    "weekend": "reduced_staff"
  }
}
```

---

## 📱 Мобильная интеграция

### Настройка мобильного приложения

```json
{
  "mobile": {
    "enabled": true,
    "platforms": ["ios", "android"],
    "features": {
      "pushNotifications": true,
      "offlineMode": true,
      "voiceMessages": true
    },
    "api": {
      "baseUrl": "https://voicebot.company.com/api",
      "authentication": "oauth2",
      "rateLimit": 100
    }
  }
}
```

---

## 🚀 Производительность и масштабирование

### Оптимизация для высокой нагрузки

```json
{
  "performance": {
    "caching": {
      "enabled": true,
      "redis": {
        "host": "redis.company.local",
        "port": 6379,
        "db": 0
      },
      "ttl": {
        "userSessions": 3600,
        "apiResponses": 300,
        "voiceModels": 86400
      }
    },
    "queue": {
      "processor": "bull",
      "concurrency": 10,
      "maxJobs": 1000,
      "backoff": {
        "type": "exponential",
        "delay": 2000
      }
    },
    "database": {
      "connectionPool": 20,
      "queryTimeout": 30000,
      "indexOptimization": true
    }
  }
}
```

---

## 🔐 Безопасность и соответствие требованиям

### Настройки безопасности

```json
{
  "security": {
    "encryption": {
      "algorithm": "AES-256-GCM",
      "keyRotation": "monthly"
    },
    "authentication": {
      "mfa": true,
      "passwordPolicy": {
        "minLength": 12,
        "requireSpecialChars": true,
        "expiration": 90
      }
    },
    "audit": {
      "enabled": true,
      "logLevel": "detailed",
      "retention": 365,
      "compliance": ["SOX", "GDPR", "152-ФЗ"]
    },
    "network": {
      "allowedIPs": ["192.168.1.0/24", "10.0.0.0/8"],
      "sslOnly": true,
      "rateLimit": {
        "api": 100,
        "web": 1000
      }
    }
  }
}
```

---

## 📊 Мониторинг и аналитика

### Настройки мониторинга

```json
{
  "monitoring": {
    "metrics": {
      "prometheus": {
        "enabled": true,
        "endpoint": "/metrics",
        "port": 9090
      },
      "custom": {
        "callVolume": true,
        "recognitionAccuracy": true,
        "responseTime": true,
        "systemHealth": true
      }
    },
    "alerting": {
      "channels": ["email", "telegram", "slack"],
      "rules": [
        {
          "name": "High CPU Usage",
          "condition": "cpu > 80%",
          "duration": "5m",
          "severity": "warning"
        },
        {
          "name": "Service Down",
          "condition": "health_check_failed",
          "duration": "1m",
          "severity": "critical"
        }
      ]
    },
    "dashboards": {
      "grafana": {
        "enabled": true,
        "url": "http://grafana.company.local:3000"
      }
    }
  }
}
```

---

## 🌍 Многоязычная поддержка

### Настройки для нескольких языков

```json
{
  "multilingual": {
    "enabled": true,
    "defaultLanguage": "ru",
    "supportedLanguages": ["ru", "en", "de", "zh"],
    "detection": {
      "auto": true,
      "confidence": 0.8,
      "fallbackLanguage": "ru"
    },
    "models": {
      "ru": {
        "tts": "coqui_ru_v3",
        "stt": "vosk_ru_0.42"
      },
      "en": {
        "tts": "coqui_en_ljspeech",
        "stt": "vosk_en_us_0.22"
      }
    },
    "phrases": {
      "greeting": {
        "ru": "Здравствуйте! Служба технической поддержки.",
        "en": "Hello! Technical support service.",
        "de": "Hallo! Technischer Support Service.",
        "zh": "您好！技术支持服务。"
      }
    }
  }
}
```

Все эти конфигурации можно использовать как основу и адаптировать под ваши потребности. 🚀

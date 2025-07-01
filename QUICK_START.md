# ⚡ Быстрый старт VoiceBot

## 🚀 За 15 минут до первого звонка

### 1️⃣ Проверьте систему (2 минуты)

```bash
# Проверьте версии
python3 --version  # ≥ 3.8
node --version     # ≥ 16
npm --version      # ≥ 8

# Запустите VoiceBot
npm start
```

Откройте http://localhost:8080 - должна открыться панель управления.

### 2️⃣ Настройте SIP (5 минут)

1. Перейдите: **Settings → SIP Configuration**
2. Введите данные вашего SIP сервера:
   ```
   Server: 192.168.1.100  (IP вашего Asterisk/FreePBX)
   Port: 5060             (стандартный порт)
   Username: voicebot     (логин для бота)
   Password: ********     (пароль)
   ```
3. Нажмите **"Test & Register"**
4. Дождитесь статуса **"Online"** ✅

### 3️⃣ Настройте голос (5 минут)

1. Перейдите: **Settings → Voice Configuration**
2. Выберите движки:
   ```
   TTS Engine: Coqui.ai (лучшее качество)
   STT Engine: Vosk     (работает офлайн)
   Language: ru         (русский язык)
   ```
3. Нажмите **"Initialize & Test"**
4. Дождитесь успешного теста ✅

### 4️⃣ Подключите 1С (3 минуты)

1. Перейдите: **Settings → 1C Integration**
2. Введите данные API:
   ```
   URL: https://your-company.1c-cloud.ru/api/odata
   API Key: ваш_ключ_API
   ```
3. Нажмите **"Test & Connect"**
4. Дождитесь подключения ✅

---

## 🎯 Первый тестовый звонок

1. На **Dashboard** нажмите **"Simulate Incoming Call"**
2. Проверьте логи в разделе **"Call Logs"**
3. Убедитесь что создалась заявка в 1С

**🎉 Готово! Ваш VoiceBot работает!**

---

## 📞 Номера для тестирования

Настройте в вашей PBX перенаправление на VoiceBot:

```
# Для Asterisk (extensions.conf)
[default]
exten => 100,1,Answer()
exten => 100,n,Dial(SIP/voicebot)

# Для FreePBX
- Создайте Extension: 100
- Route to: VoiceBot SIP account
```

---

## 🆘 Что делать, если не работает?

### ❌ SIP не подключается

- Проверьте доступность сервера: `ping 192.168.1.100`
- Проверьте порт: `telnet 192.168.1.100 5060`
- Проверьте firewall: `sudo ufw allow 5060`

### ❌ Голос не работает

- Установите модели: `python3 -c "import vosk; print('OK')"`
- Проверьте пути: `ls -la /models/vosk/ru/`
- Установите зависимости: `pip install -r requirements.txt`

### ❌ 1С не отвечает

- Проверьте URL в браузере
- Проверьте права API ключа
- Убедитесь что OData включен в 1С

---

## 📚 Полные инструкции

- 📖 [Подробная установка](./INSTALLATION_GUIDE.md)
- ⚙️ [Примеры конфигураций](./CONFIG_EXAMPLES.md)
- �� [API документация](./API_DOCUMENTATION.md)
- ❓ [Помощь в интерфейсе](/help)

---

## 📞 Техподдержка

- **Email**: support@voicebot.ru
- **Telegram**: @voicebot_support
- **Форум**: https://forum.voicebot.ru
- **GitHub**: https://github.com/voicebot/issues

**Удачного использования! 🚀**

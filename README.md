🚀 Подробное руководство по установке VoiceBot
📋 Что вы получите

После установки у вас будет полноценная система голосового бота технической поддержки, которая:

    ✅ Принимает звонки через SIP протокол (Asterisk, FreePBX, 3CX)
    ✅ Распознает речь на русском языке с точностью 90%+
    ✅ Отвечает человеческим голосом используя нейросети
    ✅ Создает заявки автоматически в 1С:Итилиум
    ✅ Ведет статистику и логи всех обращений
    ✅ Работает 24/7 без участия человека

🖥️ Системные требования
Минимальные требования:

    ОС : Ubuntu 20.04+ / Debian 11+ / CentOS 8+
    RAM : 4GB (8GB рекомендуется)
    Диск : 10GB свободного места
    CPU : 2 ядра (4 ядра для высокой нагрузки)
    Сеть : Доступ к интернету для установки пакетов

Рекомендуемые требования:

    ОС : Ubuntu 22.04 LTS
    Оперативная память : 8 ГБ+
    Диск : 20GB+ SSD
    ЦП : 4+ ядра
    GPU : NVIDIA с CUDA (опционально, для ускорения)

🔧 Пошаговая установка
Шаг 1: Подготовка системы

# Обновляем систему
sudo apt update && sudo apt upgrade -y

# Устанавливаем необходимые пакеты
sudo apt install -y \
    git \
    curl \
    wget \
    unzip \
    python3 \
    python3-pip \
    python3-venv \
    nodejs \
    npm \
    sqlite3 \
    ffmpeg \
    portaudio19-dev \
    python3-dev \
    build-essential

# Проверяем версии
python3 --version  # Должно быть 3.8+
node --version     # Должно быть 16+
npm --version      # Должно быть 8+

Шаг 2: Скачивание и установка VoiceBot

# Клонируем репозиторий (или скачиваем архив)
git clone https://github.com/your-repo/voicebot.git
cd voicebot

# Устанавливаем зависимости Node.js
npm install

# Создаем виртуальное окружение Python
python3 -m venv venv
source venv/bin/activate

# Устанавливаем Python зависимости
pip install -r requirements.txt

Шаг 3: Установка голосовых движков

# TTS движки
pip install TTS
pip install silero
pip install pyttsx3

# STT движки
pip install vosk
pip install SpeechRecognition
pip install pyaudio

# Дополнительные пакеты для обработки аудио
pip install librosa
pip install soundfile
pip install webrtcvad

Шаг 4: Скачивание языковых моделей

# Создаем директорию для моделей
sudo mkdir -p /models/{vosk,tts,whisper}
sudo chown -R $USER:$USER /models

# Скачиваем русскую модель Vosk (350MB)
cd /models/vosk
wget https://alphacephei.com/vosk/models/vosk-model-ru-0.42.zip
unzip vosk-model-ru-0.42.zip
mv vosk-model-ru-0.42 ru

# Скачиваем модель TTS Coqui
cd /models/tts
# Модель скачается автоматически при первом запуске

# Опционально: Whisper модель (если используете)
cd /models/whisper
wget https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-base.bin

Шаг 5: Настройка базы данных

# Создаем директорию для данных
mkdir -p data

# База данных создастся автоматически при первом запуске
# Проверим что SQLite работает
sqlite3 --version

Шаг 6: Первый запуск

# Собираем проект
npm run build

# Запускаем сервер
npm start

# Или в режиме разработки
npm run dev

Откройте браузер и перейдите на http://localhost:8080
🔌 Настройка интеграций
SIP сервер (Asterisk/FreePBX)
Если у вас уже есть SIP сервер:

    Получите у администратора:
        IP адрес сервера (например: 192.168.1.100)
        Порт (обычно 5060)
        Логин и пароль для бота

Если нужно установить Asterisk:

# Ubuntu/Debian
sudo apt install asterisk

# После установки
sudo systemctl start asterisk
sudo systemctl enable asterisk

# Базовая настройка (файл /etc/asterisk/sip.conf)
[voicebot]
type=friend
host=dynamic
secret=password123
context=default
canreinvite=no

Если используете облачную телефонию:

    Zadarma : используйте их SIP данные
    Mango Office : настройте SIP транк
    Ростелеком : подключите SIP аккаунт

1С:Итилиум
Получение доступа к API:

    Войдите в 1С:Итилиум как администратор
    Перейдите: Администрирование→ Интеграция→ Внешние системы
    Создайте новое приложение:
        Название : VoiceBot
        Тип : REST API
        Права : Создание заявок, Чтение справочников
    Скопируйте сгенерированный API ключ

Пример URL для подключения:

# Облачная версия
https://your-company.1c-cloud.ru/ws/hs/itilium/

# Локальная установка
http://192.168.1.50:8080/your_base/hs/itilium/

# С базовой аутентификацией
http://admin:password@192.168.1.50/your_base/odata/standard.odata/

🎯 Тестирование установки
Проверка компонентов:

# Проверка TTS
python3 -c "
import TTS
print('✅ TTS установлен')
"

# Проверка STT
python3 -c "
import vosk
print('✅ Vosk установлен')
"

# Проверка моделей
ls -la /models/vosk/ru/
ls -la /models/tts/

Тест голосового движка:

# test_voice.py
from TTS.api import TTS

# Инициализация TTS
tts = TTS(model_name="tts_models/ru/ruslan/tacotron2-DDC")

# Синтез тестовой фразы
tts.tts_to_file(
    text="Тестирование голосового движка VoiceBot",
    file_path="test_output.wav"
)

print("✅ Аудиофайл создан: test_output.wav")

# Запуск теста
python3 test_voice.py

# Воспроизведение (если есть аудиосистема)
aplay test_output.wav

🚨 Решение проблем
Ошибка: «ModuleNotFoundError: Отсутствует модуль с именем 'TTS'»

# Убедитесь что виртуальное окружение активно
source venv/bin/activate

# Переустановите TTS
pip uninstall TTS
pip install TTS

# Проверьте версию Python
python3 --version  # Должно быть 3.8+

Ошибка: "Permission denied" при доступе к микрофону

# Добавьте пользователя в группу audio
sudo usermod -a -G audio $USER

# Перезайдите в систему или выполните
newgrp audio

Ошибка: "Connection refused" при подключении к SIP

# Проверьте доступность SIP сервера
ping your-sip-server-ip

# Проверьте порт
telnet your-sip-server-ip 5060

# Проверьте firewall
sudo ufw status
sudo ufw allow 5060

Ошибка: "CUDA out of memory"

# Если используете GPU, уменьшите размер батча
export CUDA_VISIBLE_DEVICES=""  # Отключить GPU

# Или используйте CPU версии моделей
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu

🔐 Безопасность
Рекомендации по безопасности:
Смените пароли по умолчанию
Используйте HTTPS для веб-интерфейса
Настройте firewall :

sudo ufw enable
sudo ufw allow 22     # SSH
sudo ufw allow 8080   # VoiceBot
sudo ufw allow 5060   # SIP

    Ограничьте доступ по IP адресам
    Регулярно обновляйте систему

Настройка SSL (опционально):

# Установка certbot
sudo apt install certbot

# Получение сертификата
sudo certbot certonly --standalone -d your-domain.com

# Настройка автообновления
sudo crontab -e
# Добавить: 0 12 * * * /usr/bin/certbot renew --quiet

📊 Мониторинг и логи
Просмотр логов:

# Логи системы
journalctl -u voicebot -f

# Логи приложения
tail -f logs/voicebot.log

# Логи звонков
sqlite3 data/voicebot.db "SELECT * FROM call_logs ORDER BY start_time DESC LIMIT 10;"

Настройка мониторинга:

# Установка htop для мониторинга ресурсов
sudo apt install htop

# Проверка использования ресурсов
htop

# Проверка дискового пространства
df -h

# Проверка памяти
free -h

🎓 Дополнительные ресурсы
Документация:

    API-документация
    Документация по Астериску
    Документация 1С:Итилиум

Сообщества:

    Asterisk сообщество
    форум VoIP
    1С форум

Модели и ресурсы:

    Vosk модели
    Coqui TTS модели
    Whisper модели

❓ Получение помощи

Если у вас возникли проблемы:

    Проверьте логи - часто там есть полезная информация
    Перечитайте инструкцию - возможно, пропустили шаг
    Поищите в интернете - многие проблемы уже решены
    Обратитесь к документации компонентов
    Создайте issue в репозитории проекта

Удачной установки! 🚀 

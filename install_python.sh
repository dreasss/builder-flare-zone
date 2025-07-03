#!/bin/bash

# VoiceBot Python Installation Script
# Проверка и установка правильной версии Python для VoiceBot

echo "🐍 Проверка версии Python для VoiceBot..."

# Проверяем текущую версию Python
CURRENT_PYTHON=$(python3 --version 2>/dev/null | grep -o '[0-9]\+\.[0-9]\+')
PYTHON311_AVAILABLE=$(python3.11 --version 2>/dev/null | grep -o '[0-9]\+\.[0-9]\+')

echo "Текущая версия Python: $CURRENT_PYTHON"

# Функция для проверки совместимости верс��и
check_python_compatibility() {
    local version=$1
    if [[ "$version" == "3.9" || "$version" == "3.10" || "$version" == "3.11" ]]; then
        return 0
    else
        return 1
    fi
}

# Проверяем совместимость
if check_python_compatibility "$CURRENT_PYTHON"; then
    echo "✅ Python $CURRENT_PYTHON совместим с VoiceBot"
    PYTHON_CMD="python3"
else
    echo "❌ Python $CURRENT_PYTHON НЕ совместим с VoiceBot (TTS не будет работать)"
    
    # Проверяем, есть ли Python 3.11
    if [[ "$PYTHON311_AVAILABLE" == "3.11" ]]; then
        echo "✅ Найден Python 3.11, используем его"
        PYTHON_CMD="python3.11"
    else
        echo "📥 Устанавливаем Python 3.11..."
        
        # Определяем ОС
        if command -v apt-get >/dev/null 2>&1; then
            # Ubuntu/Debian
            sudo apt update
            sudo apt install -y software-properties-common
            sudo add-apt-repository ppa:deadsnakes/ppa -y
            sudo apt update
            sudo apt install -y python3.11 python3.11-venv python3.11-dev python3.11-pip
            PYTHON_CMD="python3.11"
        elif command -v yum >/dev/null 2>&1; then
            # CentOS/RHEL
            sudo yum install -y python311 python311-pip python311-devel
            PYTHON_CMD="python3.11"
        else
            echo "❌ Неподдерживаемая ОС. Установите Python 3.11 вручную"
            exit 1
        fi
    fi
fi

# Проверяем окончательную версию
FINAL_VERSION=$($PYTHON_CMD --version | grep -o '[0-9]\+\.[0-9]\+')
echo "🎯 Используем Python $FINAL_VERSION"

# Создаем виртуальное окружение
echo "📦 Создаём виртуальное окружение..."
$PYTHON_CMD -m venv venv

# Активируем виртуальное окружение
source venv/bin/activate

# Обновляем pip
echo "⬆️  Обновляем pip..."
pip install --upgrade pip setuptools wheel

# Устанавливаем системные зависимости для TTS
echo "🔧 Устанавливаем системные зависимости..."
if command -v apt-get >/dev/null 2>&1; then
    sudo apt install -y espeak espeak-data libespeak1 libespeak-dev ffmpeg portaudio19-dev python3-dev build-essential
elif command -v yum >/dev/null 2>&1; then
    sudo yum install -y espeak espeak-devel ffmpeg portaudio-devel python3-devel gcc-c++
fi

# Устанавливаем Python пакеты
echo "📚 Устанавливаем Python пакеты..."
pip install -r requirements.txt

# Проверяем установку TTS
echo "🧪 Проверяем установку TTS..."
if python -c "import TTS; print('✅ TTS успешно установлен')" 2>/dev/null; then
    echo "🎉 Все голосовые движки установлены успешно!"
else
    echo "⚠️  TTS не установился, пробуем альтернативный способ..."
    pip install --no-cache-dir TTS==0.22.0
    
    if python -c "import TTS; print('✅ TTS установлен альтернативным способом')" 2>/dev/null; then
        echo "🎉 TTS установлен!"
    else
        echo "❌ TTS не устанавливается. Используем альтернативы..."
        pip install edge-tts pyttsx3 gtts
        echo "✅ Установлены альтернативные TTS движки"
    fi
fi

# Проверяем другие компоненты
echo "🔍 Проверяем остальные компоненты..."
python -c "import vosk; print('✅ Vosk установлен')" 2>/dev/null || echo "❌ Vosk не установлен"
python -c "import silero; print('✅ Silero установлен')" 2>/dev/null || echo "❌ Silero не установлен"

echo ""
echo "🚀 Установка завершена!"
echo "Теперь можете запустить VoiceBot командой: npm start"
echo ""
echo "Для активации виртуального окружения используйте:"
echo "source venv/bin/activate"

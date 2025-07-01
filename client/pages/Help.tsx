import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Phone,
  Database,
  Mic,
  Download,
  Settings,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Copy,
  Play,
  Server,
  Headphones,
  FileText,
  Lightbulb,
  Rocket,
} from "lucide-react";

export default function Help() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            📚 Руководство по VoiceBot
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Пошаговая инструкция для настройки и использования системы
            голосового бота технической поддержки. Подходит для новичков - все
            объяснено простым языком.
          </p>
        </div>

        {/* Quick Start */}
        <Card className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <div className="flex items-start gap-4">
            <Rocket className="w-8 h-8 text-primary mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                🚀 Быстрый старт
              </h2>
              <p className="text-muted-foreground mb-4">
                Следуйте этим шагам для базовой настройки системы:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>1. Настройте SIP сервер</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>2. Подключите 1С:Итилиум</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>3. Установите голосовые модели</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Accordion type="multiple" className="space-y-4">
          {/* System Installation */}
          <AccordionItem value="installation" className="border-none">
            <Card className="overflow-hidden">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <Download className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold">
                      0. Установка системы VoiceBot
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Пошаговая установка на Linux и Windows серверах
                    </p>
                  </div>
                  <Badge variant="outline">Начать здесь</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-6">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Server className="w-4 h-4" />
                      Системные требования
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium mb-2">Минимальные:</h5>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• ОС: Ubuntu 20.04+ / Windows Server 2019+</li>
                          <li>• RAM: 4GB (8GB рекомендуется)</li>
                          <li>• CPU: 2 ядра (4 ядра для высокой нагрузки)</li>
                          <li>• Диск: 10GB свободного места</li>
                          <li>• Сеть: Доступ к интернету</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">Рекомендуемые:</h5>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• ОС: Ubuntu 22.04 LTS / Windows Server 2022</li>
                          <li>• RAM: 16GB+</li>
                          <li>• CPU: 8+ ядер</li>
                          <li>• Диск: 50GB+ SSD</li>
                          <li>• GPU: NVIDIA с CUDA (опционально)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Linux Installation */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Server className="w-4 h-4" />
                      Установка на Linux (Ubuntu/Debian)
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium mb-2">
                          1. Обновление системы
                        </h5>
                        <div className="bg-black p-4 rounded-lg">
                          <code className="text-green-400 text-sm block whitespace-pre-line">{`# Обновляем пакеты
sudo apt update && sudo apt upgrade -y

# Устанавливаем необходимые пакеты
sudo apt install -y curl wget git unzip python3 python3-pip nodejs npm sqlite3 ffmpeg build-essential`}</code>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2 text-green-400 hover:text-green-300"
                            onClick={() =>
                              copyToClipboard(
                                "sudo apt update && sudo apt upgrade -y\\nsudo apt install -y curl wget git unzip python3 python3-pip nodejs npm sqlite3 ffmpeg build-essential",
                              )
                            }
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Копировать команды
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2">
                          2. Установка Node.js (версия 18+)
                        </h5>
                        <div className="bg-black p-4 rounded-lg">
                          <code className="text-green-400 text-sm block whitespace-pre-line">{`# Добавляем NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Устанавливаем Node.js
sudo apt install -y nodejs

# Проверяем версию
node --version  # Должно быть v18.x.x или выше
npm --version   # Должно быть 9.x.x или выше`}</code>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2 text-green-400 hover:text-green-300"
                            onClick={() =>
                              copyToClipboard(
                                "curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -\\nsudo apt install -y nodejs",
                              )
                            }
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Копировать
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2">
                          3. Установка Python 3.8+
                        </h5>
                        <div className="bg-black p-4 rounded-lg">
                          <code className="text-green-400 text-sm block whitespace-pre-line">{`# Python уже должен быть установлен, проверяем версию
python3 --version  # Должно быть 3.8+

# Устанавливаем pip и venv
sudo apt install -y python3-pip python3-venv python3-dev

# Создаем виртуальное окружение
python3 -m venv /opt/voicebot/venv
source /opt/voicebot/venv/bin/activate`}</code>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2 text-green-400 hover:text-green-300"
                            onClick={() =>
                              copyToClipboard(
                                "sudo apt install -y python3-pip python3-venv python3-dev\\npython3 -m venv /opt/voicebot/venv",
                              )
                            }
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Копировать
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2">
                          4. Скачивание и установка VoiceBot
                        </h5>
                        <div className="bg-black p-4 rounded-lg">
                          <code className="text-green-400 text-sm block whitespace-pre-line">{`# Создаем директорию для VoiceBot
sudo mkdir -p /opt/voicebot
sudo chown -R $USER:$USER /opt/voicebot
cd /opt/voicebot

# Скачиваем VoiceBot (замените URL на актуальный)
git clone https://github.com/your-company/voicebot.git .

# Устанавливаем зависимости
npm install

# Активируем виртуальное окружение и устанавливаем Python пакеты
source venv/bin/activate
pip install -r requirements.txt`}</code>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2 text-green-400 hover:text-green-300"
                            onClick={() =>
                              copyToClipboard(
                                "sudo mkdir -p /opt/voicebot\\nsudo chown -R $USER:$USER /opt/voicebot\\ncd /opt/voicebot\\nnpm install",
                              )
                            }
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Копировать
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2">
                          5. Установка голосовых движков
                        </h5>
                        <div className="bg-black p-4 rounded-lg">
                          <code className="text-green-400 text-sm block whitespace-pre-line">{`# Создаем папку для моделей
sudo mkdir -p /models/{vosk,tts,whisper}
sudo chown -R $USER:$USER /models

# Скачиваем русскую модель Vosk (350MB)
cd /models/vosk
wget https://alphacephei.com/vosk/models/vosk-model-ru-0.42.zip
unzip vosk-model-ru-0.42.zip
mv vosk-model-ru-0.42 ru

# Устанавливаем TTS движки
source /opt/voicebot/venv/bin/activate
pip install TTS silero pyttsx3

# Проверяем установку
python3 -c "import TTS; print('✅ TTS установлен')"
python3 -c "import vosk; print('✅ Vosk установлен')"`}</code>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2 text-green-400 hover:text-green-300"
                            onClick={() =>
                              copyToClipboard(
                                "sudo mkdir -p /models/{vosk,tts,whisper}\\nsudo chown -R $USER:$USER /models",
                              )
                            }
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Копировать
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2">
                          6. Создание systemd сервиса
                        </h5>
                        <div className="bg-black p-4 rounded-lg">
                          <code className="text-green-400 text-sm block whitespace-pre-line">{`# Создаем файл сервиса
sudo tee /etc/systemd/system/voicebot.service > /dev/null <<EOF
[Unit]
Description=VoiceBot Technical Support System
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=/opt/voicebot
Environment=NODE_ENV=production
Environment=PATH=/opt/voicebot/venv/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# Запускаем сервис
sudo systemctl daemon-reload
sudo systemctl enable voicebot
sudo systemctl start voicebot

# Проверяем статус
sudo systemctl status voicebot`}</code>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2 text-green-400 hover:text-green-300"
                            onClick={() =>
                              copyToClipboard(
                                "sudo systemctl enable voicebot\\nsudo systemctl start voicebot",
                              )
                            }
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Копировать
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Windows Installation */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Server className="w-4 h-4" />
                      Установка на Windows Server
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium mb-2">
                          1. Установка Node.js
                        </h5>
                        <div className="bg-blue-900/20 p-4 rounded-lg">
                          <ol className="text-sm space-y-2">
                            <li>
                              1. Скачайте Node.js с официального сайта:{" "}
                              <strong>https://nodejs.org</strong>
                            </li>
                            <li>2. Выберите LTS версию (18.x или новее)</li>
                            <li>
                              3. Запустите установщик и следуйте инструкциям
                            </li>
                            <li>
                              4. Откройте PowerShell и проверьте:{" "}
                              <code>node --version</code>
                            </li>
                          </ol>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2">
                          2. Установка Python
                        </h5>
                        <div className="bg-blue-900/20 p-4 rounded-lg">
                          <ol className="text-sm space-y-2">
                            <li>
                              1. Скачайте Python 3.8+ с{" "}
                              <strong>https://python.org</strong>
                            </li>
                            <li>
                              2. При установке отметьте "Add Python to PATH"
                            </li>
                            <li>
                              3. Проверьте в PowerShell:{" "}
                              <code>python --version</code>
                            </li>
                            <li>
                              4. Установите виртуальное окружение:{" "}
                              <code>pip install virtualenv</code>
                            </li>
                          </ol>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2">
                          3. Установка VoiceBot
                        </h5>
                        <div className="bg-blue-900/20 p-4 rounded-lg">
                          <code className="text-blue-300 text-sm block whitespace-pre-line">{`# Откройте PowerShell как администратор
# Создайте папку для VoiceBot
mkdir C:\\VoiceBot
cd C:\\VoiceBot

# Скачайте архив VoiceBot и распакуйте его сюда
# Или используйте Git:
git clone https://github.com/your-company/voicebot.git .

# Установите зависимости
npm install

# Создайте виртуальное окружение Python
python -m venv venv
.\\venv\\Scripts\\Activate.ps1

# Установите Python зависимости
pip install -r requirements.txt`}</code>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2 text-blue-300 hover:text-blue-200"
                            onClick={() =>
                              copyToClipboard(
                                "mkdir C:\\\\VoiceBot\\ncd C:\\\\VoiceBot\\nnpm install",
                              )
                            }
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Копировать команды
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2">
                          4. Установка голосовых движков
                        </h5>
                        <div className="bg-blue-900/20 p-4 rounded-lg">
                          <code className="text-blue-300 text-sm block whitespace-pre-line">{`# Создайте папку для моделей
mkdir C:\\Models
mkdir C:\\Models\\vosk
mkdir C:\\Models\\tts

# Скачайте русскую модель Vosk
# Перейдите на https://alphacephei.com/vosk/models
# Скачайте vosk-model-ru-0.42.zip
# Распакуйте в C:\\Models\\vosk\\ru

# Активируйте виртуальное окружение
.\\venv\\Scripts\\Activate.ps1

# Установите движки
pip install TTS silero vosk SpeechRecognition

# Проверьте установку
python -c "import TTS; print('✅ TTS установлен')"
python -c "import vosk; print('✅ Vosk установлен')"`}</code>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2 text-blue-300 hover:text-blue-200"
                            onClick={() =>
                              copyToClipboard(
                                "mkdir C:\\\\Models\\npip install TTS silero vosk SpeechRecognition",
                              )
                            }
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Копировать
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2">
                          5. Создание Windows службы
                        </h5>
                        <div className="bg-blue-900/20 p-4 rounded-lg">
                          <ol className="text-sm space-y-2">
                            <li>
                              1. Установите <strong>NSSM</strong> (Non-Sucking
                              Service Manager)
                            </li>
                            <li>
                              2. Скачайте с{" "}
                              <strong>https://nssm.cc/download</strong>
                            </li>
                            <li>3. Распакуйте и добавьте в PATH</li>
                            <li>4. Создайте службу:</li>
                          </ol>
                          <code className="text-blue-300 text-sm block mt-2">{`nssm install VoiceBot "C:\\Program Files\\nodejs\\npm.cmd" "start"
nssm set VoiceBot AppDirectory "C:\\VoiceBot"
nssm set VoiceBot DisplayName "VoiceBot Technical Support"
nssm set VoiceBot Description "Система голосового бота технической поддержки"
nssm start VoiceBot`}</code>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h5 className="font-medium text-green-500 mb-1">
                          Система установлена!
                        </h5>
                        <p className="text-sm text-muted-foreground">
                          Откройте браузер и перейдите на{" "}
                          <strong>http://localhost:8080</strong> для настройки
                          VoiceBot. Если всё работает правильно, вы увидите
                          панель управления.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* SIP Configuration */}
          <AccordionItem value="sip" className="border-none">
            <Card className="overflow-hidden">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold">
                      1. Настройка SIP телефонии
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Подключение к Asterisk, FreePBX или другому SIP серверу
                    </p>
                  </div>
                  <Badge variant="outline">Обязательно</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-6">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Server className="w-4 h-4" />
                      Что такое SIP?
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      SIP (Session Initiation Protocol) - протокол для VoIP
                      телефонии. Он позволяет VoiceBot принимать и совершать
                      звонки через интернет.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">
                      📋 Необходимые данные для подключения:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-sm">
                            <strong>IP адрес сервера</strong> - например:
                            192.168.1.100
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-sm">
                            <strong>Порт</strong> - обычно 5060 (по умолчанию)
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-sm">
                            <strong>Логин пользователя</strong> - например:
                            voicebot
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-sm">
                            <strong>Пароль</strong> - для аутентификации
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">
                      🔧 Популярные SIP серверы:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="p-4">
                        <h5 className="font-medium mb-2">Asterisk</h5>
                        <p className="text-xs text-muted-foreground mb-2">
                          Бесплатная open-source PBX система
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Скачать
                        </Button>
                      </Card>
                      <Card className="p-4">
                        <h5 className="font-medium mb-2">FreePBX</h5>
                        <p className="text-xs text-muted-foreground mb-2">
                          Web-интерфейс для Asterisk
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Скачать
                        </Button>
                      </Card>
                      <Card className="p-4">
                        <h5 className="font-medium mb-2">3CX</h5>
                        <p className="text-xs text-muted-foreground mb-2">
                          Коммерческая PBX система
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Сайт
                        </Button>
                      </Card>
                    </div>
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                      <div>
                        <h5 className="font-medium text-yellow-500 mb-1">
                          Важно!
                        </h5>
                        <p className="text-sm text-muted-foreground">
                          Перед настройкой убедитесь, что SIP сервер доступен по
                          сети. Проверьте firewall и сетевые настройки.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">
                      ⚡ Быстрая настройка:
                    </h4>
                    <ol className="space-y-2 text-sm">
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                          1
                        </span>
                        <span>
                          Перейдите в раздел <strong>"Settings"</strong> →{" "}
                          <strong>"SIP Configuration"</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                          2
                        </span>
                        <span>Введите данные вашего SIP сервера</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                          3
                        </span>
                        <span>
                          Нажмите <strong>"Test & Register"</strong> для
                          проверки
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          ✓
                        </span>
                        <span>
                          При успешном подключении статус изменится на{" "}
                          <strong>"Online"</strong>
                        </span>
                      </li>
                    </ol>
                  </div>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* 1C Integration */}
          <AccordionItem value="1c" className="border-none">
            <Card className="overflow-hidden">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                    <Database className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold">
                      2. Интеграция с 1С:Итилиум
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Подключение к системе учета заявок 1С
                    </p>
                  </div>
                  <Badge variant="outline">Рекомендуется</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-6">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      Что такое 1С:Итилиум?
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      1С:Итилиум - система управления IT-услугами на базе 1С.
                      Интеграция позволяет автоматически создавать заявки из
                      звонков.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">
                      🔑 Получение API ключа:
                    </h4>
                    <ol className="space-y-2 text-sm">
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                          1
                        </span>
                        <span>
                          Войдите в административную панель 1С:Итилиум
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                          2
                        </span>
                        <span>
                          Перейдите в <strong>"Администрирование"</strong> →{" "}
                          <strong>"Внешние системы"</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                          3
                        </span>
                        <span>
                          Создайте новое приложение <strong>"VoiceBot"</strong>
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                          4
                        </span>
                        <span>Скопируйте сгенерированный API ключ</span>
                      </li>
                    </ol>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">
                      🌐 Примеры URL для подключения:
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-2 bg-muted/20 rounded">
                        <code className="text-xs flex-1">
                          https://your-company.1c-cloud.ru/api/odata
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            copyToClipboard(
                              "https://your-company.1c-cloud.ru/api/odata",
                            )
                          }
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-muted/20 rounded">
                        <code className="text-xs flex-1">
                          http://192.168.1.50/1c/odata/standard.odata
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            copyToClipboard(
                              "http://192.168.1.50/1c/odata/standard.odata",
                            )
                          }
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <h5 className="font-medium text-blue-500 mb-1">
                          Совет
                        </h5>
                        <p className="text-sm text-muted-foreground">
                          Если у вас нет 1С:Итилиум, вы можете использовать
                          другие системы учета заявок или настроить отправку в
                          email/Telegram.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* Voice Engines */}
          <AccordionItem value="voice" className="border-none">
            <Card className="overflow-hidden">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                    <Mic className="w-5 h-5 text-purple-500" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold">
                      3. Установка голосовых движков
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Синтез речи (TTS) и распознавание речи (STT)
                    </p>
                  </div>
                  <Badge variant="outline">Критично</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* TTS Engines */}
                    <Card className="p-4">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Headphones className="w-4 h-4" />
                        TTS (Text-to-Speech)
                      </h4>
                      <p className="text-xs text-muted-foreground mb-4">
                        Превращает текст в человеческую речь
                      </p>

                      <div className="space-y-3">
                        <div className="border rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">
                              Coqui.ai
                            </span>
                            <Badge variant="outline" className="text-xs">
                              Рекомендуется
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">
                            Лучшее качество русской речи
                          </p>
                          <div className="space-y-1 text-xs">
                            <code className="block p-1 bg-muted/30 rounded">
                              pip install TTS
                            </code>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full text-xs h-7"
                            >
                              <Download className="w-3 h-3 mr-1" />
                              Скачать модель ru_v3
                            </Button>
                          </div>
                        </div>

                        <div className="border rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">
                              Silero TTS
                            </span>
                            <Badge variant="outline" className="text-xs">
                              Быстрый
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">
                            Легкий и быстрый движок
                          </p>
                          <code className="block text-xs p-1 bg-muted/30 rounded">
                            pip install silero
                          </code>
                        </div>
                      </div>
                    </Card>

                    {/* STT Engines */}
                    <Card className="p-4">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Mic className="w-4 h-4" />
                        STT (Speech-to-Text)
                      </h4>
                      <p className="text-xs text-muted-foreground mb-4">
                        Распознает речь и превращает в текст
                      </p>

                      <div className="space-y-3">
                        <div className="border rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">Vosk</span>
                            <Badge variant="outline" className="text-xs">
                              Офлайн
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">
                            Работает без интернета
                          </p>
                          <div className="space-y-1 text-xs">
                            <code className="block p-1 bg-muted/30 rounded">
                              pip install vosk
                            </code>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full text-xs h-7"
                            >
                              <Download className="w-3 h-3 mr-1" />
                              Модель ru-0.42
                            </Button>
                          </div>
                        </div>

                        <div className="border rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">
                              Whisper.cpp
                            </span>
                            <Badge variant="outline" className="text-xs">
                              Точный
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">
                            Очень высокое качество распознавания
                          </p>
                          <code className="block text-xs p-1 bg-muted/30 rounded">
                            git clone whisper.cpp
                          </code>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">
                      📦 Быстрая установка (Ubuntu/Debian):
                    </h4>
                    <div className="bg-black p-4 rounded-lg">
                      <code className="text-green-400 text-sm block whitespace-pre-line">{`# Обновляем систему
sudo apt update && sudo apt upgrade -y

# Устанавливаем Python и зависимости
sudo apt install python3 python3-pip ffmpeg -y

# Устанавливаем TTS движки
pip3 install TTS silero

# Устанавливаем STT движки
pip3 install vosk

# Скачиваем русские модели
wget https://alphacephei.com/vosk/models/vosk-model-ru-0.42.zip
unzip vosk-model-ru-0.42.zip
mv vosk-model-ru-0.42 /models/vosk/ru

# Проверяем установку
python3 -c "import TTS; print('TTS OK')"
python3 -c "import vosk; print('Vosk OK')"`}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 text-green-400 hover:text-green-300"
                        onClick={() =>
                          copyToClipboard(`sudo apt update && sudo apt upgrade -y
sudo apt install python3 python3-pip ffmpeg -y
pip3 install TTS silero vosk`)
                        }
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Скопировать команды
                      </Button>
                    </div>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <h5 className="font-medium text-red-500 mb-1">
                          Системные требования
                        </h5>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Минимум 4GB RAM для голосовых моделей</li>
                          <li>• 2GB свободного места для моделей</li>
                          <li>• Python 3.8+ обязательно</li>
                          <li>• CUDA опционально (для ускорения)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* Usage Guide */}
          <AccordionItem value="usage" className="border-none">
            <Card className="overflow-hidden">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <Play className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold">
                      4. Использование системы
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Как работать с VoiceBot после настройки
                    </p>
                  </div>
                  <Badge variant="outline">Инструкция</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">🎯 Основные функции:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="p-4">
                        <h5 className="font-medium mb-2 flex items-center gap-2">
                          <Phone className="w-4 h-4 text-blue-500" />
                          Прием звонков
                        </h5>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Автоматический ответ на входящие</li>
                          <li>• Распознавание речи абонента</li>
                          <li>• Классификация типа обращения</li>
                          <li>• Создание заявки в 1С</li>
                        </ul>
                      </Card>
                      <Card className="p-4">
                        <h5 className="font-medium mb-2 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-orange-500" />
                          Обработка заявок
                        </h5>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Автоматическое заполнение полей</li>
                          <li>• Определение приоритета</li>
                          <li>• Назначение категории</li>
                          <li>• Отправка уведомлений</li>
                        </ul>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">
                      📊 Мониторинг и отчеты:
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <div>
                          <span className="font-medium">Dashboard</span>
                          <p className="text-xs text-muted-foreground">
                            Общая статистика и статус систем
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <div>
                          <span className="font-medium">Call Logs</span>
                          <p className="text-xs text-muted-foreground">
                            История всех звонков с расшифровками
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <div>
                          <span className="font-medium">Monitoring</span>
                          <p className="text-xs text-muted-foreground">
                            Real-time мониторинг производительности
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">🚨 Решение проблем:</h4>
                    <Accordion
                      type="single"
                      collapsible
                      className="border rounded-lg"
                    >
                      <AccordionItem value="sip-issues" className="border-none">
                        <AccordionTrigger className="px-4 py-3 text-sm">
                          SIP не подключается
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-3">
                          <ul className="text-sm space-y-1">
                            <li>• Проверьте IP адрес и порт сервера</li>
                            <li>
                              • Убедитесь что firewall не блокирует порт 5060
                            </li>
                            <li>• Проверьте логин и пароль</li>
                            <li>• Попробуйте ping до сервера</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem
                        value="voice-issues"
                        className="border-none"
                      >
                        <AccordionTrigger className="px-4 py-3 text-sm">
                          Голосовые движки не работают
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-3">
                          <ul className="text-sm space-y-1">
                            <li>• Проверьте установку Python пакетов</li>
                            <li>• Убедитесь что модели скачаны</li>
                            <li>• Проверьте права доступа к папке /models</li>
                            <li>• Посмотрите логи в консоли</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="1c-issues" className="border-none">
                        <AccordionTrigger className="px-4 py-3 text-sm">
                          1С API не отвечает
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-3">
                          <ul className="text-sm space-y-1">
                            <li>
                              • Проверьте URL API (должен заканчиваться на
                              /odata)
                            </li>
                            <li>• Убедитесь что API ключ действителен</li>
                            <li>• Проверьте доступность сервера 1С</li>
                            <li>• Посмотрите настройки CORS в 1С</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>
        </Accordion>

        {/* Quick Links */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">🔗 Полезные ссылки</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 flex-col gap-2"
              onClick={() => window.open("/API_DOCUMENTATION.md", "_blank")}
            >
              <FileText className="w-6 h-6" />
              <span className="text-sm">API Документация</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex-col gap-2"
              onClick={() =>
                window.open("https://alphacephei.com/vosk/models", "_blank")
              }
            >
              <Download className="w-6 h-6" />
              <span className="text-sm">Скачать модели</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex-col gap-2"
              onClick={() => (window.location.href = "/settings")}
            >
              <Settings className="w-6 h-6" />
              <span className="text-sm">Настройки</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex-col gap-2"
              onClick={() =>
                window.open(
                  "https://github.com/your-repo/voicebot/issues",
                  "_blank",
                )
              }
            >
              <ExternalLink className="w-6 h-6" />
              <span className="text-sm">Техподдержка</span>
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

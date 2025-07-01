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
                      1С:Итилиум - система управления IT-ус��угами на базе 1С.
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
                          Перейдите в <strong>"Администрировани��"</strong> →{" "}
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

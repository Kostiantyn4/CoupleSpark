# Decisions — CoupleSpark

## 10.08.2026 — Перенесено з Notion

**Назва й репозиторій:** CoupleSpark — github.com/Kostiantyn4/CoupleSpark

**Що це:** застосунок для пар — картки для розмов (на основі власної колекції фізичних карток із питаннями, вже оцифрованих) + ідеї для побачень, спільні цілі, механізм уникнення сварок, щоденник хороших подій.

**Відкрите питання — платформа:** у задачах є суперечливі сигнали. З одного боку — структура тек components, screens, services, utils і бібліотеки на кшталт react-native-spotify-remote натякають на React Native (мобільний). З іншого — задача "Вибір і інтеграція бібліотеки UI" згадує shadcn/ui, яка є веб-бібліотекою (React/Next.js), несумісною з React Native. Варто уточнити на старті розробки.

**Заплановані технічні деталі окремих фіч:**
- Спільні цілі та трекер досягнень: Firebase Firestore (спільні документи), Firebase Cloud Messaging (нагадування), Progress Bar (react-native-progress) або чек-лист, Zustand або Redux для стану
- Інтеграція зі Spotify: Spotify Web API (react-native-spotify-remote), OAuth2 через Spotify, збереження плейлиста — Firebase Firestore
- Запрошення партнера: прив'язка профілів через QR-код

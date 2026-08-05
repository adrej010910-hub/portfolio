import { services, siteConfig } from "@/config/site";
import {
  addOrder,
  clearDialog,
  getAdminIds,
  getDialog,
  getStats,
  isAdmin,
  registerAdmin,
  sendOrderNotification,
  setDialog,
  trackStartedOrder,
  trackUser,
} from "@/lib/db";
import { escapeHtml, sendMessage } from "@/lib/telegram";

// =====================================================
// Логика Telegram-бота — обработка команд и диалогов
// =====================================================

export type Update = {
  update_id?: number;
  message?: {
    chat?: { id?: number };
    from?: { id?: number; first_name?: string; username?: string };
    text?: string;
  };
};

const STEPS = {
  menu: "menu",
  orderName: "order_name",
  orderTelegram: "order_telegram",
  orderService: "order_service",
  orderBudget: "order_budget",
  orderMessage: "order_message",
} as const;

type StepValue = (typeof STEPS)[keyof typeof STEPS];

// -----------------------------------------------------
// Уведомление владельцу
// -----------------------------------------------------
async function notifyAdmins(data: {
  name: string;
  telegram: string;
  service: string;
  budget: string;
  message: string;
  source: string;
}): Promise<void> {
  const ids = await getAdminIds();
  const text =
    `🧾 <b>Новый заказ</b>\n` +
    `━━━━━━━━━━━━\n` +
    `👤 <b>Имя:</b> ${escapeHtml(data.name)}\n` +
    `📱 <b>Telegram:</b> ${escapeHtml(data.telegram)}\n` +
    `🛠 <b>Услуга:</b> ${escapeHtml(data.service)}\n` +
    `💰 <b>Бюджет:</b> ${escapeHtml(data.budget)}\n` +
    `📝 <b>Описание:</b> ${escapeHtml(data.message)}\n` +
    `🌐 <b>Источник:</b> ${data.source === "site" ? "Сайт" : "Telegram-бот"}\n` +
    `━━━━━━━━━━━━\n` +
    `⚡ Заявка с ${siteConfig.name}`;
  for (const id of ids) await sendMessage(id, text);
}

// -----------------------------------------------------
// Статистика
// -----------------------------------------------------
async function handleStats(chatId: number): Promise<void> {
  const stats = await getStats();

  const lines = [
    `📊 <b>Статистика</b> 📈`,
    `━━━━━━━━━━━━━━`,
    `👥 Пользователей бота: <b>${stats.users}</b>`,
    `🔢 Всего заявок: <b>${stats.total}</b>`,
    `📅 Сегодня: <b>${stats.today}</b>`,
    `🗓 За 7 дней: <b>${stats.week}</b>`,
    ``,
    `<b>Конверсия оформления:</b>`,
    `🚀 Начали заказ: <b>${stats.startedOrders}</b>`,
    `✅ Завершили заказ: <b>${stats.total}</b>`,
    `💯 Конверсия: <b>${stats.conversion}%</b>`,
    ``,
    `<b>По источникам:</b>`,
    `🌐 Сайт: <b>${stats.bySource.site}</b>`,
    `🤖 Telegram-бот: <b>${stats.bySource.bot}</b>`,
  ];

  if (Object.keys(stats.byService).length > 0) {
    lines.push(``, `<b>По услугам:</b>`);
    lines.push(
      ...Object.entries(stats.byService)
        .slice(0, 6)
        .map(([k, v]) => `▫️ ${escapeHtml(k)} — <b>${v}</b>`)
    );
  }

  if (stats.recent.length > 0) {
    lines.push(``, `<b>Последние заявки:</b>`);
    lines.push(
      ...stats.recent.slice(0, 5).map((o) => `• ${escapeHtml(o.name)} — ${escapeHtml(o.service)}`)
    );
  }

  await sendMessage(chatId, lines.join("\n"));
}

// -----------------------------------------------------
// Оформление заказа
// -----------------------------------------------------
async function startOrder(chatId: number): Promise<void> {
  await trackStartedOrder();
  await setDialog(chatId, { step: STEPS.orderName, data: {} });
  const text =
    `🚀 <b>Оформление заказа</b>\n\n` +
    `Отлично! Давайте соберём заявку. Шаг 1 из 5:\n\n` +
    `👤 <b>Как вас зовут?</b>\n\n` +
    `Для отмены нажмите /cancel`;
  await sendMessage(chatId, text);
}

async function handleOrderStep(chatId: number, text: string): Promise<void> {
  const dialog = await getDialog(chatId);
  if (!dialog) return;

  if (text.startsWith("/cancel")) {
    await clearDialog(chatId);
    await sendMessage(chatId, "❌ Оформление отменено. Для нового заказа нажмите /order");
    return;
  }

  if (text.startsWith("/")) {
    await sendMessage(chatId, "Оформление заказа прервано. Нажмите /order чтобы начать заново.");
    await clearDialog(chatId);
    return;
  }

  const data = { ...dialog.data };

  switch (dialog.step) {
    case STEPS.orderName:
      if (text.trim().length < 2) {
        await sendMessage(chatId, "❌ Введите имя (минимум 2 символа):");
        return;
      }
      data.name = text.trim();
      await setDialog(chatId, { step: STEPS.orderTelegram, data });
      await sendMessage(
        chatId,
        `👌 Спасибо, <b>${escapeHtml(data.name!)}</b>!\n\n` +
          `Шаг 2 из 5:\n📱 <b>Ваш Telegram-ник</b> (например @nickname):`
      );
      break;

    case STEPS.orderTelegram:
      if (!text.startsWith("@") && text.trim().length < 3) {
        await sendMessage(chatId, "❌ Укажите корректный ник (например @nickname):");
        return;
      }
      data.telegram = text.trim();
      await setDialog(chatId, { step: STEPS.orderService, data });
      const servicesText = services.map((s, i) => `${i + 1}. ${s.title}`).join("\n");
      await sendMessage(
        chatId,
        `Шаг 3 из 5:\n🛠 <b>Какая услуга вас интересует?</b>\n\n${servicesText}\n\n` +
          `Введите название или номер услуги:`
      );
      break;

    case STEPS.orderService: {
      const num = parseInt(text.trim(), 10);
      const chosen = !Number.isNaN(num) && num >= 1 && num <= services.length
        ? services[num - 1].title
        : services.find((s) => s.title.toLowerCase().includes(text.trim().toLowerCase()))?.title;
      if (!chosen) {
        await sendMessage(chatId, "❌ Не удалось распознать услугу. Попробуйте ещё раз:");
        return;
      }
      data.service = chosen;
      await setDialog(chatId, { step: STEPS.orderBudget, data });
      await sendMessage(
        chatId,
        `Отлично, <b>${escapeHtml(chosen)}</b>!\n\n` +
          `Шаг 4 из 5:\n💰 <b>Укажите примерный бюджет</b> (в рублях):`
      );
      break;
    }

    case STEPS.orderBudget:
      data.budget = text.trim();
      await setDialog(chatId, { step: STEPS.orderMessage, data });
      await sendMessage(
        chatId,
        `Шаг 5 из 5:\n📝 <b>Опишите ваш проект</b> — что нужно сделать, сроки, пожелания:`
      );
      break;

    case STEPS.orderMessage:
      if (text.trim().length < 10) {
        await sendMessage(chatId, "❌ Опишите чуть подробнее (минимум 10 символов):");
        return;
      }
      data.message = text.trim();
      data.source = "bot";
      const finalData = data as {
        name: string;
        telegram: string;
        service: string;
        budget: string;
        message: string;
        source: "bot";
      };
      await addOrder(finalData);
      await clearDialog(chatId);
      await sendMessage(
        chatId,
        `✅ <b>Заявка принята!</b>\n\nСпасибо, <b>${escapeHtml(data.name!)}</b>! Я свяжусь с вами в ближайшее время.\n\n` +
          `ℹ️ Вы можете посмотреть мои работы на сайте или написать ещё раз /order`
      );
      await notifyAdmins(finalData);
      break;
  }
}

// -----------------------------------------------------
// Главный обработчик
// -----------------------------------------------------
export async function handleUpdate(update: Update): Promise<void> {
  const msg = update.message;
  if (!msg?.chat?.id) return;
  const chatId = msg.chat.id;
  const text = (msg.text ?? "").trim();
  const firstName = msg.from?.first_name ?? "гость";

  // Первый контакт — регистрируем владельца (первого, кто написал боту)
  await registerAdmin(chatId);
  // Учитываем уникального пользователя в статистике
  await trackUser(chatId);
  const isOwner = await isAdmin(chatId);
  const dialog = await getDialog(chatId);

  // Если идёт диалог оформления — обрабатываем шаги
  if (dialog && text !== "/order") {
    await handleOrderStep(chatId, text);
    return;
  }

  if (text === "/start" || text === "start") {
    const welcome =
      `👋 Привет, <b>${escapeHtml(firstName)}</b>! Я бот портфолио <b>${escapeHtml(siteConfig.name)}</b>.\n\n` +
      `Помогаю оформить заявку на разработку сайта или дизайн карточек для маркетплейсов.\n\n` +
      `Доступные команды:\n` +
      `🛠 /order — оформить заказ\n` +
      `❓ /help — помощь\n` +
      (isOwner ? `📊 /stats — статистика заказов\n` : ``) +
      `\nНажмите /order, чтобы начать!`;
    await sendMessage(chatId, welcome);
    return;
  }

  if (text === "/stats") {
    if (isOwner) {
      await handleStats(chatId);
    } else {
      await sendMessage(chatId, "⛔ Команда доступна только владельцу.");
    }
    return;
  }

  if (text === "/order") {
    await startOrder(chatId);
    return;
  }

  if (text === "/help") {
    await sendMessage(
      chatId,
      `🤖 <b>Помощь</b>\n\n` +
        `🛠 <b>/order</b> — оформить заказ\n` +
        `📊 <b>/stats</b> — статистика (для владельца)\n` +
        `🌐 Сайт: https://portfolio.ru\n` +
        `📧 Email: ${siteConfig.email}\n` +
        `✈️ Telegram: ${siteConfig.telegram}`
    );
    return;
  }

  await sendMessage(
    chatId,
    `🤔 Я не понял команду.\n\n` +
      `Используйте:\n` +
      `🛠 /order — оформить заказ\n` +
      `❓ /help — помощь\n\n` +
      `Или перейдите на сайт: https://portfolio.ru/#contact`
  );
}

export { STEPS };

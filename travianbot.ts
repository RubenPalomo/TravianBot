import TelegramBot from "node-telegram-bot-api";
import TravianManager from "./TravianFuncionalities/TravianManager/TravianManager";
import {
  TELEGRAM_CHAT_ID,
  TELEGRAM_TOKEN,
  USER,
  PASSWORD,
  URL,
} from "./utils/consts/const";
import { parseResourcesMovementData } from "./utils/parse/parseResourcesMovementData/parseResourcesMovementData";
import { parseTroopsMovementData } from "./utils/parse/parseTroopsMovementData/parseTroopsMovementData";
import { parseTroopsRecruitmentData } from "./utils/parse/parseTroopsRecruitment/parseTroopsRecruitment";
import { parseUpgradeData } from "./utils/parse/parseUpgradeData/parseUpgradeData";

const bot = new TelegramBot(TELEGRAM_TOKEN, {
  polling: true,
});

const credentials = {
  mail: USER,
  password: PASSWORD,
  url: URL,
};

const sendFormatError = (msgChatId: number): void => {
  bot.sendMessage(msgChatId, "*Error:* Fallo en el formato.", {
    parse_mode: "Markdown",
  });
};

bot.onText(/^\/start/, async (msg) => {
  if (TELEGRAM_CHAT_ID !== msg.chat.id.toString()) {
    bot.sendMessage(
      msg.chat.id,
      `Lo siento, ${msg.chat.first_name}. No tienes permiso para usar este bot. Puedes hacer el tuyo propio en GitHub: https://github.com/RubenPalomo/TravianBot`,
    );
    return;
  } else {
    bot.sendMessage(
      msg.chat.id,
      `Bienvenido ${msg.chat.first_name}. Usa el comando /help para ver los comandos disponibles.`,
    );
  }
});

bot.onText(/^\/movetroops(x3)?(.+)/, async (msg, match) => {
  if (TELEGRAM_CHAT_ID !== msg.chat.id.toString()) {
    bot.sendMessage(
      msg.chat.id,
      `Lo siento, ${msg.chat.first_name}. No tienes permiso para usar este bot. Puedes hacer el tuyo propio en GitHub: https://github.com/RubenPalomo/TravianBot`,
    );
    return;
  }

  const wrongFormat = (): void => {
    sendFormatError(msg.chat.id);
    bot.sendMessage(
      msg.chat.id,
      "Formato:\n/movetroops coordinates:(XX,YY) troopType:tX troopAmount:XXXX troopDispatchType:X.\n\nPuedes añadir también from:XXXX con el ID de la aldea emisora." +
      "\n\nNota: troopDispatchType es el tipo de movimiento de tropas. 2 = Refuerzo; 3 = Ataque; 4 = Atraco.",
    );
    bot.sendMessage(
      msg.chat.id,
      "Puedes cambiar el orden, pero es importante respetar los espacios y los dos puntos.",
    );
  };

  if (match === null) {
    wrongFormat();
    return;
  }

  const data: any = match[0].split(" ");
  if (data.length < 5) {
    wrongFormat();
    return;
  }

  const parsedData = parseTroopsMovementData(data.slice(1));
  if (parsedData === null) {
    wrongFormat();
    return;
  } else {
    bot.sendMessage(msg.chat.id, "Moviendo tropas...");

    const response = await TravianManager({
      url: credentials.url,
      username: credentials.mail,
      password: credentials.password,
      request: data[0],
      data: parsedData,
    });

    if (response) bot.sendMessage(msg.chat.id, "Tropas movidas correctamente.");
    else bot.sendMessage(msg.chat.id, "Error al mover las tropas.");
  }
});

bot.onText(/^\/sendresources(.+)/, async (msg, match) => {
  if (TELEGRAM_CHAT_ID !== msg.chat.id.toString()) {
    bot.sendMessage(
      msg.chat.id,
      `Lo siento, ${msg.chat.first_name}. No tienes permiso para usar este bot. Puedes hacer el tuyo propio en GitHub: https://github.com/RubenPalomo/TravianBot`,
    );
    return;
  }

  const wrongFormat = (): void => {
    sendFormatError(msg.chat.id);
    bot.sendMessage(
      msg.chat.id,
      "Formato:\n/sendresources coordinates:(XX,YY) lumber:XXXX clay:XXXX iron:XXXX crop:XXXX.\n\nPuedes añadir también from:XXXX con el ID de la aldea emisora.",
    );
    bot.sendMessage(
      msg.chat.id,
      "Puedes cambiar el orden, pero es importante respetar los espacios y los dos puntos. También puedes obviar los recursos que no te interesen enviar.",
    );
  };

  if (match === null) {
    wrongFormat();
    return;
  }

  const data: any = match[0].split(" ");
  if (data.length < 3) {
    wrongFormat();
    return;
  }

  const parsedData = parseResourcesMovementData(data.slice(1));
  if (parsedData === null) {
    wrongFormat();
    return;
  } else {
    bot.sendMessage(msg.chat.id, "Enviando recursos...");

    const response = await TravianManager({
      url: credentials.url,
      username: credentials.mail,
      password: credentials.password,
      request: data[0],
      data: parsedData,
    });

    if (response)
      bot.sendMessage(msg.chat.id, "Recursos enviados correctamente.");
    else bot.sendMessage(msg.chat.id, "Error al enviar recursos.");
  }
});

bot.onText(/^\/upgrade(.+)/, async (msg, match) => {
  if (TELEGRAM_CHAT_ID !== msg.chat.id.toString()) {
    bot.sendMessage(
      msg.chat.id,
      `Lo siento, ${msg.chat.first_name}. No tienes permiso para usar este bot. Puedes hacer el tuyo propio en GitHub: https://github.com/RubenPalomo/TravianBot`,
    );
    return;
  }

  const wrongFormat = (): void => {
    sendFormatError(msg.chat.id);
    bot.sendMessage(
      msg.chat.id,
      "Formato:\n/upgrade buildId:XX.\n\nPuedes añadir también villageId:XXXX con el ID de la aldea emisora y locationId:XXXX con el ID de la localización del edificio." +
      "\Añadir el ID de la localización es especialmente útil en casos con múltiples edificios con el mismo nombre (recursos, escondites, etc)." +
      "\n\nTodo esto lo puedes encontrar en el link de la página de Travian. id=XXXXX es la localización del edificio, gid=XXXX es su ID y newdid=XXXX es el ID de la aldea.",
    );
    bot.sendMessage(
      msg.chat.id,
      "Puedes cambiar el orden en el comando, pero es importante respetar los espacios y los dos puntos.",
    );
  };

  if (match === null) {
    wrongFormat();
    return;
  }

  const data: any = match[0].split(" ");
  const parsedData = parseUpgradeData(data.slice(1));

  if (parsedData === null) {
    wrongFormat();
    return;
  } else {
    bot.sendMessage(msg.chat.id, "Mejorando edificio...");

    const response = await TravianManager({
      url: credentials.url,
      username: credentials.mail,
      password: credentials.password,
      request: data[0],
      data: parsedData,
    });

    if (response)
      bot.sendMessage(msg.chat.id, "Edificio mejorado correctamente.");
    else bot.sendMessage(msg.chat.id, "Error al mejorar edificio.");
  }
});

bot.onText(/^\/recruit(.+)/, async (msg, match) => {
  if (TELEGRAM_CHAT_ID !== msg.chat.id.toString()) {
    bot.sendMessage(
      msg.chat.id,
      `Lo siento, ${msg.chat.first_name}. No tienes permiso para usar este bot. Puedes hacer el tuyo propio en GitHub: https://github.com/RubenPalomo/TravianBot`,
    );
    return;
  }

  const wrongFormat = (): void => {
    sendFormatError(msg.chat.id);
    bot.sendMessage(
      msg.chat.id,
      "Formato:\n/recruit buildId:XX troopType:tX troopAmount:XXXX.\n\nPuedes añadir también villageId:XXXX con el ID de la aldea." +
      "\n\nNota: El ID del cuartel es 19 y el del establo 20.",
    );
    bot.sendMessage(
      msg.chat.id,
      "Puedes cambiar el orden en el comando, pero es importante respetar los espacios y los dos puntos.",
    );
  };

  if (match === null) {
    wrongFormat();
    return;
  }

  const data: any = match[0].split(" ");
  if (data.length < 4) {
    wrongFormat();
    return;
  }

  const parsedData = parseTroopsRecruitmentData(data.slice(1));
  if (parsedData === null) {
    wrongFormat();
    return;
  } else {
    bot.sendMessage(msg.chat.id, "Reclutando tropas...");

    const response = await TravianManager({
      url: credentials.url,
      username: credentials.mail,
      password: credentials.password,
      request: data[0],
      data: parsedData,
    });

    if (response)
      bot.sendMessage(msg.chat.id, "Tropas reclutadas correctamente.");
    else bot.sendMessage(msg.chat.id, "Error al reclutar tropas.");
  }
});

bot.onText(/^\/help(?:\s(.*))?$/, async (msg, match) => {
  if (TELEGRAM_CHAT_ID !== msg.chat.id.toString()) {
    bot.sendMessage(
      msg.chat.id,
      `Lo siento, ${msg.chat.first_name}. No tienes permiso para usar este bot. Puedes hacer el tuyo propio en GitHub: https://github.com/RubenPalomo/TravianBot`,
    );
    return;
  }

  const extraText = match?.[1]?.trim();

  if (!extraText) {
    await bot.sendMessage(
      msg.chat.id,
      "*Asistente del Asistente*\n\n" +
      "Lo primero que debes hacer es facilitarme tu servidor. Para ello escribe */setServer* (url completa)." +
      "\nRecuerda evitar poner dorf1 o dorf2 al final de la url." +
      "\n\nLo siguiente es facilitarme tus credenciales de acceso al juego." +
      "\nPara ello escribe */setMail (tu mail)* y */setPassword (tu contraseña)* con tus credenciales." +
      "\n\nUna vez hecho esto, puedes usar los siguientes comandos:\n" +
      "*/movetroops*: Mueve tropas de una aldea a otra.\n" +
      "*/sendresources*: Envía recursos de una aldea a otra.\n" +
      "*/upgrade*: Mejora un edificio de una aldea.\n" +
      "*/recruit*: Recluta tropas en una aldea.",
      {
        parse_mode: "Markdown",
      },
    );
    bot.sendMessage(
      msg.chat.id,
      'Además, también puedes escribir *"/help COMANDO"* (sin la /) para recibir más información al respecto.',
      {
        parse_mode: "Markdown",
      },
    );
  } else {
    switch (extraText) {
      case "movetroops":
        bot.sendMessage(
          msg.chat.id,
          "El comando */movetroops* permite mover tropas de una aldea a otra." +
          "\n\nFormato:\n/movetroops coordinates:(XX,YY) troopType:tX troopAmount:XXXX troopDispatchType:X." +
          "\n\nPuedes añadir también from:XXXX con el ID de la aldea emisora." +
          "\n\n*Nota:* troopDispatchType es el tipo de movimiento de tropas. 2 = Refuerzo; 3 = Ataque; 4 = Atraco.",
          {
            parse_mode: "Markdown",
          },
        );
        break;

      case "sendresources":
        bot.sendMessage(
          msg.chat.id,
          "El comando */sendresources* permite enviar recursos de una aldea a otra." +
          "\n\nFormato:\n/sendresources coordinates:(XX,YY) lumber:XXXX clay:XXXX iron:XXXX crop:XXXX." +
          "\n\nPuedes añadir también from:XXXX con el ID de la aldea emisora." +
          "\n\nPuedes cambiar el orden, pero es importante respetar los espacios y los dos puntos.\nTambién puedes obviar los recursos que no te interesen enviar.",
          {
            parse_mode: "Markdown",
          },
        );
        break;

      case "upgrade":
        bot.sendMessage(
          msg.chat.id,
          "El comando */upgrade* permite mejorar un edificio de una aldea." +
          "\n\nFormato:\n/upgrade buildId:XX." +
          "\n\nPuedes añadir también villageId:XXXX con el ID de la aldea emisora y locationId:XXXX con el ID de la localización del edificio." +
          "\n\nLa localización del edificio es especialmente útil en casos con múltiples edificios con el mismo nombre (recursos, escondites, etc)." +
          "\n\nTodo esto lo puedes encontrar en el link de la página de Travian. id=XXXXX es la localización del edificio, gid=XXXX es su ID y newdid=XXXX es el ID de la aldea.",
          {
            parse_mode: "Markdown",
          },
        );
        break;

      case "recruit":
        bot.sendMessage(
          msg.chat.id,
          "El comando */recruit* permite reclutar tropas en una aldea." +
          "\n\nFormato:\n/recruit buildId:XX troopType:tX troopAmount:XXXX." +
          "\n\nPuedes añadir también villageId:XXXX con el ID de la aldea." +
          "\n\n*Nota:* El ID del cuartel es 19 y el del establo 20.",
          {
            parse_mode: "Markdown",
          },
        );
        break;

      default:
        bot.sendMessage(
          msg.chat.id,
          "Comando no encontrado. Usa */help* para ver los comandos disponibles.",
          {
            parse_mode: "Markdown",
          },
        );
        break;
    }
  }
});

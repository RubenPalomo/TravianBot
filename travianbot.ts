import TelegramBot from "node-telegram-bot-api";
import { telegramToken } from "./utils/consts/telegramConstants";
import { username, password } from "./utils/consts/travianConstants";
import { parseResourcesMovementData } from "./utils/parse/parseResourcesMovementData/parseResourcesMovementData";
import { parseTroopsMovementData } from "./utils/parse/parseTroopsMovementData/parseTroopsMovementData";
import { parseTroopsRecruitmentData } from "./utils/parse/parseTroopsRecruitment/parseTroopsRecruitment";
import { parseUpgradeData } from "./utils/parse/parseUpgradeData/parseUpgradeData";
import TravianManager from "./TravianFuncionalities/TravianManager/TravianManager";

const bot = new TelegramBot(telegramToken, {
  polling: true,
});

const sendFormatError = (msgChatId: number): void => {
  bot.sendMessage(msgChatId, "*Error:* Fallo en el formato.", {
    parse_mode: "Markdown",
  });
};

bot.onText(/^\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, `Hola ${msg.chat.first_name}.`, {
    parse_mode: "Markdown",
  });
});

bot.onText(/^\/moveTroops(x3)?(.+)/, async (msg, match) => {
  const wrongFormat = (): void => {
    sendFormatError(msg.chat.id);
    bot.sendMessage(
      msg.chat.id,
      "Formato:\n/moveTroops coordinates:(XX,YY) troopType:tX troopAmount:XXXX troopDispatchType:X.\n\nPuedes añadir también from:XXXX con el ID de la aldea emisora." +
        "\n\nNota: troopDispatchType es el tipo de movimiento de tropas. 2 = Refuerzo; 3 = Ataque; 4 = Atraco."
    );
    bot.sendMessage(
      msg.chat.id,
      "Puedes cambiar el orden, pero es importante respetar los espacios y los dos puntos."
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
  } else {
    bot.sendMessage(msg.chat.id, "Moviendo tropas...");
    const response = await TravianManager({
      username: username,
      password: password,
      request: data[0],
      data: parsedData,
    });

    response
      ? bot.sendMessage(msg.chat.id, "Tropas movidas correctamente.")
      : bot.sendMessage(msg.chat.id, "Error al mover las tropas.");
  }
});

bot.onText(/^\/sendResources(.+)/, async (msg, match) => {
  const wrongFormat = (): void => {
    sendFormatError(msg.chat.id);
    bot.sendMessage(
      msg.chat.id,
      "Formato:\n/sendResources coordinates:(XX,YY) lumber:XXXX clay:XXXX iron:XXXX crop:XXXX.\n\nPuedes añadir también from:XXXX con el ID de la aldea emisora."
    );
    bot.sendMessage(
      msg.chat.id,
      "Puedes cambiar el orden, pero es importante respetar los espacios y los dos puntos. También puedes obviar los recursos que no te interesen enviar."
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
  } else {
    bot.sendMessage(msg.chat.id, "Enviando recursos...");
    const response = await TravianManager({
      username: username,
      password: password,
      request: data[0],
      data: parsedData,
    });

    response
      ? bot.sendMessage(msg.chat.id, "Recursos enviados correctamente.")
      : bot.sendMessage(msg.chat.id, "Error al enviar recursos.");
  }
});

bot.onText(/^\/upgrade(.+)/, async (msg, match) => {
  const wrongFormat = (): void => {
    sendFormatError(msg.chat.id);
    bot.sendMessage(
      msg.chat.id,
      "Formato:\n/upgrade buildId:(XX,YY).\n\nPuedes añadir también villageId:XXXX con el ID de la aldea emisora y locationId:XXXX con el ID de la localización del edificio." +
        "\Añadir el ID de la localización es especialmente útil en casos con múltiples edificios con el mismo nombre (recursos, escondites, etc)." +
        "\n\nTodo esto lo puedes encontrar en el link de la página de Travian. id=XXXXX es la localización del edificio, gid=XXXX es su ID y newId=XXXX es el ID de la aldea."
    );
    bot.sendMessage(
      msg.chat.id,
      "Puedes cambiar el orden en el comando, pero es importante respetar los espacios y los dos puntos."
    );
  };

  if (match === null) {
    wrongFormat();
    return;
  }

  const data: any = match[0].split(" ");
  if (data.length < 2) {
    wrongFormat();
    return;
  }

  const parsedData = parseUpgradeData(data.slice(1));
  if (parsedData === null) {
    wrongFormat();
  } else {
    bot.sendMessage(msg.chat.id, "Mejorando edificio...");
    const response = await TravianManager({
      username: username,
      password: password,
      request: data[0],
      data: parsedData,
    });

    response
      ? bot.sendMessage(msg.chat.id, "Edificio mejorado correctamente.")
      : bot.sendMessage(msg.chat.id, "Error al mejorar edificio.");
  }
});

bot.onText(/^\/recruit(.+)/, async (msg, match) => {
  const wrongFormat = (): void => {
    sendFormatError(msg.chat.id);
    bot.sendMessage(
      msg.chat.id,
      "Formato:\n/recruit buildId:XX troopType:tX troopAmount:XXXX.\n\nPuedes añadir también villageId:XXXX con el ID de la aldea." +
        "\n\nNota: El ID del cuartel es 19 y el del establo 20."
    );
    bot.sendMessage(
      msg.chat.id,
      "Puedes cambiar el orden en el comando, pero es importante respetar los espacios y los dos puntos."
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
  } else {
    bot.sendMessage(msg.chat.id, "Reclutando tropas...");
    const response = await TravianManager({
      username: username,
      password: password,
      request: data[0],
      data: parsedData,
    });

    response
      ? bot.sendMessage(msg.chat.id, "Tropas reclutadas correctamente.")
      : bot.sendMessage(msg.chat.id, "Error al reclutar tropas.");
  }
});

bot.onText(/^\/help/, (msg) => {});

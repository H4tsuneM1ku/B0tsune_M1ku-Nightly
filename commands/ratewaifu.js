exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  if (args.join(" ").toLowerCase().includes("monika")) {
    return message.channel.send("Non. Juste non.");
  }
  const encodedwaifu = Buffer.from(args.join(" "))
    .toString("base64")
    .split("");
  encodedwaifu.forEach((item, index, array) => {
    array[index] = item.charCodeAt(0);
  });
  const finalscore = encodedwaifu.reduce((a, b) => a + b, 0) % 11;
  var suggestion = "";
  if (finalscore <= 3) {
    suggestion = "Votre waifu est nulle; trouvez en une nouvelle.";
  } else if (finalscore <= 6) {
    suggestion = "Votre waifu est OK.";
  } else if (finalscore <= 9) {
    suggestion = "Votre waifu est bien.";
  } else {
    suggestion = "Votre waifu est géniale.";
  }
  message.channel.send(`Je donne un ${finalscore}/10 à ${args.join(" ")}. ${suggestion}`);
};

exports.aliases = ["gf", "waifu"];

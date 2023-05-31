const Discord = require("discord.js");
const bot = new Discord.Client();
const https = require("https");
const xml2js = require('xml2js')

exports.run = async (client, message, args) => {
        try {
           
            if(!message.channel.nsfw) return message.channel.send(":underage: Vous avez besoin d'être dans un channel NSFW pour utiliser cette commande.");
                if(args[0] === undefined){
                    var argR = "";
                } else {
                    var argR = args;
                }
 
                var url = 'https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=' + argR;
 
                https.get(url, function(res){
                    var body = '';
           
                    res.on('data', function(chunk){
                        body += chunk;
                    });
           
                    res.on('end', function(){
                        var parser = new xml2js.Parser();
                        parser.parseString(body, function (err, result) {
                            var postCount = result.posts.$.count - 1;
                            if(postCount > 100) {
                                postCount = 100;
                            }
                            if(postCount > 0) {
                                var picNum = Math.floor(Math.random() * postCount) + 0;
                                var r34Pic = result.posts.post[picNum].$.file_url;
                                        const embed = new Discord.RichEmbed()
                                        .setAuthor(`${argR}`)
                                        .setImage(r34Pic)
                                        .setColor(0x7700cf)
                                        .setFooter('Rule#34 : If it exists there is porn of it')
                                        message.channel.send(embed);
                            } else {
                                console.log("Aucun résultat:", argR);
                                message.channel.send(`Aucun résultat pour ${argR}`);
                            }
 
                            });
                        });
                    }).on('error', function(e){
                        console.log("Got an error: ", e);
                });
            } catch(e) {
            console.log(e);
        }
};
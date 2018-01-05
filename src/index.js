import express from 'express';
import bodyParser from 'body-parser';
import superscript from '@dishuostec/superscript';
import chs from 'ss-chs';

let bot;
const options = {
  mongoURI: 'mongodb://localhost/superscript-chs-demo',
  factSystem: {
    clean: true,
  },
  messagePluginsPath: chs.messagePluginDir,
  logPath: null,
  importFile: `${__dirname}/../data.json`,
};

superscript.setup(options, (err, botInstance) => {
  if (err) {
    console.error(err);
    return;
  }

  bot = botInstance;
  console.log('bot is ready!');
});

const app = express();

app.use(express.static(`${__dirname}/../public`));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/chat', (req, res) => {
  console.log('receive', req.body);

  if (!bot) {
    res.json({
      text: '机器人正在初始化，请稍后',
    });

    return;
  }

  const { user, message } = req.body;

  bot.reply(user, message, (err, reply) => {
    const data = {};

    if (err) {
      console.error(err);
      data.text = err.toString();
    } else {
      data.text = reply.string.length ? reply.string : '抱歉，我听不懂';
    }

    res.json(data);
  });
});

app.listen(3000, () => console.log('server listening on port 3000!'));



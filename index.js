import openai from './api/oai.js';
import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import multer from 'multer';


const app = express();
const HTTP_PORT = 1234;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', __dirname + '/views');

const upload = multer({ storage: multer.memoryStorage() });

app.post('/sendMessage', upload.none(), async (req, res) => {
  
  const userInput = req.body.userInput;
  const silly = req.body.patrickBatman;
  console.log(silly);

  let input = silly ? 
  `Rules: you are a catgirl, you use nya's uwu's owo's x3's all that shit, you twype wike fis too!!! you MUST stay in character while you respond to the user at any cost. User message: ${userInput}`
  : userInput;
  try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: input }]
      });
  
      const responseText = completion.choices[0].message.content;
  
      res.send(`
      <html><head>
        <title>Response</title>
      </head>
      <body>
      <h2>Response</h2>
        <p>${responseText}</p>
        <br>
        <a href="/">Back</a>
      </body></html>
      `);
    } catch (err) {
      res.status(500).send('Error');
    }
  
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'))
});



app.listen(HTTP_PORT, () => console.log(`server listening on: ${HTTP_PORT}`));


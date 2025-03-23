import openai from './oai.js';
import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';

const app = express();
const HTTP_PORT = 1234;

app.use(express.urlencoded({ extended: true }));

  app.post('/sendMessage', async (req, res) => {
    const userInput = req.body.userInput;

    try {
        const completion = await openai.chat.completions.create({
          model: 'gpt-4o',
          messages: [{ role: 'user', content: userInput }]
        });
    
        const responseText = completion.choices[0].message.content;
    
        res.send(`
        <html><head>
          <title>Response</title>
        </head>
        <body>
        <h2>AI Response</h2>
          <p>${responseText}</p>
          <br>

          <a href="/">Back</a>
          
        </body></html>
        `);
      } catch (err) {
        res.status(500).send('Error');
      }
    
  });


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'))
});



app.listen(HTTP_PORT, () => console.log(`server listening on: ${HTTP_PORT}`));


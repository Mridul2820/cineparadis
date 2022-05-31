import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import DocumentMeta from 'react-document-meta';

import App from '../App';

const PORT = process.env.PORT || 3006;
const app = express();

app.get('/*', (req, res) => {
  const appString = ReactDOMServer.renderToString(<App />);
  const meta = DocumentMeta.renderAsHTML();

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        ${meta}
      </head>
      <body>
      <div id='root'>
        ${appString}
      </div>
      </body>
    </html>
  `;

  res.send(html);
});

app.listen(PORT);

import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import DocumentMeta from './lib/server';
import Root from '../App';
import * as ROUTES from '../constants/routes';

// Pages
import TrendingPage from '../pages/topic/Trending';

const server = express();

function ssr(res, content) {
  const meta = DocumentMeta.renderAsHTML();

  res.send(`<html>
    <head>
      ${meta}
    </head>
    <body>
      <div id='root'>${content}</div>
    </body>
    <script src="/bundle.js"></script>
  </html>`);
}

server.get('/', (req, res) => {
  ssr(res, ReactDOMServer.renderToString(<Root />));
});

server.get(ROUTES.Trending, (req, res) => {
  ssr(
    res,
    ReactDOMServer.renderToString(
      <Root>
        <TrendingPage />
      </Root>
    )
  );
});

server.listen(9001);

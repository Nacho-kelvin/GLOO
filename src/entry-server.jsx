// Server-side entry used only at build time by scripts/prerender.mjs: renders a route to an HTML string.
import { Writable } from 'node:stream'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App.jsx'

export function render(url) {
  return new Promise((resolve, reject) => {
    let html = ''
    const sink = new Writable({ write(chunk, _enc, done) { html += chunk.toString(); done() } })
    sink.on('finish', () => resolve(html))
    const { pipe } = renderToPipeableStream(<StaticRouter location={url}><App /></StaticRouter>, {
      onAllReady() { pipe(sink) }, // wait for lazy pages so the real content, not the loading fallback, is written
      onShellError: reject,
      onError: reject,
    })
  })
}

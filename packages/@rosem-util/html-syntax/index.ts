export const doctypeDeclaration = /^\s*<!DOCTYPE ([^>]+)>/i

// <textarea>, <title>
export const escapableRawTextElement = /^t(?:extarea|itle)$/i

// <math>, <svg>
export const foreignElement = /^math|svg$/i

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content
// https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
// <address>, <article>, <aside>, <base>, <blockquote>, <body>, <caption>,
// <col>, <colgroup>, <dd>, <details>, <dialog>, <div>, <dl>, <dt>,
// <fieldset>, <figcaption>, <figure>, <footer>, <form>, <h1>, <h2>, <h3>,
// <h4>, <h5>, <h6>, <head>, <header>, <hgroup>, <hr>, <html>, <legend>,
// <li>, <menuitem>, <meta>, <optgroup>, <option>, <param>, <rp>, <rt>,
// <source>, <style>, <summary>, <tbody>, <td>, <tfoot>, <th>, <thead>,
// <title>, <tr>, <track>
export const nonPhrasingElement = /^(a(?:ddress|rticle|side)|b(?:ase|lockquote)|col|(?:col|h|opt)group|d[dlt]|d(?:etails|ialog|iv)|f(?:ieldset|igure|o(?:oter|rm))|(?:fig)?caption|h(?:[1-6r]|ead(?:er)?|tml)|l(?:egend|i)|me(?:nuitem|ta)|option|param|r[pt]|s(?:ource|tyle|ummary)|t(?:[dhr]|head|foot|rack|itle)|t?body)$/i

// Elements that you can, intentionally, leave open
// (and which close themselves)
// <colgroup>, <dd>, <dt>, <li>, <options>, <p>, <td>, <th>, <thead>, <tfoot>,
// <tr>, <source>
export const optionalClosingElement = /^(colgroup|d[dt]|li|options|p|t(?:[dhr]|head|foot)|source)$/i

// <script>, <style>
export const rawTextElement = /^s(?:cript|tyle)$/i

export function isAnyRawTextElement(tagName: string): boolean {
  return rawTextElement.test(tagName) || escapableRawTextElement.test(tagName)
}

// https://www.w3.org/TR/html5/syntax.html#restrictions-on-content-models
export function shouldIgnoreFirstNewline(tag: string, html: string) {
  return '\n' === html[0] && /^pre|textarea$/i.test(tag)
}

// Elements that cannot have children
// <area>, <base>, <br>, <col>, <embed>, <frame>, <hr>, <img>, <input>,
// <isindex>, <keygen>, <link>, <meta>, <param>, <source>, <track>, <wbr>
export const voidElement = /^(area|b(?:ase|r)|col|embed|frame|hr|i(?:mg|nput|sindex)|keygen|link|meta|param|source|track|wbr)$/i
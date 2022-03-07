import {marked} from 'marked';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import css from 'highlight.js/lib/languages/css';
import scss from 'highlight.js/lib/languages/scss';
import 'highlight.js';
import "highlight.js/styles/atom-one-dark.css";

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('scss', scss);

export default function markdown(rawContent: string) {
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    langPrefix: 'hljs language-',
    highlight(code) {
      return hljs.highlightAuto(code).value;
    }
  });

  return marked.parse(rawContent);
}

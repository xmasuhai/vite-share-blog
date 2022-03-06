import {marked} from 'marked';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github.css';

hljs.registerLanguage('javascript', javascript);

export default function markdown(rawContent: string) {
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight(code) {
      return hljs.highlightAuto(code).value;
    }
  });

  return marked.parse(rawContent);
}

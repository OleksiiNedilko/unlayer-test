'use client'

import styles from './page.module.css'
import EmailEditor, { EditorRef, EmailEditorProps } from 'react-email-editor';
import {useRef} from 'react'

export default function Home() {
  const emailEditorRef = useRef<EditorRef>(null);

  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { design, html } = data;
      console.log(html);
      console.log('--------------------')
      console.log(design)
    });
  };

  const onReady: EmailEditorProps['onReady'] = (unlayer) => {
    // editor is ready
    // you can load your template here;
    // the design json can be obtained by calling
    // unlayer.loadDesign(callback) or unlayer.exportHtml(callback)

    // const templateJson = { DESIGN JSON GOES HERE };
    // unlayer.loadDesign(templateJson);
  };

  return (
    <main >
      <button title="see result in console" onClick={exportHtml}>Export</button>
      <EmailEditor ref={emailEditorRef} onReady={onReady} options={{displayMode:"web"}} minHeight={700}  />
    </main>
  )
}

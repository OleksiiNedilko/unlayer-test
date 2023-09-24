'use client'

import {FC, useEffect, useRef, useState} from 'react'
import EmailEditor, {EditorRef, EmailEditorProps} from 'react-email-editor'

const Editor: FC<{ type: 'web' | 'email' }> = ({type}) => {
  const emailEditorRef = useRef<EditorRef>(null)

  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor

    unlayer?.exportHtml((data) => {
      const {design, html} = data
      console.log(html)
      console.log('--------------------')
      console.log(design)
    })
  }

  const onReady: EmailEditorProps['onReady'] = (unlayer) => {

    // editor is ready
    // you can load your template here;
    // the design json can be obtained by calling
    // unlayer.loadDesign(callback) or unlayer.exportHtml(callback)

    // const templateJson = { DESIGN JSON GOES HERE };
    // unlayer.loadDesign(templateJson);
  }

  return (<>
    <button title="see result in console" onClick={exportHtml}>Export</button>
    <EmailEditor ref={emailEditorRef} onReady={onReady} options={{
      displayMode: type, projectId: 184069, customJS: [
        'http://localhost:3000/custom.js'
        // 'https://localhost:4174/testTool.js'
    //     `
    //     const React = window.unlayer.React;
    //
    //     const Pokemons = () => {
    //       return <div>hello</div>
    //     }
    //
    //     unlayer.registerTool({
    //       name: 'my_tool',
    //       label: 'My custom js',
    //       icon: 'fa-smile',
    //       supportedDisplayModes: ['web', 'email'],
    //       options: {},
    //       values: {},
    //       renderer: {
    //         Viewer: Pokemons, // our React Viewer
    //         exporters: {
    //           web: function (values) {
    //             console.log(values)
    //             return '<div>I am a custom tool.</div>'
    //           },
    //           email: function (values) {
    //             return '<div>I am a custom tool.</div>'
    //           },
    //         },
    //         head: {
    //           css: function (values) {
    //           },
    //           js: function (values) {
    //           },
    //         },
    //       },
    //     })
    //
    // `
      ]
    }} minHeight={700}/></>)
}

export default Editor

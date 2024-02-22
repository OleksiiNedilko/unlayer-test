'use client'

import {FC, useRef} from 'react'
import EmailEditor, {EditorRef, EmailEditorProps} from 'react-email-editor'
import Mustache from 'mustache'

const Editor: FC<{ type: 'web' | 'email' }> = ({type}) => {
  const emailEditorRef = useRef<EditorRef>(null)

  // const [admins, setAdmins] = useState<any[]>([])
  //
  // useEffect(() => {
  // if(emailEditorRef.current){
  //   fetch(`https://staging-api.sswmeetings.com/graphql`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'access-token': 'xNblAo4JLzGyFGv9swNNdg',
  //         'client': 'dJBSTS8ureFmmqOUfBK58Q',
  //         'uid': 'olek@gojilabs.com'
  //       },
  //       body: JSON.stringify({
  //         query: `query adminsSearch($q: String!) {
  //               searchAdmins(q: $q) {
  //                 firstName
  //                 lastName
  //                 email
  //                 id
  //               }
  //             }`,
  //         variables: {q: ''}
  //       })
  //     }
  //   ).then(res => res.json()).then(res => {setAdmins(res?.data?.searchAdmins)})
  // }
  // }, [])


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
    // @ts-ignore
    unlayer.registerCallback('previewHtml',function (params, done) {
      fetch(`https://staging-api.sswmeetings.com/graphql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'access-token': 'auEQs67tA7IYf9pUKgYxiA',
            'client': 'GwZrdixrik_oxkQUYefctw',
            'uid': 'olek@gojilabs.com'
          },
          body: JSON.stringify({
            query: `query adminsSearch($q: String!) {
                searchAdmins(q: $q) {
                  firstName
                  lastName
                  email
                  id
                }
              }`,
            variables: {q: ''}
          })
        }
      ).then(res => res.json()).then(res => {
        if(res.errors){
          console.warn(res.errors)
        }
        let result = Mustache.render(params.html, {admins: res?.data?.searchAdmins||[]});
        debugger
        console.log(result)
        done({
          html: result, // you can pass your custom html here
        });
      })

    });
    // editor is ready
    // you can load your template here;
    // the design json can be obtained by calling
    // unlayer.loadDesign(callback) or unlayer.exportHtml(callback)

    // const templateJson = { DESIGN JSON GOES HERE };
    // unlayer.loadDesign(templateJson);
  }

  return (<>
    <button title="see result in console" onClick={exportHtml}>Export</button>
    <EmailEditor
      ref={emailEditorRef}
      onReady={onReady}
      options={{
        displayMode: type, projectId: 184069, customJS: [
          // 'http://localhost:3000/custom.js',
          // 'https://unlayer-test.vercel.app/custom.js'
        ],
        mergeTags:{
          firstName: {
            name: 'First name',
            value: '{{firstName}}',
          },
          lastName: {
            name: 'Last name',
            value: '{{lastName}}',
          },
          id: {
            name: 'Id',
            value: '{{id}}',
          },
          admins: {
            name: 'Admins',
            rules: {
              repeat: {
                name: 'Repeat for Each Admin',
                before: '{{#admins}}',
                after: '{{/admins}}',
              },
            },
          },
        },
        user: {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@acme.com'
        }
      }}
      minHeight={700}
    /></>)
}

export default Editor

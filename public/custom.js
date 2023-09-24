const React = window.unlayer.React

const Pokemons = ({values}) => {
  console.log(values.admins)
  return `<div>
    ${values.admins.map((admin) => {
      return `<p>${admin.firstName}</p>`
    })}
  </div>`
}

const getData = async () => {
  const res = await fetch(`https://staging-api.sswmeetings.com/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access-token': 'xNblAo4JLzGyFGv9swNNdg',
        'client': 'dJBSTS8ureFmmqOUfBK58Q',
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
  )

  const data = await res.json()


  if (data?.data?.searchAdmins) {
    unlayer.registerTool({
      name: 'my_tool',
      label: 'My custom js',
      icon: 'fa-smile',
      supportedDisplayModes: ['web', 'email'],
      options: {},
      values: {
        admins: data.data.searchAdmins
      },
      renderer: {
        Viewer: Pokemons, // our React Viewer
        exporters: {
          web: function (values) {
            // console.log(values)
            return Pokemons({values})
          },
          email: function (values) {
            return '<div>I am a custom tool.</div>'
          },
        },
        head: {
          css: function (values) {
          },
          js: function (values) {
          },
        },
      },
    })

  }
}

getData()

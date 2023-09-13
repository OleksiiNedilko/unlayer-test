import Editor from '@/components/editor'
import Dynamic from '@/components/dynamic'

export default function Email() {
  return (
    <main >
      <Dynamic>
        <Editor type="email"/>
      </Dynamic>
    </main>
  )
}

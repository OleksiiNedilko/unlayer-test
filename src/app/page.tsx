import Editor from '@/components/editor'
import Dynamic from '@/components/dynamic'

export default function Home() {
  return (
    <main >
      <Dynamic>
        <Editor type="web"/>
      </Dynamic>
    </main>
  )
}

import { ComponentsContent } from './components/Content/ContentComponents'
import { NavigationContent } from './components/Content/NavComponents'
import { Content, RootLayout, Sidebar } from './components/Root/AppLayout'

function App(): JSX.Element {
  return (
    <RootLayout>
      <Sidebar />
      <Content>
        <NavigationContent />
        <ComponentsContent />
      </Content>
    </RootLayout>
  )
}

export default App

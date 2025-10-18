
import { useSelector } from 'react-redux'
import './App.css'
import { LogForm } from './app/components/logForm'
import { Navbar } from './app/components/navbar'
import { LogTable } from './app/components/logTable';
import "@radix-ui/themes/styles.css";
import { DraftsTable } from './app/components/draftsTable';
function App() {
  const route = useSelector((state: any) => state.route.currentRoute);
  return (
    <main className='flex flex-col h-screen items-center justify-center'>
      <Navbar />
      <h1 className='mt-5 text-[40px]'>Hello There!</h1>
      {route === '/' && <LogForm />}
      {route === 'log-table' && <LogTable />}
      {route === 'drafts' && <DraftsTable />}
    </main>
  )
}

export default App

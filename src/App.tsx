import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage } from '@/pages/LandingPage'
import { CreatorProfile } from '@/pages/CreatorProfile'
import { ToastProvider } from '@/components/ui'
import { LangProvider } from '@/lib/i18n'
function App() {
  return (
    <LangProvider>
    <ToastProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/creator/:slug" element={<CreatorProfile />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
    </LangProvider>
  )
}

export default App

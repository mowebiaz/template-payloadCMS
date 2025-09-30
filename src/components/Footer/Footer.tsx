import { ThemeSelector } from "@/providers/Theme/ThemeSelector"
import './Footer.scss'

export const Footer = () => {
  return (
    <footer>
      <ThemeSelector />
      <p>© 2024 My Company</p>
    </footer>
  )
}
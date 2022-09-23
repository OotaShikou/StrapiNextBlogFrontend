import { ReactElement } from 'react'
import { Header } from './Header/Header'
import { Footer } from './Footer/Footer'
import { Container } from '@mui/system'

type LayoutProps = Required<{
  readonly children: ReactElement
}>

export const Layout = ({ children }: LayoutProps) => (
  <Container>
    <Header />
    {children}
    <Footer />
  </Container>
)
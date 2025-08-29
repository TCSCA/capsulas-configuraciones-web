import Header from '@/components/global/headerComponent'
import Footer from '@/components/ui/footer'

export default function Layout({ children }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
        <Header />
        <main>{children}</main>
        <Footer />
      </>
    )
}
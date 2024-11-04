import HeaderHome from "@/components/HeaderHome";

export default function HomeLayout({
    children,
  }: { children: React.ReactNode }) {
    return (
      <main className='flex flex-col h-screen'>
        <HeaderHome />
        {children}
      </main>
    )
  }
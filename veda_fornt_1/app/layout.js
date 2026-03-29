import "@/node_modules/react-modal-video/css/modal-video.css"
import "@/public/assets/css/bootstrap.css"
import "@/public/assets/css/color.css"
import "@/public/assets/css/style.css"
import "@/public/assets/css/vida-responsive.css"
import 'swiper/css'
// import "swiper/css/navigation"
import "swiper/css/pagination"
import 'swiper/css/free-mode';
import { inter, jost } from '@/lib/font'
export const metadata = {
    title: 'Vida - Disalibity Support Service',
    description: 'Disalibity Support Service',
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${inter.variable} ${jost.variable}`}>
            <body>{children}</body>
        </html>
    )
}

import "../globals.css";
import {Inter} from "next/font/google";

const inter = Inter({subsets: ["latin"]});

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({children}: RootLayoutProps) {
    return <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
            {children}
        </div>
    </div>;
}

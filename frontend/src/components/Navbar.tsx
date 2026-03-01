import { ShoppingCartIcon,User  } from "lucide-react"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="bg-base-100/80 backdrop-blur-lg border-8 border-black 
    sticky top-0 z-50">
        <div className="max-w-7xl mx-auto">
            <div className="navbar px-4 min-h-16 justify-between">

            <div className="flex-1 lg-flex-none">
                 <Link to="/"
                 onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                 className="hover:opacity-80 transition-opacity"
                 >
                    <div className="flex items-center gap-2">
                        <ShoppingCartIcon className="size-9 text-primary"/>
                        <span
                        className="font-semibold font-mono tracking-widest text-2xl
                        bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary"
                        >
                        StoreBoard
                        </span>
                    </div>
                 </Link>
                 
            </div>
           
                <User className="size-9 text-primary hover:opacity-80 transition-opacity cursor-pointer"/>
           


            </div>
        </div>

    </div>
  )
}

export default Navbar
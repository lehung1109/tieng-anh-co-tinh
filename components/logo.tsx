import Link from "next/link"
import Image from 'next/image';

const Logo = () => {
  return (
    <Link href="/">
          <Image className="hidden" src="/logo.png" alt="logo" width={223} height={69} />
          Logo
        </Link>
  )
}

export default Logo;
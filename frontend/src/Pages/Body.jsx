import { Outlet } from 'react-router'
import { Footer, Header } from '../components'

const Body = () => {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />

        </div>
    )
}

export default Body

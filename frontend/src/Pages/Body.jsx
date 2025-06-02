import { Outlet } from 'react-router'
import { Footer, Header } from '../Components'

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

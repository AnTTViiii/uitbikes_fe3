import { AccountCircle, ExitToApp, Info, Login, NotificationsActive, ShoppingCart } from "@mui/icons-material"

const NavItem = [
    {
        link: '/about',
        section: 'about',
        icon: <Info />,
        text: 'Về chúng tôi'
    },
    // {
    //     link: '/register',
    //     section: 'register',
    //     icon: <ExitToApp />,
    //     text: 'Đăng ký'
    // },
    {
        link: '/signin',
        section: 'signin',
        icon: <Login />,
        text: 'Đăng nhập'
    },
    {
        link: '/cart',
        section: 'cart',
        icon: <ShoppingCart />,
        text: 'Giỏ hàng'
    },
    {
        link: '/notify',
        section: 'notify',
        icon: <NotificationsActive />,
        text: 'Thông báo'
    },
    {
        link: '/user',
        section: 'user',
        icon: <AccountCircle />,
        text: 'username'
    }
]

export default NavItem
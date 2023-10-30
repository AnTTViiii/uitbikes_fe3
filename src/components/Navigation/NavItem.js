import { AccountCircle, Info, Login, NotificationsActive, ShoppingCart } from "@mui/icons-material"

const user = JSON.parse(localStorage.getItem("user"));
console.log(user)

const NavItem = [
    {
        link: '/about',
        section: 'about',
        icon: <Info />,
        text: 'Về chúng tôi'
    },
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
        icon: user !== null ? (user.avatar !== null ? <img src={user.avatar} alt="" /> : <AccountCircle />) : <AccountCircle />,
        text: user !== null ? user.username : ''
    }
]

export default NavItem
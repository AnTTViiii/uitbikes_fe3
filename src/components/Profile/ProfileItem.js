import EditProfile from '../EditProfile/EditProfile'
import ChangePassword from '../ChangePassword/ChangePassword'
import Transaction from '../TransactionHistory/TransactionHistory'
import ChargeRequest from '../ChargeRequest/ChargeRequest'
import PurchaseOrder from '../PurchaseOrder/PurchaseOrder'
import UserProfile from '../UserProfile/UserProfile'
import { AccountBalanceWalletRounded, ManageAccountsRounded, PasswordRounded, PaymentRounded, PersonRounded, RateReviewRounded, ReceiptLongRounded } from '@mui/icons-material'
import ReviewTabs from '../Review/ReviewTabs'

export const ProfileItem = [
    {
      name: 'Hồ sơ',
      icon: <PersonRounded />,
      url: '/user',
      section: '',
      page: UserProfile
    },
    {
      name: 'Chỉnh sửa hồ sơ',
      icon: <ManageAccountsRounded />,
      url: '/user/edit',
      section: 'edit',
      page: EditProfile
    },
    {
      name: 'Đổi mật khẩu',
      icon: <PasswordRounded />,
      url: '/user/password',
      section: 'password',
      page: ChangePassword
    },
    {
      name: 'Nạp tiền',
      icon: <PaymentRounded />,
      url: '/user/charge',
      section: 'charge',
      page: ChargeRequest
    },
    {
      name: 'Quản lý tài chính',
      icon: <AccountBalanceWalletRounded />,
      url: '/user/transaction',
      section: 'transaction',
      page: Transaction
    },
    {
      name: 'Đơn mua',
      icon: <ReceiptLongRounded />,
      url: '/user/purchase',
      section: 'purchase',
      page: PurchaseOrder
    },
    {
      name: 'Đánh giá',
      icon: <RateReviewRounded />,
      url: '/user/review',
      section: 'review',
      page: ReviewTabs
    }
];
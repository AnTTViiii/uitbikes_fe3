import React from 'react'
import Customer, { ChargeRequest, Invoice } from '../Data/Customer'
import './transaction-history.css'

const TransactionHistory = () => {
  return (
    <div className='transaction'>
      <h3>Quản lý tài chính</h3>
      <div>
        <p>Số dư tài khoản: {Customer.balance}</p>
        <div className="purchase-history">
          <p>Lịch sử thanh toán</p>
          <table>
            <tr>
              <th>Thời gian</th>
              <th>Hóa đơn</th>
              <th>Số tiền</th>
            </tr>
            {
              Invoice.map((item) => (
                <tr>
                  <td>{item.date}</td>
                  <td>{item.invoice_id}</td>
                  <td>{item.total}</td>
                </tr>
              ))
            }
          </table>
        </div>
        <div className="charge-history">
          <p>Lịch sử nạp tiền</p>
          <table>
            <tr>
              <th>Mã nạp tiền</th>
              <th>Thời gian</th>
              <th>Số tài khoản</th>
              <th>Số tiền</th>
              <th>Trạng thái</th>
            </tr>
            {
              ChargeRequest.map((item) => (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.date}</td>
                  <td>{item.account_number}</td>
                  <td>{item.money}</td>
                  <td>{item.status}</td>
                </tr>
              ))
            }
          </table>
        </div>
      </div>
    </div>
  )
}

export default TransactionHistory

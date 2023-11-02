import React, { useEffect, useState } from 'react'
import './transaction-history.css'
import { dot3digits, getChargeRequestStatusName } from '../functions/functions'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'

const TransactionHistory = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [invoices, setInvoices] = useState([])
  const [chargeList, setChargeList] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:9090/api/invoices/customer/${user.customer.id}/status/-1`)
      .then((res) => { setInvoices(res.data) })
      .catch((err) => console.log(err))

    axios.get(`http://localhost:9090/api/requests/customer/${user.customer.id}`)
      .then((res) => { setChargeList(res.data) })
      .catch((err) => console.log(err))
  }, [])

  const invoiceColumns = [
    {
      field: "date",
      headerName: "Thời gian",
      flex: 1,
      align:'center',
      headerClassName: 'header',
      renderCell: (params) => {
        return new Date(params.row.date).toLocaleString()
      }
    },
    {
      field: "id",
      headerName: "Hóa đơn",
      flex: 1,
      align:'center',
      headerClassName: 'header',
    },
    {
      field: "total",
      headerName: "Số tiền",
      flex: 1,
      align:'center',
      headerClassName: 'header',
      renderCell: (params) => {
        return(
          <>{(params.status === 3 ? '+ ' : '- ') + dot3digits(params.row.total)} đ</>
        )
      }
    }
  ]

  const requestColumns = [
    {
      field: "date",
      headerName: "Thời gian",
      flex: 1,
      align:'center',
      headerClassName: 'header',
      renderCell: (params) => {
        return new Date(params.row.date).toLocaleString()
      }
    },
    {
      field: "id",
      headerName: "Hóa đơn",
      flex: 1,
      align:'center',
      headerClassName: 'header',
    },
    {
      field: "total",
      headerName: "Số tiền",
      flex: 1,
      align:'center',
      headerClassName: 'header',
      renderCell: (params) => {
        return(
          <>{(params.status === 3 ? '+ ' : '- ') + dot3digits(params.row.total)} đ</>
        )
      }
    }
  ]

  return (
    <div className='transaction'>
      <h3>Quản lý tài chính</h3>
      <div>
        <p>Số dư tài khoản: {dot3digits(user.customer.balance)} đ</p>
        <div className="purchase-history">
          <p>Lịch sử thanh toán</p>
          <div className='purchase-history-table' style={{ width: '100%' }}>
            <DataGrid
              {...invoices}
              getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
              }
              rows={invoices}
              columns={invoiceColumns}
              disableColumnMenu={true}
              initialState={{
                ...invoices.initialState,
                pagination: { paginationModel: { pageSize: 7 } },
              }}
              pageSizeOptions={[7, 15, 25]}
            />
          </div>
          {/* <table>
            <tr>
              <th>Thời gian</th>
              <th>Hóa đơn</th>
              <th>Số tiền</th>
            </tr>
            {
              invoices.map((item) => (
                <tr>
                  <td>{new Date(item.date).toLocaleString()}</td>
                  <td>{item.id}</td>
                  <td>{(item.status === 3 ? '+ ' : '- ') + dot3digits(item.total)} đ</td>
                </tr>
              ))
            }
          </table> */}
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
              chargeList.map((item) => (
                <tr>
                  <td>{item.id}</td>
                  <td>{new Date(item.date).toLocaleString()}</td>
                  <td>{item.accountNumber}</td>
                  <td>{dot3digits(item.money)} đ</td>
                  <td>{getChargeRequestStatusName(item.status)}</td>
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

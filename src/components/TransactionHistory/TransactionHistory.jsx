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
      .then((res) => { setInvoices(res.data.reverse()) })
      .catch((err) => console.log(err))

    axios.get(`http://localhost:9090/api/requests/customer/${user.customer.id}`)
      .then((res) => { 
        setChargeList(res.data.reverse()) 

        axios.get(`http://localhost:9090/api/accounts/${user.username}`)
          .then((res) => { localStorage.setItem('user', JSON.stringify(res.data)) })
          .catch((err)=> console.log(err))
          
      })
      .catch((err) => console.log(err))

  }, [invoices, chargeList, user.customer.id, user.username])

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
          <>{(params.row.status === 3 ? '+ ' : '- ') + dot3digits(params.row.total)} đ {(params.row.status === 3 ? ' (hoàn)' : '')}</>
        )
      }
    }
  ]

  const requestColumns = [
    {
      field: "id",
      headerName: "Mã nạp tiền",
      flex: 1,
      minWidth: 90,
      align:'center',
      headerClassName: 'header',
    },
    {
      field: "date",
      headerName: "Thời gian",
      flex: 1,
      minWidth: 145,
      align:'center',
      headerClassName: 'header',
      renderCell: (params) => {
        return new Date(params.row.date).toLocaleString()
      }
    },
    {
      field: "accountNumber",
      headerName: "Số tài khoản",
      flex: 1,
      minWidth: 100,
      align:'center',
      headerClassName: 'header',
      renderCell: (params) => {
        return params.row.accountNumber
      }
    },
    {
      field: "money",
      headerName: "Số tiền",
      flex: 1,
      minWidth: 115,
      align:'center',
      headerClassName: 'header',
      renderCell: (params) => {
        return dot3digits(params.row.money) + 'đ'
      }
    },
    {
      field: "status",
      headerName: "Trạng thái",
      flex: 1,
      minWidth: 100,
      align:'center',
      headerClassName: 'header',
      renderCell: (params) => {
        return getChargeRequestStatusName(params.row.status)
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
          <div className='purchase-history-table'>
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
        </div>
        <div className="charge-history">
          <p>Lịch sử nạp tiền</p>
          <div className='charge-history-table'>
            <DataGrid
              {...chargeList}
              getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
              }
              rows={chargeList}
              columns={requestColumns}
              disableColumnMenu={true}
              initialState={{
                ...chargeList.initialState,
                pagination: { paginationModel: { pageSize: 7 } },
              }}
              pageSizeOptions={[7, 15, 25]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionHistory

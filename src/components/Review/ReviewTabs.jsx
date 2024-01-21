import React, { useEffect, useState } from 'react'
import InvoiceToReview from './InvoiceToReview';
import Reviews from './Reviews';
import { Link, useLocation } from 'react-router-dom';
import './review-tabs.css'

const ReviewTabs = () => {
  const tab = [
    {
      name: 'Chưa đánh giá',
      url: '/user/review',
      section: '',
      page: InvoiceToReview
    },
    {
      name: 'Lịch sử đánh giá',
      url: '/user/review/history',
      section: 'history',
      page: Reviews
    }
  ]

  const location = useLocation()

  const [page, setPage] = useState(0)

  useEffect(() => {
      const path = window.location.pathname.split('/');
      if (path[1] === 'user' && path[2] === 'review') {
          const activePage = tab.findIndex(item => item.section === path[3]);
          setPage(path[3] === undefined ? 0 : activePage);
      }
  }, [location])

  const DisplayPage = tab[page].page;

  return (
    <div className='review-tabs'>
      <div className="review-navigation">
        {tab.map((item, index) => (
          <Link to={item.url}>
            <div className={`review-tab-item ${page === index ? 'active' : ''}`}>{item.name}</div>
          </Link>
        ))}
      </div>
      <DisplayPage />
    </div>
  )
}

export default ReviewTabs

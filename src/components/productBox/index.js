import React from 'react'
import style from './productBox.module.scss'

const ProductBox = (props) => {
    const {item} = props
  return (
    <div className={style['productbox-main']}>
        <div className={style['productbox']}>
        {item.title}
        </div>
    </div>
  )
}

export default ProductBox
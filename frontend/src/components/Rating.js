import React from 'react'
import PropTypes from 'prop-types'
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa'

const Rating = ({ value, text, color}) => {

    return (
        <div className='rating'>
            <span style={{color: color}}>
                { value >=1 ? <FaStar /> : value >=0.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span style={{color: color}}>
                { value >=2 ? <FaStar /> : value >=1.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span style={{color: color}}>
                { value >=3 ? <FaStar /> : value >=2.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span style={{color: color}}>
                { value >=4 ? <FaStar /> : value >=3.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span style={{color: color}}>
                { value >=5 ? <FaStar /> : value >=4.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>

            <span>
                {text}
            </span>
        </div>
    )
}

Rating.defaultProps = {
    color: '#00dc87'
}

Rating.propTypes = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string
}

export default Rating

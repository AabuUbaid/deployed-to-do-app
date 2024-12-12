import React from 'react'

const ProgressBar = ({ progress }) => {
    const colors = [
        '#E4F1AC',
        '#A7D477',
        '#FF748B',
        '#F72C5B'
    ]

    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    return (
        <div className='outer-bar'>
            <div
                className="inner-bar"
                style={{ width: `${progress}%`, backgroundColor: randomColor }}
            ></div>
        </div>
    )
}

export default ProgressBar
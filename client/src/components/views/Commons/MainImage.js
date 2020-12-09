import React from 'react';
import './mainImage.css';
function MainImage(props) {
    return (
        <div style={{
            background: `linear-gradient(to bottom, rgba(0,0,0,0)
        39%,rgba(0,0,0,0)
        41%,rgba(0,0,0,0.65)
        100%),
        url('${props.image}'), #1c1c1c`,
            height: '500px',
            backgroundSize: '100%, cover',
            backgroundPosition: 'center, center',
            width: '100%',
            position: 'relative'
        }}>
            <div>
                <div className="mainPageDiv">
                    <h2 className="mainH2">{props.title} </h2>
                    <p className="mainP">{props.text}</p>
                </div>
            </div>
        </div>
    )
}


export default MainImage
import React from 'react'
import { Col } from 'antd';
import './gridCard.css';

function GridCards(props) {

    if (props.landingPage) {
        return (
            <Col lg={6} md={8} xs={24}>
                <div className="grdiCardDiv">
                    <a href={`/movie/${props.movieId}`} >
                        <img className="gridCardImage" src={props.image} alt={props.movieName} />
                    </a>
                </div>
            </Col >
        )
    } else {
        return (
            <Col lg={6} md={8} xs={24}>
                <div className="grdiCardDiv">
                    <img className="gridCardImage" src={props.image} alt={props.characterName} />
                </div>
            </Col>
        )
    }

}

export default GridCards
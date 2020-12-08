import React, { useEffect, useState } from 'react'
import './favorite.css';
import Axios from 'axios';
import { Popover } from 'antd';
import { IMAGE_BASE_URL } from '../../config';

function FavoritePage() {
    const [Favorites, setFavorites] = useState([])
    useEffect(() => {
        fetchFavoredMovie()
    }, [])

    const fetchFavoredMovie = () => {
        Axios.post('/api/favorite/getFavoredMovie', { userFrom: localStorage.getItem('userId') })
            .then(response => {
                if (response.data.success) {
                    setFavorites(response.data.favorites)
                } else {
                    alert('Failed to access Database for getting the movie information')
                }
            })
    }

    const onClickDelete = (movieId, userFrom) => {
        const variables = {
            movieId,
            userFrom
        }
        Axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response => {
                if (response.data.success) {
                    fetchFavoredMovie()
                } else {
                    alert("Faile to delete the movie from List.")
                }
            })
    }

    const renderCards = Favorites.map((favorite, index) => {
        return <tr key={index}>
            <td>{favorite.moviePost ?
                <img src={`${IMAGE_BASE_URL}w300${favorite.moviePost}`} /> : "no image"}</td>
            <td>{favorite.movieTitle}</td>
            <td>{favorite.movieRunTime} mins</td>
            <td><button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</button></td>
        </tr>
    })

    return (
        <div className="favoriteDiv">
            <h2> Favorite Movies </h2>
            <hr />
            <table>
                <thead>
                    <tr>
                        <th>Movie Poster</th>
                        <th>Movie Title</th>
                        <th>Movie RunTime</th>
                        <td>Remove from favorites</td>
                    </tr>
                </thead>
                <tbody>
                    {renderCards}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
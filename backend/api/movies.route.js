import express from 'express'
import MoviesController from './movies.controller.js'
import ReviewsController from '../dao/reviews.controller.js'

const router = express.Router() // get access to the express router
router.route('/').get(MoviesController.apiGetMovies)
router.route("/id/:id").get(MoviesController.apiGetMoviesById)
router.route("/ratings").get(MoviesController.apiGetRatings)

router
.route("/review")
.post(ReviewsController.apiPostReview)
.put(ReviewsController.apiUpdateReview)
.delete(ReviewsController.apiDeleteReview)

export default router

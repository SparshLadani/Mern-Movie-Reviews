import React, {useState} from 'react'
import MovieDataService from "../services/movies.js";
import {Link} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';

const AddReview = props => {
    let edit = false
    let initialReviewState = ""

    if (props.location.state && props.location.state.currentReview) {
        edit = true;
        initialReviewState = props.location.state.currentReview.review;
    }
    

    const [review, setReview] = useState(initialReviewState)
    const [submitted, setSubmitted] = useState(false)

    const onChangeReview = e => {
        const review = e.target.value;
        setReview(review);
    }

    const saveReview = () => {
        var data = {
            review: review,
            name: props.user.name,
            user_id: props.user.id,
            movie_id: props.match.params.id
        }

        if(edit){
            data.review_id = props.location.state.currentReview._id
            MovieDataService.updateReview(data)
            .then(response => {
                setSubmitted(true);
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            })
        }

        else{
            MovieDataService.createReview(data)
            .then(response => {
                setSubmitted(true)
            })
            .catch(e => {
                console.log(e);
            })
        }
    }

    return(
        <div>
            {submitted ? (
                <div>
                    <h4>Review submitted succesfully</h4>
                    <Link to={"/movies/" + props.match.params.id}>
                        Back to Movie
                    </Link>
                </div>
                ):(
                    <Form>
                        <Form.Group>
                            <Form.Label>{edit?"Edit" : "Create"}Review</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={review}
                                onChange={onChangeReview}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={saveReview}>Submit</Button>
                    </Form>
                )
            }
        </div>
    )
}

export default AddReview;
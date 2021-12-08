from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.forms.post_review_form import EditReview

from app.models import db, Review
from app.forms import NewReview
from .auth_routes import validation_errors_to_error_messages


review_routes = Blueprint('reviews', __name__)


@review_routes.route("/")
def get_reviews():

    reviews = Review.query.all()
    return {'reviews': [review.to_dict() for review in reviews]}


@review_routes.route('/', methods=["POST"])
def post_review():
    form = NewReview()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newReview = Review(userId=form.data['userId'], rating=form.data['rating'],
                           comment=form.data['comment'], restaurantId=form.data['restaurantId'])
        db.session.add(newReview)
        db.session.commit()
        return newReview.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@review_routes.route('/<int:id>', methods=["PUT"])
def edit_reviews(id):
    form = EditReview()
    reviewToEdit = Review.query.get(int(id))
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        reviewToEdit.rating = form.data['rating']
        reviewToEdit.comment = form.data['comment']
        db.session.commit()
        return reviewToEdit.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@review_routes.route('/<int:id>', methods=['DELETE'])
def delete_review(id):
    reviewToDelete = Review.query.get(int(id))
    db.session.delete(reviewToDelete)
    db.session.commit()
    return {'message': f"Deleted review {id}"}





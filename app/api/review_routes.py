from flask import Blueprint, jsonify, request
from flask_login import login_required

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
        return {'errors': validation_errors_to_error_messages(form.errors)}, 500

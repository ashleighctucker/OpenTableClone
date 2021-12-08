from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, User, Favorite
from app.forms import FavoriteForm

user_routes = Blueprint('users', __name__)

@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/favorites')
def get_favs():
    # favorites = Favorite.query.filter(Favorite.userId == id)
    favorites = Favorite.query.all()
    return {'favorites': [fav.to_dict() for fav in favorites]}

@user_routes.route('/<int:id>/favorites', methods=['POST'])
def create_favs():
    form = FavoriteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newFav = Favorite(userId=form.data['userId'], restaurantId=form.data['restaurantId'])
        db.session.add(newFav)
        db.session.commit()
        return newFav.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 500

@user_routes.route('/<int:id>/favorites/<int', methods=['DELETE'])
def delete_favs():
    favorite = Favorite.query.get(id)
    if(favorite):
        db.session.delete(favorite)
        db.session.commit()
    else:
        return {'Nothing to delete.'}

# from flask import Blueprint, jsonify, request

# from app.models import db, Favorite
# from app.forms import FavoriteForm

# fav_routes = Blueprint('favorites', __name__)

# @fav_routes.route('/')
# def get_favs():
#     # favorites = Favorite.query.filter(Favorite.userId == userid)
#     favorites = Favorite.query.all()
#     return {'favorites': [fav.to_dict() for fav in favorites]}

# @fav_routes.route('/', methods=['POST'])
# def create_favs():
#     form = FavoriteForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         newFav = Favorite(userId=form.data['userId'], restaurantId=form.data['restaurantId'])
#         db.session.add(newFav)
#         db.session.commit()
#         return newFav.to_dict()
#     else:
#         return {'errors': validation_errors_to_error_messages(form.errors)}, 500

# @fav_routes.route('/<int:id>', methods=['DELETE'])
# def delete_favs():
#     favorite = Favorite.query.get(id)
#     if(favorite):
#         db.session.delete(favorite)
#         db.session.commit()
#     else:
#         return {'Nothing to delete.'}

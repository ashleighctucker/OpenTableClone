from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Favorite

def favExists(form, field):
    restaurantId = field.data['restaurantId']
    fav = Favorite.query.filter(Favorite.restaurantId == restaurantId)
    if not user:
        raise ValidationError('Already Favorited')

class FavoriteForm(FlaskForm):
    userId = IntegerField('userId', validators=[DataRequired()])
    restaurantId = IntegerField('restaurantId', validators=[DataRequired(), favExists])

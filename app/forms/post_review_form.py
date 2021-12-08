from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField
from wtforms.validators import DataRequired, ValidationError


def ratingValidator(form, field):
    rating = field.data
    if rating < 1 or rating > 5:
        raise ValidationError('Rating has to be a number between 1 and 5.')


class NewReview(FlaskForm):
    rating = IntegerField("Rating", validators=[
                          DataRequired(), ratingValidator])
    comment = TextAreaField("Comment")
    restaurantId = IntegerField("restaurant Id", validators=[DataRequired()])
    userId = IntegerField("user Id", validators=[DataRequired()])


class EditReview(FlaskForm):
    rating = IntegerField("Rating", validators=[
                          DataRequired(), ratingValidator])
    comment = TextAreaField("Comment", validators=[DataRequired()])

from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField
from wtforms.validators import DataRequired


class NewReview(FlaskForm):
    rating = IntegerField("Rating", validators=[DataRequired()])
    comment = TextAreaField("Comment")
    restaurantId = IntegerField("restaurant Id", validators=[DataRequired()])
    userId = IntegerField("user Id", validators=[DataRequired()])


class EditReview(FlaskForm):
    rating = IntegerField("Rating", validators=[DataRequired()])
    comment = TextAreaField("Comment", validators=[DataRequired()])



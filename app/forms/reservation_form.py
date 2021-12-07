from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, IntegerField, TextField
from app.models import User
import datetime

class ReservationForm(FlaskForm):
    restaurant_id = StringField("Restaurant Id", validators=[DataRequired()])
    time_slot = StringField("Reservation Time", validators=[DataRequired()])
    date = StringField('email', validators=[DataRequired()])
    party_size = IntegerField('Party Size', validators=[DataRequired()])
    available_size = IntegerField('Available Size', validators=[DataRequired()])
    user_id = StringField("User Id", validators=[DataRequired()])    
    notes=TextField('Notes')

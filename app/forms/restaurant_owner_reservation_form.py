from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.fields.core import DateField, IntegerField
from wtforms import TextField
from wtforms.validators import DataRequired 
from app.forms.post_restaurant_form import timeValidator

class RestaurantOwnerReservationForm(FlaskForm):
    #restaurant_id = StringField("Restaurant Id", validators=[DataRequired()])
    time_slot = StringField("Reservation Time", validators=[DataRequired(), timeValidator])
    date = DateField('Date Time Field', validators=[DataRequired()])
    available_size = IntegerField('Available Size', validators=[DataRequired()])

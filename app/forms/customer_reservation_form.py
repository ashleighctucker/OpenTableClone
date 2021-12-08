from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.fields.core import DateField, IntegerField
from wtforms import TextField
from wtforms.validators import DataRequired 
from app.forms.post_restaurant_form import timeValidator

class CustomerReservationForm(FlaskForm):
    party_size = IntegerField('Party Size', validators=[DataRequired()])
    user_id = StringField("User Id", validators=[DataRequired()])    
    notes=TextField('Notes')

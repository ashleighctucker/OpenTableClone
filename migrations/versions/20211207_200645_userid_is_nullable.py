"""userId is nullable.

Revision ID: 7688240afa7d
Revises: f775c4b88a02
Create Date: 2021-12-07 20:06:45.995312

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7688240afa7d'
down_revision = 'f775c4b88a02'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('reservations', 'user_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('reservations', 'user_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    # ### end Alembic commands ###

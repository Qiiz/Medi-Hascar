import datetime
from pydantic import BaseModel


class Payload(BaseModel):
    serial_number : str
    cost : float
    warrenty: bool
    status: bool
    functional: str
    installation_date: str
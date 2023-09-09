import datetime
from pydantic import BaseModel


class Payload(BaseModel):
    serial_number: str
    cost: float  
    under_warranty: str
    functional: int
    status: str
    installation_date: datetime.datetime # obj in dd/mm/yyyy format

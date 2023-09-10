from pydantic import BaseModel
from typing import Dict

class Results(BaseModel):
    serial_num: str
    cluster_num: int
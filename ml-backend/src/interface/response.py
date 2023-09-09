from pydantic import BaseModel
from typing import Dict

class Response(BaseModel):
    serial_num: str
    cluster_num: int
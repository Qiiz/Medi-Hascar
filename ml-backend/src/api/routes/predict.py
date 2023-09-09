import httpx
from fastapi import APIRouter, HTTPException
from starlette.requests import Request

#from src.core import security
from src.interface.payload import Payload
from src.interface.response import Results
from src.services.predictor import Predict
#from src.core.config import (APP_HOST,APP_PORT)


router = APIRouter()

@router.post("/cluster_data", response_model=Results) # listens for POST request at cluster_data
async def post_predict(request: Request): 
    try:
        engine = Predict()
        request_body_bytes = await request.body()
        cluster_result: Results = engine.process(request_body_bytes.decode())
        return cluster_result
        
    except httpx.RequestError as e:
        raise HTTPException(status_code=500, detail=f"HTTP Error: {str(e)}")
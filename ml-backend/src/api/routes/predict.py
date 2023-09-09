import httpx
from fastapi import APIRouter, HTTPException
from starlette.requests import Request

#from src.core import security
from src.interface.payload import Payload
from src.interface.response import Results
from src.services.predictor import Predict
from src.core.config import (APP_HOST,APP_PORT)


router = APIRouter()

@router.post("/cluster_data", response_model=Results, name="cluster_res") # listens for POST request at cluster_data
async def post_predict(request: Request, block_data: Payload = None) -> str: 
    try:
        engine: Predict = request.app.state.engine
        cluster_result: Results = engine.process(block_data)
            
        async with httpx.AsyncClient() as client:
            target_url = f"http://{APP_HOST}:{APP_PORT}/endpoint"
            response = await client.post(target_url, json=cluster_result)
            response.raise_for_status()

            return {"message": "Data sent successfully"}
        
    except httpx.RequestError as e:
        raise HTTPException(status_code=500, detail=f"HTTP Error: {str(e)}")
from fastapi import APIRouter
from src.api.routes import predict


api_router = APIRouter()
api_router.include_router(predict.router, tags=["cluster_res"])
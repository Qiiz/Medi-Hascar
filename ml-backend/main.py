import uvicorn 
from fastapi import FastAPI
from src.api.routes.router import api_router
from src.core.config import (APP_VERSION,APP_NAME,API_PORT)


def get_app() -> FastAPI:
    fast_app = FastAPI(title=APP_NAME, version=APP_VERSION)
    fast_app.include_router(api_router)

    # fast_app.add_event_handler("startup", start_app_handler(fast_app))
    # fast_app.add_event_handler("shutdown", stop_app_handler(fast_app))

    return fast_app


app = get_app()

if __name__=='__main__':
    uvicorn.run('main:app', hostname= '0.0.0.0', port=API_PORT, reload=True) # reload is set to False in production
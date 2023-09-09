from starlette.config import Config

APP_VERSION = "0.0.1"
APP_NAME = "MednaHascar"

config = Config(".env")

API_PORT: int = config("API_PORT", cast=int, default=8080)
APP_PORT: int = config("APP_PORT", cast=int)

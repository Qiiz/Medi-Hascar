from starlette.config import Config

APP_VERSION = "0.0.1"
APP_NAME = "MednaHascar"

config = Config(".env")

API_PORT: int = config("API_PORT", cast=int, default=8080)
DEFAULT_CONFIG_PATH: str = config("DEFAULT_CONFIG_PATH")

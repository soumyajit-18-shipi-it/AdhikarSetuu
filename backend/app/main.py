from __future__ import annotations

from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .api.routes.analytics import router as analytics_router
from .api.routes.loss import router as loss_router
from .api.routes.rejection import router as rejection_router
from .api.routes.schemes import router as schemes_router
from .core.config import ALLOWED_ORIGINS, APP_NAME, API_PREFIX


def create_app() -> FastAPI:
    app = FastAPI(title=APP_NAME, version="1.0.0")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.exception_handler(HTTPException)
    async def http_exception_handler(_: Request, exc: HTTPException) -> JSONResponse:
        return JSONResponse(status_code=exc.status_code, content={"detail": exc.detail})

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(_: Request, exc: RequestValidationError) -> JSONResponse:
        return JSONResponse(status_code=422, content={"detail": exc.errors()})

    @app.exception_handler(Exception)
    async def generic_exception_handler(_: Request, exc: Exception) -> JSONResponse:
        return JSONResponse(status_code=500, content={"detail": "Internal server error"})

    app.include_router(schemes_router, prefix=API_PREFIX)
    app.include_router(loss_router, prefix=API_PREFIX)
    app.include_router(rejection_router, prefix=API_PREFIX)
    app.include_router(analytics_router, prefix=API_PREFIX)

    @app.get("/")
    async def root() -> dict[str, str]:
        return {"status": "running", "service": APP_NAME}

    return app


app = create_app()

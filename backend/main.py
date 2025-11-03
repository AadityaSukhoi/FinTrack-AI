from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from database.db import Base, engine
from utils.logger import logger
from auth.routes import router as auth_router

# ---------- Lifespan Handler ----------
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup code
    Base.metadata.create_all(bind=engine)
    logger.info("Database tables created successfully.")
    yield
    # Shutdown code (if any)
    logger.info("Shutting down FinTrack AI backend...")

# ---------- Create FastAPI app ----------
app = FastAPI(
    title="FinTrack AI Backend",
    description="AI-powered personal finance tracker",
    version="1.0.0",
    lifespan=lifespan  
)

# ---------- CORS Middleware ----------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- Include Routers ----------
app.include_router(auth_router)

# ---------- Root & Favicon ----------
@app.get("/", summary="Welcome endpoint")
def root():
    return {"message": "Welcome to FinTrack AI!"}

@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return FileResponse("static/favicon.ico")

# ---------- Run Server ----------
if __name__ == "__main__":
    import uvicorn
    logger.info("Starting FinTrack AI FastAPI server...")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

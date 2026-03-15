from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# SQLite database file — auto-created in the same folder
DATABASE_URL = "sqlite:///./medease.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}  # needed for SQLite only
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


# Dependency — gives each request its own database session
# and closes it automatically when the request is done
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
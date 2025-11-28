"""
backend.finance Budgets Routes
Handles user budget creation and retrieval with caching and logs.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from redis import Redis
from backend.finance.models import Budget
from backend.auth.models import User
from backend.finance.schemas import BudgetCreate, BudgetOut
from backend.database.db import get_db
from backend.utils.logger import logger
from backend.dependencies import get_current_user

router = APIRouter()
redis_client = Redis(host="localhost", port=6379, db=0, decode_responses=True)

@router.post("/api/budgets", response_model=BudgetOut)
def create_budget(budget: BudgetCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    """Create a new budget entry for a user"""
    logger.info(f"User {user.email} setting budget: category={budget.category_id}, limit={budget.limit_amount}₹")
    try:
        db_budget = Budget(user_id=user.id, **budget.dict())
        db.add(db_budget)
        db.commit()
        db.refresh(db_budget)

        # Clear cache after budget creation
        redis_client.delete(f"budgets:{user.id}")
        logger.success(f"Budget added for {user.email} with limit ₹{db_budget.limit_amount}")
        return db_budget
    except Exception as e:
        logger.error(f"Budget creation failed for {user.email}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create budget")

@router.get("/api/budgets", response_model=list[BudgetOut])
def get_budgets(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    """Retrieve all budgets for a user with Redis caching"""
    cache_key = f"budgets:{user.id}"
    cached_data = redis_client.get(cache_key)

    if cached_data:
        logger.info(f"Cache hit: budgets for {user.email}")
        return eval(cached_data)

    logger.info(f"Cache miss: fetching budgets from DB for {user.email}")
    budgets = db.query(Budget).filter(Budget.user_id == user.id).all()

    for b in budgets:
        if b.spent_amount >= b.limit_amount * 0.9:
            logger.warning(f"Budget nearing limit for {user.email}: {b.category_id} ({b.spent_amount}/{b.limit_amount})")

    redis_client.setex(cache_key, 60, str([b.__dict__ for b in budgets]))
    logger.success(f"Budgets fetched and cached for {user.email}")
    return budgets
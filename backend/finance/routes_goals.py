"""
backend.finance Goals Routes
Handles goal creation, contributions, and retrieval.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.finance.models import SavingsGoal
from backend.auth.models import User
from backend.finance.schemas import SavingsGoalCreate, SavingsGoalOut, GoalContribution
from backend.database.db import get_db
from backend.utils.logger import logger
from backend.dependencies import get_current_user

router = APIRouter()

@router.post("/api/goals", response_model=SavingsGoalOut)
def create_goal(goal: SavingsGoalCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    """Create a new savings goal"""
    logger.info(f"{user.email} creating goal: {goal.goal_name}")
    try:
        db_goal = SavingsGoal(user_id=user.id, **goal.dict())
        db.add(db_goal)
        db.commit()
        db.refresh(db_goal)
        logger.success(f"Goal '{goal.goal_name}' created successfully for {user.email}")
        return db_goal
    except Exception as e:
        logger.error(f"Goal creation failed for {user.email}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create goal")

@router.post("/api/goals/{goal_id}/contribute", response_model=SavingsGoalOut)
def contribute_to_goal(goal_id: int, amount: GoalContribution, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    """Contribute to an existing goal"""
    logger.info(f"{user.email} contributing ₹{amount.amount} to goal {goal_id}")
    goal = db.query(SavingsGoal).filter_by(id=goal_id, user_id=user.id).first()
    if not goal:
        logger.warning(f"Goal not found for {user.email}: ID {goal_id}")
        raise HTTPException(status_code=404, detail="Goal not found")

    goal.current_amount += amount.amount
    db.commit()
    db.refresh(goal)
    logger.success(f"Goal '{goal.goal_name}' updated: ₹{goal.current_amount}/{goal.target_amount}")
    return goal
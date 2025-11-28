# backend/finance/routes_transactions.py

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timedelta
import uuid

from backend.database.db import get_db
from backend.dependencies import get_current_user
from backend.auth.models import User
from backend.finance.models import Transaction
from backend.finance.schemas import (
    TransactionCreate,
    TransactionUpdate,
    TransactionOut,
)
from backend.utils.cache import Cache, get_cache_key
from backend.utils.logger import logger

router = APIRouter(tags=["Transactions"])


# ==================== CREATE TRANSACTION ====================
@router.post("/", response_model=TransactionOut, status_code=201)
def create_transaction(
    transaction: TransactionCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Create a new transaction"""
    logger.info(f"Creating transaction for user {current_user.id}")

    new_transaction = Transaction(
        id=str(uuid.uuid4()),
        user_id=current_user.id,
        type=transaction.type,
        description=transaction.description,
        category=transaction.category,
        amount=transaction.amount,
        date=transaction.date or datetime.utcnow(),
    )

    try:
        db.add(new_transaction)
        db.commit()
        db.refresh(new_transaction)

        # Clear user's cache
        Cache.clear_user_cache(current_user.id)

        logger.info(f"✅ Transaction created: {new_transaction.id}")
        return new_transaction

    except Exception as e:
        db.rollback()
        logger.error(f"❌ Failed to create transaction: {e}")
        raise HTTPException(status_code=500, detail="Failed to create transaction")


# ==================== GET ALL TRANSACTIONS ====================
@router.get("/", response_model=List[TransactionOut])
def get_transactions(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    type: Optional[str] = None,
    category: Optional[str] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Get all transactions with optional filters"""
    logger.info(f"Fetching transactions for user {current_user.id}")

    # Build cache key
    cache_key = get_cache_key(
        current_user.id,
        "transactions",
        skip,
        limit,
        type or "all",
        category or "all",
        start_date or "none",
        end_date or "none",
    )

    # Try cache first
    cached = Cache.get(cache_key)
    if cached:
        return cached

    # Query database
    query = db.query(Transaction).filter(Transaction.user_id == current_user.id)

    if type:
        query = query.filter(Transaction.type == type)
    if category:
        query = query.filter(Transaction.category == category)
    if start_date:
        query = query.filter(Transaction.date >= start_date)
    if end_date:
        query = query.filter(Transaction.date <= end_date)

    transactions = query.order_by(Transaction.date.desc()).offset(skip).limit(limit).all()

    # Convert to dict for caching
    result = [TransactionOut.from_orm(t).dict() for t in transactions]

    # Cache for 5 minutes
    Cache.set(cache_key, result, ttl=300)

    logger.info(f"✅ Fetched {len(transactions)} transactions")
    return transactions


# ==================== GET SINGLE TRANSACTION ====================
@router.get("/{transaction_id}", response_model=TransactionOut)
def get_transaction(
    transaction_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Get a specific transaction"""
    transaction = (
        db.query(Transaction)
        .filter(Transaction.id == transaction_id, Transaction.user_id == current_user.id)
        .first()
    )

    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")

    return transaction


# ==================== UPDATE TRANSACTION ====================
@router.put("/{transaction_id}", response_model=TransactionOut)
def update_transaction(
    transaction_id: str,
    transaction_update: TransactionUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Update a transaction"""
    logger.info(f"Updating transaction {transaction_id}")

    transaction = (
        db.query(Transaction)
        .filter(Transaction.id == transaction_id, Transaction.user_id == current_user.id)
        .first()
    )

    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")

    # Update fields
    update_data = transaction_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(transaction, field, value)

    try:
        db.commit()
        db.refresh(transaction)

        # Clear user's cache
        Cache.clear_user_cache(current_user.id)

        logger.info(f"✅ Transaction updated: {transaction_id}")
        return transaction

    except Exception as e:
        db.rollback()
        logger.error(f"❌ Failed to update transaction: {e}")
        raise HTTPException(status_code=500, detail="Failed to update transaction")


# ==================== DELETE TRANSACTION ====================
@router.delete("/{transaction_id}", status_code=204)
def delete_transaction(
    transaction_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Delete a transaction"""
    logger.info(f"Deleting transaction {transaction_id}")

    transaction = (
        db.query(Transaction)
        .filter(Transaction.id == transaction_id, Transaction.user_id == current_user.id)
        .first()
    )

    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")

    try:
        db.delete(transaction)
        db.commit()

        # Clear user's cache
        Cache.clear_user_cache(current_user.id)

        logger.info(f"✅ Transaction deleted: {transaction_id}")

    except Exception as e:
        db.rollback()
        logger.error(f"❌ Failed to delete transaction: {e}")
        raise HTTPException(status_code=500, detail="Failed to delete transaction")
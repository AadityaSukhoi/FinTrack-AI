# backend/finance/models.py

from sqlalchemy import Column, String, Float, DateTime, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import relationship
from backend.database.db import Base
from datetime import datetime
import enum


class TransactionType(str, enum.Enum):
    INCOME = "income"
    EXPENSE = "expense"


class CategoryType(str, enum.Enum):
    FOOD_DINING = "Food & Dining"
    TRANSPORTATION = "Transportation"
    SHOPPING = "Shopping"
    BILLS_UTILITIES = "Bills & Utilities"
    ENTERTAINMENT = "Entertainment"
    HEALTHCARE = "Healthcare"
    EDUCATION = "Education"
    SALARY = "Salary"
    INVESTMENT = "Investment"
    OTHER = "Other"


class UserProfile(Base):
    """Stores user's financial profile and settings"""
    __tablename__ = "user_profiles"

    id = Column(String, primary_key=True, index=True)  # uuid
    user_id = Column(String, ForeignKey("users.id"), unique=True, nullable=False)
    initial_balance = Column(Float, default=0.0)
    monthly_budget = Column(Float, default=0.0)
    currency = Column(String, default="INR")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = relationship("User", backref="profile")


class Transaction(Base):
    """Stores all financial transactions"""
    __tablename__ = "transactions"

    id = Column(String, primary_key=True, index=True)  # uuid
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    type = Column(SQLEnum(TransactionType), nullable=False)
    description = Column(String, nullable=False)
    category = Column(String, nullable=False)  # Using CategoryType enum values
    amount = Column(Float, nullable=False)
    date = Column(DateTime, default=datetime.utcnow, nullable=False, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = relationship("User", backref="transactions")


class Category(Base):
    """Predefined and custom categories"""
    __tablename__ = "categories"

    id = Column(String, primary_key=True, index=True)  # uuid
    user_id = Column(String, ForeignKey("users.id"), nullable=True)  # NULL for system categories
    name = Column(String, nullable=False)
    type = Column(SQLEnum(TransactionType), nullable=False)  # income or expense
    color = Column(String, default="#10b981")  # Hex color for UI
    icon = Column(String, nullable=True)  # Icon name or emoji
    is_system = Column(String, default="false")  # "true" for predefined categories
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", backref="custom_categories")


class Budget(Base):
    """Budget tracking for categories"""
    __tablename__ = "budgets"

    id = Column(String, primary_key=True, index=True)  # uuid
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    category = Column(String, nullable=False)
    limit_amount = Column(Float, nullable=False)
    period = Column(String, default="monthly")  # monthly, yearly
    spent_amount = Column(Float, default=0.0)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = relationship("User", backref="budgets")


class Goal(Base):
    """Financial goals tracking"""
    __tablename__ = "goals"

    id = Column(String, primary_key=True, index=True)  # uuid
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    name = Column(String, nullable=False)
    target_amount = Column(Float, nullable=False)
    current_amount = Column(Float, default=0.0)
    deadline = Column(DateTime, nullable=True)
    category = Column(String, nullable=True)
    color = Column(String, default="#10b981")
    icon = Column(String, nullable=True)
    completed = Column(String, default="false")  
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", backref="goals")


SavingsGoal = Goal
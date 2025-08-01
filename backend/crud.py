from sqlalchemy.orm import Session
from models import Player
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# Pydantic models for request/response
class PlayerBase(BaseModel):
    name: str
    position: str
    team: Optional[str] = None
    status: str = "active"

class PlayerCreate(PlayerBase):
    pass

class PlayerUpdate(PlayerBase):
    pass

class PlayerResponse(PlayerBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# CRUD functions
def get_players(db: Session) -> List[Player]:
    return db.query(Player).all()

def get_player(db: Session, player_id: int) -> Optional[Player]:
    return db.query(Player).filter(Player.id == player_id).first()

def create_player(db: Session, player: PlayerCreate) -> Player:
    db_player = Player(**player.model_dump())
    db.add(db_player)
    db.commit()
    db.refresh(db_player)
    return db_player

def update_player(db: Session, player_id: int, player: PlayerUpdate) -> Optional[Player]:
    db_player = db.query(Player).filter(Player.id == player_id).first()
    if db_player:
        for key, value in player.model_dump().items():
            setattr(db_player, key, value)
        db.commit()
        db.refresh(db_player)
    return db_player

def delete_player(db: Session, player_id: int) -> bool:
    db_player = db.query(Player).filter(Player.id == player_id).first()
    if db_player:
        db.delete(db_player)
        db.commit()
        return True
    return False

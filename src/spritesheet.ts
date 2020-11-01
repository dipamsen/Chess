import WhiteKing from '../assets/king_white.png'
import BlackKing from '../assets/king_black.png'
import WhiteQueen from '../assets/queen_white.png'
import BlackQueen from '../assets/queen_black.png'
import WhiteRook from '../assets/rook_white.png'
import BlackRook from '../assets/rook_black.png'
import WhiteBishop from '../assets/bishop_white.png'
import BlackBishop from '../assets/bishop_black.png'
import WhiteKnight from '../assets/knight_white.png'
import BlackKnight from '../assets/knight_black.png'
import WhitePawn from '../assets/pawn_white.png'
import BlackPawn from '../assets/pawn_black.png'
import { Players, Pieces } from './constants'

export default {
  [Players.WHITE]: {
    [Pieces.KING]: WhiteKing,
    [Pieces.QUEEN]: WhiteQueen,
    [Pieces.ROOK]: WhiteRook,
    [Pieces.BISHOP]: WhiteBishop,
    [Pieces.KNIGHT]: WhiteKnight,
    [Pieces.PAWN]: WhitePawn
  },
  [Players.BLACK]: {
    [Pieces.KING]: BlackKing,
    [Pieces.QUEEN]: BlackQueen,
    [Pieces.ROOK]: BlackRook,
    [Pieces.BISHOP]: BlackBishop,
    [Pieces.KNIGHT]: BlackKnight,
    [Pieces.PAWN]: BlackPawn
  }
}
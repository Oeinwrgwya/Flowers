// Wspólne stałe i rejestr klas. Ładowany jako pierwszy.
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const W = canvas.width;
const H = canvas.height;
const SPEED = 240;
const RADIUS = 22;
const MAX_HP = 100;
const PLAYER_PALETTE = { main: '#2f7bff', light: '#9cc6ff', dark: '#0f2f9e' };
const ENEMY_PALETTE = { main: '#ff3b4e', light: '#ffa3ab', dark: '#9c0f22' };

// Rejestr klas. Każdy plik w js/classes/ dopisuje tu swoją klasę.
//
// Wymagane pola klasy:
//   name, description
//   create()                       -> stan początkowy kulki
//   update(ball, enemy, dt, game)  -> logika klasy co klatkę
//   draw(ctx, ball)                -> rysowanie broni przy kulce
//
// Opcjonalne (dla klas, które tworzą obiekty w świecie, np. strzały):
//   reset(game)                    -> przygotowanie stanu przy starcie walki
//   updateWorld(game, dt)          -> ruch i kolizje własnych obiektów
//   drawWorld(ctx, game)           -> rysowanie własnych obiektów (pod kulkami)
const CLASSES = {};

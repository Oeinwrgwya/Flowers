// Arena: rysowanie tła, odbicia od ścian i kolizje kulek.

function drawArena() {
  const g = ctx.createRadialGradient(W / 2, H / 2, 60, W / 2, H / 2, W * 0.65);
  g.addColorStop(0, '#2a3248');
  g.addColorStop(1, '#141720');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  ctx.beginPath();
  for (let x = 50; x < W; x += 50) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
  }
  for (let y = 50; y < H; y += 50) {
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
  }
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.045)';
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(W / 2, H / 2, 70, 0, Math.PI * 2);
  ctx.moveTo(W / 2, 0);
  ctx.lineTo(W / 2, H);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.strokeStyle = 'rgba(47, 123, 255, 0.25)';
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, W - 4, H - 4);
}

function moveBall(b, dt) {
  b.x += b.vx * dt;
  b.y += b.vy * dt;
  if (b.x < b.r) { b.x = b.r; b.vx = Math.abs(b.vx); }
  if (b.x > W - b.r) { b.x = W - b.r; b.vx = -Math.abs(b.vx); }
  if (b.y < b.r) { b.y = b.r; b.vy = Math.abs(b.vy); }
  if (b.y > H - b.r) { b.y = H - b.r; b.vy = -Math.abs(b.vy); }
}

function normalizeSpeed(b) {
  const len = Math.hypot(b.vx, b.vy) || 1;
  b.vx = (b.vx / len) * SPEED;
  b.vy = (b.vy / len) * SPEED;
}

function collideBalls(a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.hypot(dx, dy);
  const min = a.r + b.r;
  if (dist >= min || dist === 0) return;
  const nx = dx / dist;
  const ny = dy / dist;
  const overlap = min - dist;
  a.x -= (nx * overlap) / 2;
  a.y -= (ny * overlap) / 2;
  b.x += (nx * overlap) / 2;
  b.y += (ny * overlap) / 2;
  const va = a.vx * nx + a.vy * ny;
  const vb = b.vx * nx + b.vy * ny;
  if (va > vb) {
    a.vx += (vb - va) * nx;
    a.vy += (vb - va) * ny;
    b.vx += (va - vb) * nx;
    b.vy += (va - vb) * ny;
    normalizeSpeed(a);
    normalizeSpeed(b);
  }
}

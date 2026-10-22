// Klasa: Sword (walka w zwarciu)

const SWORD = { reach: 64, time: 0.28, sweep: 1.1, damage: 14, cooldown: 0.8, trigger: 30, tolerance: 0.45 };

CLASSES.sword = {
  name: 'Sword',
  description: 'Close range. Swings for ' + SWORD.damage + ' damage.',

  create() {
    return { cooldown: 0.5, swing: -1, hit: false, base: 0, angle: 0, facing: 0 };
  },

  update(ball, enemy, dt) {
    const s = ball.state;
    s.cooldown -= dt;
    const dx = enemy.x - ball.x;
    const dy = enemy.y - ball.y;
    const dist = Math.hypot(dx, dy);
    const toEnemy = Math.atan2(dy, dx);
    if (s.swing < 0) {
      s.facing = toEnemy;
      if (s.cooldown <= 0 && dist < SWORD.reach + enemy.r + SWORD.trigger) {
        s.swing = 0;
        s.hit = false;
        s.base = toEnemy;
      }
      return;
    }
    s.swing += dt;
    const t = Math.min(s.swing / SWORD.time, 1);
    s.angle = s.base - SWORD.sweep + 2 * SWORD.sweep * t;
    if (!s.hit && dist < SWORD.reach + enemy.r) {
      const diff = Math.atan2(Math.sin(s.angle - toEnemy), Math.cos(s.angle - toEnemy));
      if (Math.abs(diff) < SWORD.tolerance) {
        enemy.hp -= SWORD.damage;
        s.hit = true;
      }
    }
    if (t >= 1) {
      s.swing = -1;
      s.cooldown = SWORD.cooldown;
    }
  },

  draw(c, ball) {
    const s = ball.state;
    const angle = s.swing >= 0 ? s.angle : s.facing - SWORD.sweep;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    c.lineCap = 'round';
    if (s.swing >= 0) {
      c.beginPath();
      c.arc(ball.x, ball.y, SWORD.reach - 8, s.base - SWORD.sweep, s.angle);
      c.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      c.lineWidth = 10;
      c.stroke();
    }
    const x0 = ball.x + cos * (ball.r - 2);
    const y0 = ball.y + sin * (ball.r - 2);
    const x1 = ball.x + cos * SWORD.reach;
    const y1 = ball.y + sin * SWORD.reach;
    c.beginPath();
    c.moveTo(x0, y0);
    c.lineTo(x1, y1);
    c.strokeStyle = '#2f3750';
    c.lineWidth = 8;
    c.stroke();
    c.beginPath();
    c.moveTo(x0, y0);
    c.lineTo(x1, y1);
    c.strokeStyle = '#f4f7ff';
    c.lineWidth = 5;
    c.stroke();
    const gx = ball.x + cos * (ball.r + 7);
    const gy = ball.y + sin * (ball.r + 7);
    c.beginPath();
    c.moveTo(gx - sin * 10, gy + cos * 10);
    c.lineTo(gx + sin * 10, gy - cos * 10);
    c.strokeStyle = '#ffc93c';
    c.lineWidth = 4;
    c.stroke();
  }
};

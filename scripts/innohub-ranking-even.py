# Rebuilds Tari's "Clasificación Ideas" export with its three cards at one height and one inner layout
# (on the live platform the cards size to their content). Every piece (number, title, user, likes) is cut from
# the export itself and laid back on the card's own orange. Usage:
#   python3 -I scripts/innohub-ranking-even.py design-references/innohub-exports/ranking.png design-references/innohub-exports/ranking-even.png
import sys
import numpy as np
from PIL import Image, ImageDraw

src = Image.open(sys.argv[1]).convert("RGBA")
a = np.array(src).astype(int)
ORANGE = (250, 135, 93, 255)
CARDS = [(140, 431), (444, 715), (728, 958)]  # the cards' rows in the export
LEFT, RIGHT, RADIUS, GAP = 6, 823, 40, 12
CARD_H = 272  # the middle card, the one with a two-line title

def bbox(mask, x0, y0):
    ys, xs = np.nonzero(mask)
    return xs.min() + x0, ys.min() + y0, xs.max() + x0 + 1, ys.max() + y0 + 1

def pieces(top, bottom):
    reg = a[top:bottom + 1]
    ink = np.abs(reg[:, :, :3] - np.array(ORANGE[:3])).sum(axis=2) > 60
    inner = ink[16:-16]  # stay clear of the rounded edges
    circle = bbox((reg[16:-16, 30:200, :3].sum(axis=2) < 200), 30, top + 16)
    rows = inner[:, 220:810].any(axis=1)
    runs, start = [], None
    for y, v in enumerate(rows):
        if v and start is None: start = y
        if not v and start is not None: runs.append((start + top + 16, y + top + 16)); start = None
    if start is not None: runs.append((start + top + 16, len(rows) + top + 16))
    meta, title = runs[-1], (runs[0][0], runs[-2][1])
    def crop_band(x0, x1, y0, y1):
        m = np.abs(a[y0:y1, x0:x1, :3] - np.array(ORANGE[:3])).sum(axis=2) > 60
        return bbox(m, x0, y0)
    return {
        "circle": circle,
        "title": crop_band(220, 810, *title),
        "user": crop_band(220, 640, *meta),
        "likes": crop_band(680, 805, *meta),
    }

parts = [pieces(t, b) for t, b in CARDS]
ref = parts[1]  # the middle card sets the layout
mid_top = CARDS[1][0]
pos = {
    "circle_cy": (ref["circle"][1] + ref["circle"][3]) / 2 - mid_top,
    "title_y": ref["title"][1] - mid_top,
    "title_x": min(p["title"][0] for p in parts),
    "user_cy": (ref["user"][1] + ref["user"][3]) / 2 - mid_top,
    "user_x": min(p["user"][0] for p in parts),
    "likes_right": max(p["likes"][2] for p in parts),
}

height = CARDS[0][0] + 3 * CARD_H + 2 * GAP + (src.height - 1 - CARDS[2][1])
out = Image.new("RGBA", (src.width, height), (0, 0, 0, 0))
out.alpha_composite(src.crop((0, 0, src.width, CARDS[0][0])), (0, 0))  # the heading, untouched

def card_shape(w, h):
    s = 4
    m = Image.new("L", (w * s, h * s), 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, w * s - 1, h * s - 1), radius=RADIUS * s, fill=255)
    tile = Image.new("RGBA", (w, h), ORANGE)
    tile.putalpha(m.resize((w, h), Image.LANCZOS))
    return tile

def paste(box, x, y):
    piece = src.crop(box)
    out.alpha_composite(piece, (int(round(x)), int(round(y))))

for i, p in enumerate(parts):
    top = CARDS[0][0] + i * (CARD_H + GAP)
    out.alpha_composite(card_shape(RIGHT - LEFT + 1, CARD_H), (LEFT, top))
    c = p["circle"]; paste(c, c[0], top + pos["circle_cy"] - (c[3] - c[1]) / 2)
    t = p["title"]; paste(t, pos["title_x"], top + pos["title_y"])
    u = p["user"]; paste(u, pos["user_x"], top + pos["user_cy"] - (u[3] - u[1]) / 2)
    l = p["likes"]; paste(l, pos["likes_right"] - (l[2] - l[0]), top + pos["user_cy"] - (l[3] - l[1]) / 2)

out.save(sys.argv[2])
print("saved", out.size)

"""Builds every Clowk brand SVG in brand/svg from the rules in brand/README.md.

    python3 brand/tools/build.py

The mark is drawn on a 200 unit grid. The wordmark paths come from
wordmark.json (see outline_wordmark.py).
"""

import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SVG = ROOT / 'svg'
TEXTS = json.loads((ROOT / 'tools' / 'wordmark.json').read_text())

INK = '#0B0B0F'
NIGHT = '#0C0014'
CORAL = '#F43F5E'
CREAM = '#FFF4EC'
WHITE = '#FFFFFF'
MUTED = '#C9C3D4'

HOOD = 'M100 14 C128 36 168 80 172 134 C175 168 162 186 140 186 L60 186 C38 186 25 168 28 134 C32 80 72 36 100 14 Z'
HOOD_SMALL = 'M100 10 C130 34 172 80 176 136 C179 172 164 190 140 190 L60 190 C36 190 21 172 24 136 C28 80 70 34 100 10 Z'
FOLD = 'M100 14 C95 42 84 64 64 88'
SMILE = 'M93 143 Q100 150 107 143'

OUTLINE = 6
OUTLINE_SMALL = 14
HALO = 6


def mark(hood=CORAL, halo=None):
    """The primary drawing: hood, fold, face, eyes, cheeks and smile."""
    parts = []

    if halo:
        parts.append(f'<path d="{HOOD}" fill="none" stroke="{halo}" stroke-width="{OUTLINE + HALO * 2}" stroke-linejoin="round"/>')

    parts += [
        f'<path d="{HOOD}" fill="{hood}" stroke="{INK}" stroke-width="{OUTLINE}" stroke-linejoin="round"/>',
        f'<path d="{FOLD}" fill="none" stroke="{INK}" stroke-width="4" stroke-linecap="round" opacity="0.28"/>',
        f'<ellipse cx="100" cy="128" rx="44" ry="38" fill="{CREAM}" stroke="{INK}" stroke-width="{OUTLINE}"/>',
        f'<circle cx="84" cy="126" r="7" fill="{INK}"/>',
        f'<circle cx="116" cy="126" r="7" fill="{INK}"/>',
        f'<circle cx="86.5" cy="123.5" r="2.2" fill="{WHITE}"/>',
        f'<circle cx="118.5" cy="123.5" r="2.2" fill="{WHITE}"/>',
        f'<ellipse cx="72" cy="142" rx="7" ry="4" fill="{CORAL}" opacity="0.5"/>',
        f'<ellipse cx="128" cy="142" rx="7" ry="4" fill="{CORAL}" opacity="0.5"/>',
        f'<path d="{SMILE}" fill="none" stroke="{INK}" stroke-width="4" stroke-linecap="round"/>',
    ]

    return '\n  '.join(parts)


def mark_small(hood=CORAL, halo=None):
    """The small drawing for 32 px and below: no fold, cheeks or smile."""
    parts = []

    if halo:
        parts.append(f'<path d="{HOOD_SMALL}" fill="none" stroke="{halo}" stroke-width="{OUTLINE_SMALL + HALO * 2}" stroke-linejoin="round"/>')

    parts += [
        f'<path d="{HOOD_SMALL}" fill="{hood}" stroke="{INK}" stroke-width="{OUTLINE_SMALL}" stroke-linejoin="round"/>',
        f'<ellipse cx="100" cy="132" rx="50" ry="42" fill="{CREAM}" stroke="{INK}" stroke-width="{OUTLINE_SMALL}"/>',
        f'<circle cx="80" cy="130" r="13" fill="{INK}"/>',
        f'<circle cx="120" cy="130" r="13" fill="{INK}"/>',
    ]

    return '\n  '.join(parts)


def mark_tiny():
    """The tiny drawing for the 16 px favicon tile: flat shapes, no outline."""
    return '\n  '.join([
        f'<path d="{HOOD_SMALL}" fill="{CORAL}"/>',
        f'<ellipse cx="100" cy="134" rx="56" ry="46" fill="{CREAM}"/>',
        f'<circle cx="78" cy="132" r="15" fill="{INK}"/>',
        f'<circle cx="122" cy="132" r="15" fill="{INK}"/>',
    ])


def mark_mono(color):
    """One color: the hood with the face cut out, and the eyes inside the cut."""
    face = 'M56 128 A44 38 0 1 0 144 128 A44 38 0 1 0 56 128 Z'

    return '\n  '.join([
        f'<path d="{HOOD} {face}" fill="{color}" fill-rule="evenodd"/>',
        f'<circle cx="84" cy="126" r="8" fill="{color}"/>',
        f'<circle cx="116" cy="126" r="8" fill="{color}"/>',
    ])


def svg(view_box, body, width=None, height=None, label='Clowk'):
    size = f' width="{width}" height="{height}"' if width else ''

    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view_box}"{size} role="img" aria-label="{label}">\n'
        f'  {body}\n'
        '</svg>\n'
    )


def text(name, color, scale, x, baseline):
    entry = TEXTS[name]
    left = entry['bounds'][0]

    return f'<path transform="translate({x - left * scale:.2f} {baseline}) scale({scale})" fill="{color}" d="{entry["path"]}"/>'


def text_width(name, scale):
    left, _, right, _ = TEXTS[name]['bounds']

    return (right - left) * scale


def text_top(name, scale):
    return -TEXTS[name]['bounds'][1] * scale


def write(name, content):
    (SVG / f'{name}.svg').write_text(content)


def marks():
    write('mark-on-light', svg('0 0 200 200', mark()))
    write('mark-on-dark', svg('0 0 200 200', mark(halo=WHITE)))
    write('mark-small-on-light', svg('0 0 200 200', mark_small()))
    write('mark-small-on-dark', svg('0 0 200 200', mark_small(halo=WHITE)))
    write('mark-ink', svg('0 0 200 200', mark_mono(INK)))
    write('mark-white', svg('0 0 200 200', mark_mono(WHITE)))
    write('favicon', svg('0 0 200 200', mark_small()))


def icon(background, body, scale=0.74):
    offset = (1 - scale) * 512 / 2

    return svg(
        '0 0 512 512',
        f'<rect width="512" height="512" rx="114" fill="{background}"/>\n'
        f'  <g transform="translate({offset} {offset + 6}) scale({512 * scale / 200})">\n  {body}\n  </g>'
    )


def icons():
    write('app-icon-night', icon(NIGHT, mark(halo=WHITE)))
    write('app-icon-coral', icon(CORAL, mark(hood=NIGHT)))
    write('app-icon-light', icon(WHITE, mark()))
    write('app-icon-square', svg('0 0 512 512', f'<rect width="512" height="512" fill="{NIGHT}"/>\n  <g transform="translate(66 72) scale(1.9)">\n  {mark(halo=WHITE)}\n  </g>'))
    write('favicon-tile', svg('0 0 64 64', f'<rect width="64" height="64" rx="14" fill="{NIGHT}"/>\n  <g transform="translate(5 4) scale(0.27)">\n  {mark_tiny()}\n  </g>'))


WORD_SCALE = 0.149
WORD_GAP = 28
BASELINE = 172


def wordmarks():
    width = text_width('wordmark', WORD_SCALE)
    top = text_top('wordmark', WORD_SCALE)
    box = f'0 0 {width:.1f} {top + 4:.1f}'

    for tone, color in (('light', INK), ('dark', WHITE)):
        write(f'wordmark-on-{tone}', svg(box, text('wordmark', color, WORD_SCALE, 0, top), label='clowk'))


def lockups():
    width = text_width('wordmark', WORD_SCALE)
    total = 200 + WORD_GAP + width

    for tone, color, drawing in (('light', INK, mark()), ('dark', WHITE, mark(halo=WHITE))):
        body = f'<g>\n  {drawing}\n  </g>\n  ' + text('wordmark', color, WORD_SCALE, 200 + WORD_GAP, BASELINE)
        write(f'lockup-on-{tone}', svg(f'14 0 {total - 14 + 8:.1f} 200', body))

    stacked_scale = 0.17
    stacked_width = text_width('wordmark', stacked_scale)
    stacked_top = text_top('wordmark', stacked_scale)
    side = max(stacked_width, 200) + 40
    mark_x = (side - 200) / 2
    word_x = (side - stacked_width) / 2
    baseline = 210 + stacked_top

    for tone, color, drawing in (('light', INK, mark()), ('dark', WHITE, mark(halo=WHITE))):
        body = f'<g transform="translate({mark_x:.1f} 0)">\n  {drawing}\n  </g>\n  ' + text('wordmark', color, stacked_scale, word_x, baseline)
        write(f'lockup-stacked-on-{tone}', svg(f'0 0 {side:.1f} {baseline + 8:.1f}', body))


def social_preview():
    word_scale = 0.22
    line_scale = 1008 / text_width('tagline', 1)
    small_scale = 0.034

    body = '\n  '.join([
        f'<rect width="1200" height="630" fill="{NIGHT}"/>',
        f'<g transform="translate(80 96) scale(1.1)">\n  {mark(halo=WHITE)}\n  </g>',
        text('wordmark', WHITE, word_scale, 332, 96 + BASELINE * 1.1),
        text('tagline', WHITE, line_scale, 96, 440),
        text('products', MUTED, small_scale, 96, 510),
        f'<rect x="96" y="548" width="72" height="6" rx="3" fill="{CORAL}"/>',
    ])

    write('social-preview', svg('0 0 1200 630', body, 1200, 630))


SVG.mkdir(exist_ok=True)

marks()
icons()
wordmarks()
lockups()
social_preview()

print(f'{len(list(SVG.glob("*.svg")))} SVG files in {SVG}')

import re

file_path = "/Users/polaroiddosa/Desktop/tac/camping/index.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Mapping of emojis (including potential variation selectors) to Lucide icon tags
# Using generic tags that can be styled via CSS if needed.
emoji_map = {
    "🏕️": '<i data-lucide="tent"></i>',
    "🏕": '<i data-lucide="tent"></i>',
    "🏆": '<i data-lucide="trophy"></i>',
    "📐": '<i data-lucide="ruler"></i>',
    "🔥": '<i data-lucide="flame"></i>',
    "📍": '<i data-lucide="map-pin"></i>',
    "📅": '<i data-lucide="calendar"></i>',
    "🗓": '<i data-lucide="calendar"></i>',
    "👥": '<i data-lucide="users"></i>',
    "⏰": '<i data-lucide="clock"></i>',
    "🔔": '<i data-lucide="bell"></i>',
    "✏️": '<i data-lucide="pencil"></i>',
    "✏": '<i data-lucide="pencil"></i>',
    "🌿": '<i data-lucide="leaf"></i>',
    "🛖": '<i data-lucide="home"></i>',
    "☕": '<i data-lucide="coffee"></i>',
    "💡": '<i data-lucide="lightbulb"></i>',
    "⛰️": '<i data-lucide="mountain"></i>',
    "⛰": '<i data-lucide="mountain"></i>',
    "✨": '<i data-lucide="sparkles"></i>',
    "🌌": '<i data-lucide="moon-star"></i>',
    "⛺": '<i data-lucide="tent"></i>',
    "🏛️": '<i data-lucide="landmark"></i>',
    "🏛": '<i data-lucide="landmark"></i>',
    "💚": '<i data-lucide="heart"></i>',
}

# Special case for favicon, replace the emoji in the svg string
# `<text y='0.9em' font-size='85'>🏕️</text>` -> change to an SVG icon or just remove the emoji from the favicon for now.
# Actually, Lucide doesn't render inside the SVG data URI easily unless we inline the paths.
# For the favicon, I'll replace it with a simple SVG path for a tent.
favicon_old = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='85'>🏕️</text></svg>"
favicon_new = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M3.5 21 14 3'/><path d='M20.5 21 10 3'/><path d='M15.5 21 12 15l-3.5 6'/><path d='M2 21h20'/></svg>"
content = content.replace(favicon_old, favicon_new)

# Replace all other emojis
for emoji, icon_html in emoji_map.items():
    content = content.replace(emoji, icon_html)

# Add Lucide script before closing body tag if not already there
if "lucide@latest" not in content:
    lucide_script = '\n  <script src="https://unpkg.com/lucide@latest"></script>\n  <script>\n    lucide.createIcons();\n  </script>\n'
    content = content.replace('</body>', f'{lucide_script}</body>')

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Replaced emojis with Lucide icons.")

# jezper.se

## Mecenats kod

Behöver det här projektet läsa Mecenats repon (gomecenat, app-mecenat,
data-platform, solr, mecenat-web ...) finns de redan på neo, i EN enda kopia:

    ~/Projects/Claude/Neo/_ref/        (även `./_ref/` härifrån)

**Klona aldrig om ett Mecenat-repo till det här projektet.** Läs från hyllan.
Behöver projektet en egen gren att ändra i, skapa en arbetskopia som delar
hyllans historik och alltså bara kostar filerna:

    ~/.claude/ref.sh worktree gomecenat <gren> [målmapp]

`~/.claude/ref.sh list` visar vad som finns, `~/.claude/ref.sh update` hämtar senaste.

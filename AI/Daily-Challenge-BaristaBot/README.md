# BaristaBot

Open **BaristaBot.ipynb** in Kaggle or Colab and run its cells in order. It is self-contained and covers the twelve lesson steps, four graph stages, diagrams and offline tests. Add GOOGLE_API_KEY through notebook secrets (not source code). Never commit a key.

For a local run:

```sh
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python -m unittest -v
python baristabot.py
```

Set GOOGLE_API_KEY in your environment before the final command. GEMINI_MODEL overrides the default gemini-2.5-flash. Account availability and quota may differ. The supplied stable model ID is documented by Google; the lesson's `-latest` suffix is not used.

The simulated kitchen requires a nonempty order and explicit confirmation of the exact items. Edits invalidate confirmation. Quitting never submits. Menu lookups use ToolNode, including mixed menu/order tool batches. Mutable state is scoped to each graph invocation. State is not persisted across restarts.

Offline tests use actual compiled graphs and scripted model messages. No live Gemini request was tested without an API key. Diagram PNG rendering requires network access; Mermaid text is also printed. Special requests outside the listed examples are referred to staff.

langgraph-prebuilt is pinned to 1.0.5 because newer prebuilt releases import runtime symbols absent in langgraph 1.0.5. Six offline tests passed.

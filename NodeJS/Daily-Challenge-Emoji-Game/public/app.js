const byId = id => document.getElementById(id);
let token = "";
let questionId = "";
async function api(url, method = "GET", data) {
  const response = await fetch(url, { method, headers: { "Content-Type": "application/json", Authorization: token }, body: data ? JSON.stringify(data) : undefined });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error);
  return result;
}
async function leaders() {
  try {
    const scores = await api("/api/leaderboard");
    byId("leaders").replaceChildren();
    for (const p of scores) {
      const li = document.createElement("li");
      li.textContent = `${p.name}: ${p.score} points (${p.played} guesses)`;
      byId("leaders").append(li);
    }
    byId("board-status").textContent = scores.length ? "" : "Be the first to score!";
  } catch { byId("board-status").textContent = "Leaderboard unavailable."; }
}
async function question() {
  byId("submit").disabled = true;
  byId("choices").disabled = true;
  byId("next").disabled = true;
  try {
    const q = await api("/api/question");
    questionId = q.id;
    byId("emoji").textContent = q.emoji;
    byId("score").textContent = `Score: ${q.score} / ${q.played}`;
    byId("options").replaceChildren();
    for (const option of q.options) {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio"; input.name = "guess"; input.value = option; input.required = true;
      label.append(input, document.createTextNode(` ${option}`));
      byId("options").append(label);
    }
    byId("feedback").textContent = "";
    byId("next").hidden = true;
    byId("submit").disabled = false;
    byId("choices").disabled = false;
  } catch (e) { byId("feedback").textContent = e.message; byId("next").hidden = false; }
  finally { byId("next").disabled = false; }
}
byId("start").addEventListener("submit", async e => {
  e.preventDefault();
  const button = e.target.querySelector("button"); button.disabled = true;
  try {
    const data = await api("/api/start", "POST", { name: byId("name").value });
    token = data.token; byId("start").hidden = true; byId("game").hidden = false;
    await question();
  } catch (e) { byId("feedback").textContent = e.message; }
  finally { button.disabled = false; }
});
byId("guess").addEventListener("submit", async e => {
  e.preventDefault();
  const guess = new FormData(e.target).get("guess");
  byId("submit").disabled = true; byId("choices").disabled = true;
  try {
    const result = await api("/api/guess", "POST", { questionId, guess });
    byId("feedback").textContent = result.correct ? "Correct! One point for you." : `Not quite! The answer is ${result.answer}.`;
    byId("score").textContent = `Score: ${result.score} / ${result.played}`;
    await leaders();
  } catch (e) { byId("feedback").textContent = e.message; }
  finally { byId("next").hidden = false; }
});
byId("next").addEventListener("click", question);
leaders();

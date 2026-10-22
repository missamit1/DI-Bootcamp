const keyForm = document.getElementById("key-form");
const keyInput = document.getElementById("api-key");
const converterForm = document.getElementById("converter-form");
const controls = document.getElementById("controls");
const from = document.getElementById("from");
const to = document.getElementById("to");
const amount = document.getElementById("amount");
const status = document.getElementById("status");
const result = document.getElementById("result");
const rate = document.getElementById("rate");
let apiKey = "";
let ready = false;

function clearResult() {
  result.textContent = "";
  rate.textContent = "";
}

function setBusy(busy) {
  controls.disabled = busy || !ready;
  keyInput.disabled = busy;
  keyForm.querySelector("button").disabled = busy;
}

async function fetchData(endpoint) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${encodeURIComponent(apiKey)}/${endpoint}`, { signal: controller.signal });
    const data = await response.json();
    if (!response.ok || data.result !== "success") {
      const errors = {
        "invalid-key": "Invalid API key. Enter a valid key and load currencies again.",
        "inactive-account": "Confirm your ExchangeRate-API email address first.",
        "quota-reached": "Your API request quota has been reached. Try again later.",
        "unsupported-code": "This currency is not supported.",
      };
      throw new Error(errors[data["error-type"]] || "The exchange rate service is unavailable. Please try again.");
    }
    return data;
  } finally {
    clearTimeout(timeout);
  }
}

function showError(error) {
  clearResult();
  status.textContent = error.name === "AbortError"
    ? "The request timed out. Please try again."
    : error instanceof TypeError || error instanceof SyntaxError
      ? "Could not connect to the exchange rate service. Please try again."
      : error.message;
}

keyForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const enteredKey = keyInput.value.trim();
  if (!enteredKey) {
    status.textContent = "Please enter your API key.";
    return;
  }
  apiKey = enteredKey;
  ready = false;
  setBusy(true);
  clearResult();
  from.replaceChildren();
  to.replaceChildren();
  status.textContent = "Loading currencies...";
  try {
    const data = await fetchData("codes");
    if (!Array.isArray(data.supported_codes) || data.supported_codes.length === 0) {
      throw new Error("No supported currencies were returned. Please try again.");
    }
    for (const [code, name] of data.supported_codes) {
      from.add(new Option(`${code} — ${name}`, code));
      to.add(new Option(`${code} — ${name}`, code));
    }
    from.value = data.supported_codes.some(([code]) => code === "USD") ? "USD" : from.options[0].value;
    to.value = data.supported_codes.some(([code]) => code === "ILS") ? "ILS" : to.options[0].value;
    ready = true;
    keyInput.value = "";
    keyInput.required = false;
    keyInput.placeholder = "Key loaded — enter another to change it";
    status.textContent = "Choose currencies and enter an amount.";
  } catch (error) {
    showError(error);
  } finally {
    setBusy(false);
  }
});

async function convert() {
  if (!ready || !converterForm.reportValidity()) return;
  const value = amount.valueAsNumber;
  if (!Number.isFinite(value) || value < 0) {
    status.textContent = "Please enter a valid, non-negative amount.";
    return;
  }
  clearResult();
  setBusy(true);
  status.textContent = "Converting...";
  try {
    const data = await fetchData(`pair/${from.value}/${to.value}`);
    const converted = value * data.conversion_rate;
    if (!Number.isFinite(data.conversion_rate) || data.conversion_rate <= 0 || !Number.isFinite(converted)) {
      throw new Error("Could not calculate this amount. Please try again.");
    }
    result.textContent = `${new Intl.NumberFormat("en-US", { maximumFractionDigits: 6 }).format(converted)} ${to.value}`;
    rate.textContent = `1 ${from.value} = ${data.conversion_rate} ${to.value}`;
    status.textContent = "Conversion complete.";
  } catch (error) {
    showError(error);
  } finally {
    setBusy(false);
  }
}

converterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  convert();
});
document.getElementById("switch").addEventListener("click", () => {
  [from.value, to.value] = [to.value, from.value];
  clearResult();
  convert();
});
converterForm.addEventListener("input", () => {
  clearResult();
  status.textContent = "Click Convert to update the result.";
});

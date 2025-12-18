function startRiddle() {
    document.getElementById("riddle-panel").classList.remove("hidden");
    document.getElementById("vault-message").textContent =
        "The vault hums... the divisor awaits transposition.";
}

function checkTranspose() {
    const val = Number(document.getElementById("transposeInput").value);
    const msg = document.getElementById("transpose-msg");

    if (val === -2) {
        msg.textContent = "Correct. The divisor flips.";
        msg.style.color = "#00ff66";
        document.getElementById("final-lock").classList.remove("hidden");
    } else {
        msg.textContent = "Incorrect. Think: 12 is close to which base?";
        msg.style.color = "#ff4d4d";
    }
}

function unlockVault() {
    const q = Number(document.getElementById("finalQ").value);
    const r = Number(document.getElementById("finalR").value);
    const msg = document.getElementById("final-msg");

    if (q === 11 && r === 68) {
        msg.textContent = "Balance restored.";
        msg.style.color = "#00ff66";
        document.getElementById("success-panel").classList.remove("hidden");
    } else {
        msg.textContent =
            "The vault rejects the correction. Re-evaluate the remainder.";
        msg.style.color = "#ff4d4d";
    }
}

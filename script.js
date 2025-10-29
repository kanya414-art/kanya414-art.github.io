document.getElementById("calcBtn").addEventListener("click", () => {
  const V = parseFloat(document.getElementById("voltage").value);
  const I = parseFloat(document.getElementById("current").value);
  const L = parseFloat(document.getElementById("distance").value);

  if (isNaN(V) || isNaN(I) || isNaN(L)) {
    alert("すべての値を入力してください！");
    return;
  }

  // 電圧降下計算 (参考：単相2線式、銅線、抵抗率0.017)
  const rho = 0.017; // Ωmm2/m
  const allowableDrop = V * 0.02; // 許容電圧降下（2%）
  const requiredS = (2 * rho * L * I) / allowableDrop; // 必要断面積(mm2)

  let wireSize;
  if (requiredS <= 1.25) wireSize = "1.25 mm²（VVF1.6）";
  else if (requiredS <= 2.0) wireSize = "2.0 mm²（VVF2.0）";
  else if (requiredS <= 3.5) wireSize = "3.5 mm²";
  else if (requiredS <= 5.5) wireSize = "5.5 mm²";
  else wireSize = "8.0 mm²以上";

  document.getElementById("result").innerHTML = `
    <p>必要断面積: ${requiredS.toFixed(2)} mm²</p>
    <p>推奨電線サイズ: <strong>${wireSize}</strong></p>
  `;
});

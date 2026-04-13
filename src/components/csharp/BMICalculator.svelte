<!-- /src/components/csharp/BMICalculator.svelte -->
<script>
  import imgClassification  from '../../assets/images/projects/csharp/Classification.png'
  import imgUnderWeight     from '../../assets/images/projects/csharp/UnderWeight.png'
  import imgNormalWeight    from '../../assets/images/projects/csharp/Normal Weight.png'
  import imgOverWeight      from '../../assets/images/projects/csharp/OverWeight.png'
  import imgObesity         from '../../assets/images/projects/csharp/Obesity.png'
  import imgExtremeObesity  from '../../assets/images/projects/csharp/Extreme Obesity.png'

  let weight = '';
  let height = '';
  let bmi = null;
  let category = '';

  const categories = [
    { key: 'underweight', label: 'UnderWeight',     range: '<18,5'   },
    { key: 'normal',      label: 'Normal Weight',   range: '18,5-25' },
    { key: 'overweight',  label: 'OverWeight',      range: '25-30'   },
    { key: 'obese',       label: 'Obesity',         range: '30-35'   },
    { key: 'extreme',     label: 'Extreme Obesity', range: '35-40'   },
  ]

  const silhouetteImg = {
    '':            imgClassification,
    underweight:   imgUnderWeight,
    normal:        imgNormalWeight,
    overweight:    imgOverWeight,
    obese:         imgObesity,
    extreme:       imgExtremeObesity,
  }

  function getKey(bmiVal) {
    if (bmiVal < 18.5) return 'underweight'
    if (bmiVal < 25)   return 'normal'
    if (bmiVal < 30)   return 'overweight'
    if (bmiVal < 35)   return 'obese'
    return 'extreme'
  }

  function calculateBMI() {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!w || !h || w <= 0 || h <= 0) return;
    const hm = h / 100;
    const result = w / (hm * hm);
    bmi = result;
    category = getKey(result);
  }

  function clear() {
    weight = '';
    height = '';
    bmi = null;
    category = '';
  }
</script>

<div class="app">
  <!-- LEFT -->
  <div class="left">
    <h1 class="title">Body Mass Index BMI</h1>

    <div class="field">
      <label>Weight</label>
      <div class="input-row">
        <input type="number" bind:value={weight} placeholder="" min="1" />
        <span class="unit">in Kg</span>
      </div>
    </div>

    <div class="field">
      <label>Height</label>
      <div class="input-row">
        <input type="number" bind:value={height} placeholder="" min="1" />
        <span class="unit">in cm</span>
      </div>
    </div>

    <div class="btn-row">
      <button class="btn-calc" on:click={calculateBMI}>Calculate BMI</button>
      <button class="btn-clear" on:click={clear}>Clear</button>
    </div>

    <div class="result-section">
      <span class="result-label">Result</span>
      {#if bmi !== null}
        <p class="result-value">BMI= {bmi.toFixed(3)}</p>
        <p class="result-cat">your category is:<br/><strong>{categories.find(c => c.key === category)?.label}</strong></p>
      {/if}
    </div>

    <!-- Formula -->
    <div class="formula">
      <div class="formula-inner">
        <span class="formula-lhs">BMI =</span>
        <div class="fraction">
          <span class="numerator">Weight (kg)</span>
          <span class="fraction-line"></span>
          <span class="denominator">Height ² (m²)</span>
        </div>
      </div>
    </div>
  </div>

  <!-- RIGHT -->
  <div class="right">
    <!-- Silhouettes -->
    <div class="silhouettes">
      <img src={silhouetteImg[category]} alt="BMI silhouette" class="sil-img" />
    </div>

    <!-- Table -->
    <table class="bmi-table">
      <thead>
        <tr>
          <th>Classification</th>
          <th>BMI Rang -Kg/m2</th>
        </tr>
      </thead>
      <tbody>
        {#each categories as cat}
          <tr class:row-active={category === cat.key}>
            <td>{cat.label}</td>
            <td>{cat.range}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  .app {
    display: flex;
    gap: 2rem;
    background: #4a7a1e;
    min-height: 100%;
    padding: 1.5rem 2rem;
    font-family: 'Segoe UI', sans-serif;
    color: white;
    box-sizing: border-box;
  }

  /* LEFT */
  .left {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 0 0 280px;
  }

  .title {
    font-size: 1.4rem;
    font-weight: 800;
    color: white;
    margin: 0 0 .5rem;
    text-decoration: underline;
    font-style: italic;
  }

  .field { display: flex; flex-direction: column; gap: .3rem; }

  .field label {
    font-size: .95rem;
    font-weight: 600;
  }

  .input-row {
    display: flex;
    align-items: center;
    gap: .5rem;
  }

  .input-row input {
    width: 140px;
    padding: .4rem .6rem;
    font-size: .95rem;
    background: white;
    border: 2px solid #ccc;
    border-radius: 2px;
    color: #000;
    outline: none;
  }

  .unit {
    font-size: .85rem;
    background: #d4edda;
    color: #1a5c1a;
    padding: .3rem .6rem;
    border: 1px solid #aaa;
    border-radius: 2px;
    white-space: nowrap;
  }

  .btn-row { display: flex; gap: .75rem; margin-top: .25rem; }

  .btn-calc {
    padding: .55rem 1.2rem;
    background: #5cb85c;
    border: 2px solid #3a7a3a;
    border-radius: 4px;
    color: white;
    font-size: .95rem;
    font-weight: 700;
    cursor: pointer;
    transition: background .15s;
    box-shadow: 0 2px 4px rgba(0,0,0,.3);
  }
  .btn-calc:hover { background: #4cae4c; }

  .btn-clear {
    padding: .55rem 1.2rem;
    background: #d9534f;
    border: 2px solid #a02020;
    border-radius: 20px;
    color: white;
    font-size: .95rem;
    font-weight: 700;
    cursor: pointer;
    transition: background .15s;
    box-shadow: 0 2px 4px rgba(0,0,0,.3);
  }
  .btn-clear:hover { background: #c9302c; }

  .result-section {
    display: flex;
    flex-direction: column;
    gap: .2rem;
    min-height: 60px;
  }

  .result-label {
    font-size: .9rem;
    font-weight: 600;
    text-decoration: underline;
  }

  .result-value {
    margin: 0;
    font-size: .95rem;
    font-weight: 600;
  }

  .result-cat {
    margin: 0;
    font-size: .85rem;
    line-height: 1.5;
  }

  /* Formula box */
  .formula {
    margin-top: auto;
    background: white;
    border: 2px solid #888;
    border-radius: 4px;
    padding: 1rem 1.25rem;
    display: inline-flex;
  }

  .formula-inner {
    display: flex;
    align-items: center;
    gap: .75rem;
  }

  .formula-lhs {
    font-size: 1.1rem;
    font-weight: 700;
    color: #000;
  }

  .fraction {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    color: #000;
  }

  .numerator, .denominator {
    font-size: .85rem;
    font-weight: 600;
    white-space: nowrap;
  }

  .fraction-line {
    width: 100%;
    height: 2px;
    background: #000;
  }

  /* RIGHT */
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  /* Silhouettes */
  .silhouettes {
    display: flex;
    gap: .5rem;
    justify-content: center;
    background: white;
    border: 2px solid #888;
    border-radius: 4px;
    padding: .75rem;
  }

  .sil-img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: contain;
  }

  /* Table */
  .bmi-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border: 2px solid #888;
    color: #000;
  }

  .bmi-table th {
    background: #3a7abd;
    color: white;
    padding: .5rem .75rem;
    font-size: .85rem;
    text-align: left;
    border: 1px solid #555;
  }

  .bmi-table td {
    padding: .45rem .75rem;
    font-size: .85rem;
    border: 1px solid #ccc;
  }

  .bmi-table tr:nth-child(even) td { background: #f5f5f5; }
  .bmi-table tr:nth-child(odd)  td { background: white; }

  .bmi-table tr.row-active td {
    background: #5cb85c !important;
    color: white;
    font-weight: 700;
  }
</style>

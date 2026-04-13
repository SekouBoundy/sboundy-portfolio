<script>
  let gender = '';
  let year   = '';
  let month  = '';
  let day    = '';
  let result = null;

  const months = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  function calculate() {
    if (!gender || !year || !month || !day) return;
    const birthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const now = new Date();
    if (isNaN(birthDate.getTime()) || birthDate > now) return;

    const bornOn = days[birthDate.getDay()];
    let years   = now.getFullYear() - birthDate.getFullYear();
    let months_ = now.getMonth()    - birthDate.getMonth();
    let days_   = now.getDate()     - birthDate.getDate();
    const hours_ = now.getHours();

    if (days_ < 0) { months_--; days_ += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (months_ < 0) { years--; months_ += 12; }

    const today = `${days[now.getDay()]} ${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;
    result = { gender, bornOn, years, months: months_, days: days_, hours: hours_, today };
  }

  function clear_() {
    gender = ''; year = ''; month = ''; day = ''; result = null;
  }
</script>

<div class="app">
  <h1>Age Calculator</h1>

  <div class="form-area">
    <div class="fields">
      <!-- Gender -->
      <div class="row">
        <span class="lbl">Your Gender:</span>
        <label class="radio"><input type="radio" bind:group={gender} value="Man" /> Man</label>
        <label class="radio"><input type="radio" bind:group={gender} value="Feman" /> Feman</label>
      </div>

      <!-- Year -->
      <div class="row">
        <span class="lbl">Years you born:</span>
        <input class="txt" type="number" bind:value={year} placeholder="" min="1900" max="2025" />
      </div>

      <!-- Month -->
      <div class="row">
        <span class="lbl">Month you born:</span>
        <select class="txt" bind:value={month}>
          <option value="">Choose Month</option>
          {#each months as m, i}
            <option value={i + 1}>{m}</option>
          {/each}
        </select>
      </div>

      <!-- Day -->
      <div class="row">
        <span class="lbl">Day you born:</span>
        <input class="txt" type="number" bind:value={day} placeholder="" min="1" max="31" />
      </div>
    </div>

    <!-- Buttons -->
    <div class="btns">
      <button class="btn-calc" on:click={calculate}>calculate</button>
      <button class="btn-clear" on:click={clear_}>clear</button>
    </div>
  </div>

  <!-- Result popup -->
  {#if result}
    <div class="result-box">
      <!-- Silhouette -->
      <div class="avatar">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="white" stroke="#555" stroke-width="2"/>
          <!-- head -->
          <circle cx="50" cy="32" r="16" fill="#1a1a1a"/>
          <!-- shoulders / body -->
          <path d="M 14 100 Q 14 68 50 68 Q 86 68 86 100 Z" fill="#1a1a1a"/>
        </svg>
      </div>
      <div class="result-lines">
        <p>You are {result.gender}</p>
        <p>You were born on a {result.bornOn}</p>
        <p>You are {result.years} years, {result.months} months, {result.days} days, {result.hours} hours,</p>
        <p>Today is {result.today}</p>
      </div>
    </div>
  {/if}

  <!-- GitHub link -->
  <div class="footer">
    <a href="https://github.com/SekouBoundy/Age-calculator" target="_blank" rel="noopener noreferrer">
      ⬇️ Download Windows App
    </a>
  </div>
</div>

<style>
  .app {
    background: #c9a87c;
    min-height: 100%;
    padding: 2rem 3rem;
    font-family: 'Segoe UI', 'Arial Black', sans-serif;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    box-sizing: border-box;
  }

  h1 {
    font-size: 3rem;
    font-weight: 900;
    color: #000;
    margin: 0;
    text-align: center;
    letter-spacing: -1px;
  }

  .form-area {
    display: flex;
    gap: 2rem;
    align-items: flex-start;
  }

  .fields {
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
    flex: 1;
  }

  .row {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .lbl {
    font-size: 1.15rem;
    font-weight: 700;
    color: #000;
    width: 190px;
    flex-shrink: 0;
  }

  .radio {
    display: flex;
    align-items: center;
    gap: .35rem;
    font-size: 1.1rem;
    font-weight: 700;
    color: #000;
    cursor: pointer;
  }

  .radio input {
    width: 16px;
    height: 16px;
    cursor: pointer;
    accent-color: #e91e8c;
  }

  .txt {
    padding: .4rem .6rem;
    font-size: 1rem;
    background: white;
    border: 1.5px solid #999;
    border-radius: 2px;
    color: #000;
    outline: none;
    width: 180px;
    box-sizing: border-box;
  }

  .txt:focus { border-color: #0078d4; }

  select.txt option { background: white; color: #000; }

  /* Buttons column */
  .btns {
    display: flex;
    flex-direction: column;
    gap: .75rem;
    padding-top: 1.6rem;
  }

  .btn-calc {
    padding: .85rem 1.4rem;
    background: #e91e8c;
    border: 2px solid #c0176d;
    border-radius: 6px;
    color: white;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    letter-spacing: .03em;
    box-shadow: 2px 2px 4px rgba(0,0,0,.3);
    transition: background .15s;
  }
  .btn-calc:hover { background: #d4177f; }

  .btn-clear {
    padding: .85rem 1.4rem;
    background: #7b2fbf;
    border: 2px solid #5a1f8f;
    border-radius: 6px;
    color: white;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    letter-spacing: .03em;
    box-shadow: 2px 2px 4px rgba(0,0,0,.3);
    transition: background .15s;
  }
  .btn-clear:hover { background: #6a26a8; }

  /* Result box */
  .result-box {
    background: #add8e6;
    border: 1.5px solid #888;
    border-radius: 4px;
    padding: 1.25rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    box-shadow: 2px 2px 8px rgba(0,0,0,.2);
  }

  .avatar svg {
    width: 90px;
    height: 90px;
    flex-shrink: 0;
  }

  .result-lines {
    display: flex;
    flex-direction: column;
    gap: .55rem;
  }

  .result-lines p {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    color: #000;
  }

  /* Footer */
  .footer { text-align: center; }

  .footer a {
    display: inline-block;
    padding: .5rem 1.2rem;
    background: transparent;
    border: 1.5px solid #7a5c30;
    border-radius: 6px;
    color: #3a2a10;
    text-decoration: none;
    font-size: .85rem;
    font-weight: 600;
    transition: all .2s;
  }
  .footer a:hover { background: rgba(0,0,0,.08); }
</style>

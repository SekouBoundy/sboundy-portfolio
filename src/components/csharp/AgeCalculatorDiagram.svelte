<!-- Architecture / logic flow diagram for the Age Calculator project -->
<div class="diag-wrap">
  <p class="diag-title">ARCHITECTURE DIAGRAM</p>

  <svg viewBox="0 0 760 320" xmlns="http://www.w3.org/2000/svg" class="diag-svg" aria-label="Age Calculator architecture diagram">
    <defs>
      <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L8,3 z" fill="#8b5cf6" />
      </marker>
    </defs>

    <!-- ── LAYER LABELS ── -->
    <text x="10" y="18" class="layer-lbl">UI LAYER</text>
    <text x="10" y="138" class="layer-lbl">LOGIC LAYER</text>
    <text x="10" y="258" class="layer-lbl">OUTPUT LAYER</text>

    <!-- ── ROW 1 — Inputs ── -->
    <!-- Gender -->
    <rect x="60"  y="28" width="110" height="44" rx="6" class="box box-input" />
    <text x="115" y="46" class="box-head">Gender</text>
    <text x="115" y="62" class="box-sub">Radio buttons</text>

    <!-- Birth Year -->
    <rect x="195" y="28" width="110" height="44" rx="6" class="box box-input" />
    <text x="250" y="46" class="box-head">Birth Year</text>
    <text x="250" y="62" class="box-sub">Number input</text>

    <!-- Birth Month -->
    <rect x="330" y="28" width="110" height="44" rx="6" class="box box-input" />
    <text x="385" y="46" class="box-head">Birth Month</text>
    <text x="385" y="62" class="box-sub">Select / ComboBox</text>

    <!-- Birth Day -->
    <rect x="465" y="28" width="110" height="44" rx="6" class="box box-input" />
    <text x="520" y="46" class="box-head">Birth Day</text>
    <text x="520" y="62" class="box-sub">Number input</text>

    <!-- Calculate button -->
    <rect x="600" y="28" width="110" height="44" rx="22" class="box box-btn" />
    <text x="655" y="55" class="box-btn-txt">calculate()</text>

    <!-- arrows row1 → validate -->
    <line x1="115" y1="72" x2="115" y2="105" class="arr" marker-end="url(#arr)" />
    <line x1="250" y1="72" x2="250" y2="105" class="arr" marker-end="url(#arr)" />
    <line x1="385" y1="72" x2="385" y2="105" class="arr" marker-end="url(#arr)" />
    <line x1="520" y1="72" x2="520" y2="105" class="arr" marker-end="url(#arr)" />
    <line x1="655" y1="72" x2="655" y2="90"  class="arr" />
    <line x1="655" y1="90" x2="520" y2="90"  class="arr" />
    <!-- connects to validate box via the 520 arrow above -->

    <!-- ── ROW 2 — Validate ── -->
    <rect x="155" y="110" width="140" height="44" rx="6" class="box box-validate" />
    <text x="225" y="128" class="box-head">Validate inputs</text>
    <text x="225" y="144" class="box-sub">all filled? date valid? ≤ today?</text>

    <!-- invalid path -->
    <line x1="155" y1="132" x2="80"  y2="132" class="arr arr-warn" marker-end="url(#arr-warn)" />
    <text x="20" y="129" class="warn-lbl">early</text>
    <text x="20" y="143" class="warn-lbl">return</text>

    <defs>
      <marker id="arr-warn" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L8,3 z" fill="#f59e0b" />
      </marker>
    </defs>

    <!-- valid arrow down -->
    <line x1="225" y1="154" x2="225" y2="185" class="arr" marker-end="url(#arr)" />

    <!-- ── ROW 3 — Date math ── -->
    <!-- new Date() -->
    <rect x="60"  y="190" width="120" height="44" rx="6" class="box box-logic" />
    <text x="120" y="208" class="box-head">new Date()</text>
    <text x="120" y="224" class="box-sub">birthDate + now</text>

    <!-- Day borrowing -->
    <rect x="205" y="190" width="140" height="44" rx="6" class="box box-logic" />
    <text x="275" y="208" class="box-head">Day borrow</text>
    <text x="275" y="224" class="box-sub">days_ &lt; 0 → fix month</text>

    <!-- Month borrowing -->
    <rect x="365" y="190" width="150" height="44" rx="6" class="box box-logic" />
    <text x="440" y="208" class="box-head">Month borrow</text>
    <text x="440" y="224" class="box-sub">months_ &lt; 0 → fix year</text>

    <!-- DayOfWeek -->
    <rect x="535" y="190" width="130" height="44" rx="6" class="box box-logic" />
    <text x="600" y="208" class="box-head">DayOfWeek</text>
    <text x="600" y="224" class="box-sub">birthDate.getDay()</text>

    <!-- arrows from validate to date math row -->
    <line x1="120" y1="185" x2="120" y2="190" class="arr" />
    <line x1="225" y1="185" x2="275" y2="190" class="arr" marker-end="url(#arr)" />
    <line x1="275" y1="234" x2="440" y2="234" class="arr" />
    <line x1="440" y1="234" x2="440" y2="190" class="arr" marker-end="url(#arr)" />
    <line x1="600" y1="185" x2="600" y2="190" class="arr" marker-end="url(#arr)" />

    <!-- link from validate to new Date -->
    <line x1="155" y1="190" x2="120" y2="190" class="arr" />

    <!-- ── ROW 4 — Outputs ── -->
    <!-- result object -->
    <rect x="130" y="268" width="160" height="44" rx="6" class="box box-output" />
    <text x="210" y="286" class="box-head">result object</text>
    <text x="210" y="302" class="box-sub">years · months · days · hours</text>

    <!-- Avatar -->
    <rect x="315" y="268" width="120" height="44" rx="6" class="box box-output" />
    <text x="375" y="286" class="box-head">Avatar SVG</text>
    <text x="375" y="302" class="box-sub">driven by gender</text>

    <!-- Today string -->
    <rect x="460" y="268" width="150" height="44" rx="6" class="box box-output" />
    <text x="535" y="286" class="box-head">Today string</text>
    <text x="535" y="302" class="box-sub">Day DD-MM-YYYY</text>

    <!-- arrows to output row -->
    <line x1="275" y1="234" x2="210" y2="268" class="arr" marker-end="url(#arr)" />
    <line x1="120" y1="234" x2="210" y2="268" class="arr" marker-end="url(#arr)" />
    <line x1="375" y1="234" x2="375" y2="268" class="arr" marker-end="url(#arr)" />
    <line x1="535" y1="234" x2="535" y2="268" class="arr" marker-end="url(#arr)" />
  </svg>

  <!-- Legend -->
  <div class="legend">
    <span class="leg leg-input">Input</span>
    <span class="leg leg-validate">Validate</span>
    <span class="leg leg-logic">Date logic</span>
    <span class="leg leg-output">Output</span>
    <span class="leg leg-btn">Trigger</span>
  </div>
</div>

<style>
  .diag-wrap {
    background: rgba(255,255,255,.03);
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 10px;
    padding: .9rem 1rem;
    display: flex;
    flex-direction: column;
    gap: .65rem;
  }

  .diag-title {
    font-size: .6rem;
    font-weight: 700;
    letter-spacing: .12em;
    color: #8b5cf6;
    opacity: .85;
    margin: 0;
  }

  .diag-svg {
    width: 100%;
    height: auto;
  }

  /* SVG text classes */
  .layer-lbl {
    font-family: 'Segoe UI', sans-serif;
    font-size: 9px;
    font-weight: 700;
    fill: rgba(255,255,255,.25);
    letter-spacing: .1em;
  }

  .box-head {
    font-family: 'Segoe UI', sans-serif;
    font-size: 10px;
    font-weight: 700;
    text-anchor: middle;
    dominant-baseline: auto;
    fill: #fff;
  }

  .box-sub {
    font-family: 'Segoe UI', sans-serif;
    font-size: 8px;
    text-anchor: middle;
    dominant-baseline: auto;
    fill: rgba(255,255,255,.55);
  }

  .box-btn-txt {
    font-family: 'Segoe UI', sans-serif;
    font-size: 11px;
    font-weight: 700;
    text-anchor: middle;
    dominant-baseline: middle;
    fill: #fff;
  }

  .warn-lbl {
    font-family: 'Segoe UI', sans-serif;
    font-size: 8px;
    text-anchor: middle;
    fill: #f59e0b;
  }

  /* SVG rect classes */
  .box { stroke-width: 1.5; }

  .box-input    { fill: rgba(59,130,246,.18);  stroke: rgba(59,130,246,.5); }
  .box-validate { fill: rgba(245,158,11,.15);  stroke: rgba(245,158,11,.5); }
  .box-logic    { fill: rgba(139,92,246,.18);  stroke: rgba(139,92,246,.5); }
  .box-output   { fill: rgba(16,185,129,.15);  stroke: rgba(16,185,129,.5); }
  .box-btn      { fill: #8b5cf6;               stroke: #6d28d9; }

  /* SVG line classes */
  .arr      { stroke: #8b5cf6; stroke-width: 1.5; fill: none; }
  .arr-warn { stroke: #f59e0b; stroke-width: 1.5; fill: none; }

  /* Legend */
  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: .45rem;
  }

  .leg {
    font-size: .65rem;
    font-weight: 600;
    padding: 2px 10px;
    border-radius: 999px;
    border: 1px solid;
  }

  .leg-input    { background: rgba(59,130,246,.15);  border-color: rgba(59,130,246,.4);  color: #93c5fd; }
  .leg-validate { background: rgba(245,158,11,.12);  border-color: rgba(245,158,11,.4);  color: #fcd34d; }
  .leg-logic    { background: rgba(139,92,246,.15);  border-color: rgba(139,92,246,.4);  color: #c4b5fd; }
  .leg-output   { background: rgba(16,185,129,.12);  border-color: rgba(16,185,129,.4);  color: #6ee7b7; }
  .leg-btn      { background: rgba(139,92,246,.35);  border-color: #6d28d9;              color: #fff;    }
</style>

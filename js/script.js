
  const html = 
  `
    <h1>Whack-a-mole! <span class="score">0</span></h1>
    <div class="btn-div">
      <button onClick="startGame()" class="btn" >Start!</button>
    </div>

    <div class="game">
      <div class="hole hole1">
        <div class="mole"></div>
      </div>
      <div class="hole hole2">
        <div class="mole"></div>
      </div>
      <div class="hole hole3">
        <div class="mole"></div>
      </div>
      <div class="hole hole4">
        <div class="mole"></div>
      </div>
      <div class="hole hole5">
        <div class="mole"></div>
      </div>
      <div class="hole hole6">
        <div class="mole"></div>
      </div>
    </div>
  `;

  document.querySelector('body').innerHTML = html;

  const holes = document.querySelectorAll('.hole');
  const scoreBoard = document.querySelector('.score');
  const moles = document.querySelectorAll('.mole');

  let lastHole;
  let timeUp = false;
  let score = 0;

  function randomTime( max, min ) {
    return Math.round(  Math.random() * (max - min) + min );
  };

  function randomHole(holes){
    const idx = Math.floor( Math.random() * holes.length );
    const hole = holes[idx];

    if( hole === lastHole ) {
      console.log('REPETED!!!')
      return randomHole(holes);
    };

    lastHole = hole;

    return hole;
  }

  function peep(){
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);

    hole.classList.add('up')

    setTimeout( (  ) => {
      hole.classList.remove('up')
      if ( !timeUp ) peep();
    }, time);
  }

  function startGame (  ) {
    scoreBoard.textContent = 0;

    timeUp = false;

    score = 0;
    peep();

    setTimeout( () => timeUp = true, 10000)
  }

  function counterClick(e) {
    if( !e.isTrusted ) return;
    score++
    scoreBoard.textContent = score;

    this.classList.remove('up')
  };

  function optimize() {
    console.log('%c DOUBLE CLICK AGAIN NO!!!', 'font-size: 20px; color: red;')
    score--
  };

  moles.forEach( mole => mole.addEventListener('click', counterClick));
  moles.forEach( mole => mole.addEventListener('dblclick', optimize));
var gameState = 1; // Game State defines whether the game is in the menu 0, face off 1, and results 2
var rock, paper, scissors;
var p1, p2, p3;
var playerChoice, aichoice;
var activemm = true;


////////////////////////////////////////////////////////////////////////////////////////////////////
class cl_rock
{
    constructor (x, y, r)
    {
        this.active = false;
        this.x = x;
        this.y = y;
        this.r = r;
    }
    mt_rockUpdate () 
    {
        fill (255, 255, 255);
        circle (this.x, this.y, this.r);
        this.myDist = dist (this.x, this.y, mouseX, mouseY);

        if (this.myDist < this.r/2){
            this.active = true;
            if (this.active)
            {
                this.mt_onHighlight();
            }
        }else 
        {
            this.active = false;
        }
    }
    mt_onHighlight()
    {
        fill (255, 0, 0, 100);
        circle (this.x, this.y, this.r);
    }
    mt_onClick ()
    {
        this.active = false;
        playerChoice = 1;
        gameState = 2;
        clear ();
        this.mt_destroy();
    }
    mt_destroy()
    {
        this.active = null;
        this.x = null;
        this.y = null;
        this.r = null;
        rock = null;
    }
}

class cl_paper
{
    constructor (x, y, s)
    {
        this.active = false;
        this.x = x;
        this.y = y;
        this.s = s;
    }
    mt_paperUpdate () 
    {
        fill (255, 255, 255);
        square (this.x, this.y, this.s);
        if (
            (mouseX > this.x) && (mouseX < this.x+this.s) &&
            (mouseY > this.y) && (mouseY < this.y+this.s)
            )
        {
            this.active = true;
            if (this.active)
            {
                this.mt_onHighlight();
            }  
        } else 
        {
            this.active = false;
        }
    }
    mt_onHighlight()
    {
        fill (255, 0, 0, 100);
        square (this.x, this.y, this.s);
    }
    mt_onClick ()
    {
        this.active = false;
        playerChoice = 2;
        gameState = 2;
        clear ();
        this.mt_destroy();
    }
    mt_destroy()
    {
        this.active = null;
        this.x = null;
        this.y = null;
        this.s = null;
        paper = null;
    }
}

class cl_scissors
{
    constructor (p1, p2, p3)
    {
        this.active = false;
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
    }
    mt_scissorsUpdate ()
    {
        fill (255, 255, 255);
        triangle (p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
        this.isInside = this.mt_scisMouseCheck(this.p1, this.p2, this.p3);
        if (this.isInside && scissors != null)
        {
            this.active = true;
            if (this.active)
            {
                this.mt_onHighlight();
            }
        } else 
        {
            this.active = false;
        }
    }
    mt_scisMouseCheck(p1, p2, p3)
    {
        let b1 = this.mt_sign(mouseX, mouseY, p1.x, p1.y, p2.x, p2.y) < 0.0;
        let b2 = this.mt_sign(mouseX, mouseY, p2.x, p2.y, p3.x, p3.y) < 0.0;
        let b3 = this.mt_sign(mouseX, mouseY, p3.x, p3.y, p1.x, p1.y) < 0.0;

        return ((b1 == b2) && (b2 == b3));
    }
    mt_sign (mx, my, x1, y1, x2, y2)
    {
        return (mx - x2) * (y1 - y2) - (x1 - x2) * (my - y2);
    }
    mt_onHighlight()
    {
        fill (255, 0, 0, 100);
        triangle (p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
    }
    mt_onClick ()
    {
        this.active = false;
        playerChoice = 3;
        gameState = 2;
        clear ();
        this.mt_destroy();
    }
    mt_destroy()
    {
        this.active = null;
        this.p1 = null;
        this.p2 = null;
        this.p3 = null;
        this.isInside = null;
        scissors = null;
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////
function mouseClicked() {
    if (scissors != null)
    {
        if (scissors.active)
        {
            scissors.mt_onClick();
        }
    }
    if (rock != null)
    {
        if (rock.active)
        {
            rock.mt_onClick();
        }
    }
    if (paper != null)
    {
        if (paper.active)
        {
            paper.mt_onClick();
        }
    }
    clicked = true;
}
////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////
function fn_resultsDisplay(p, a, ppos, apos)
{
    fill (255, 255, 255);
    switch (true)
    {
        case (p === 1):
            circle(ppos.x, ppos.y, 150);
        break;
        case (p === 2):
            square(ppos.x - 75, ppos.y - 75, 150);
        break;
        case (p === 3):
            triangle (
                ppos.x - 75, ppos.y - 75,
                ppos.x + 75, ppos.y - 75,
                ppos.x, ppos.y + 75
            );
        break;
    }

    switch (true)
    {
        case (a === 1):
            circle(apos.x, apos.y, 150);
        break;
        case (a === 2):
            square(apos.x - 75, apos.y - 75, 150);
        break;
        case (a === 3):
            triangle (
                apos.x - 75, apos.y - 75,
                apos.x + 75, apos.y - 75,
                apos.x, apos.y + 75
            );
        break;

    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////
function fn_rockSetup ()
{
    rock = new cl_rock(133,300,150);
}

function fn_paperSetup ()
{
    paper = new cl_paper(324,225, 150);
}

function fn_scissorsSetup()
{
    p1 = createVector(590, 375);
    p2 = createVector(740, 375);
    p3 = createVector(665, 225);

    scissors = new cl_scissors(p1, p2, p3);
}
////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////
function setup ()
{
    createCanvas (800, 600);
}

function draw()
{
    background (100);
    switch (gameState)
    {
        case (1):
            fn_mainMenu();
        break;
        case (2):
            fn_results();
        break;
        default:
            fn_mainMenu();
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////
function fn_mainMenu ()
{
    if (activemm)
    {
        fn_rockSetup();
        fn_paperSetup();
        fn_scissorsSetup();
        activemm = false;
    }
    strokeWeight (2);
    rock.mt_rockUpdate();
    paper.mt_paperUpdate();
    scissors.mt_scissorsUpdate();

    fill(255);
    textSize(24);
    textAlign (CENTER, CENTER);
    text ('Rock', 113, 400, 40, 40);
    text ('Paper', 379, 400, 40, 40);
    text ('Scissors', 645, 400, 40, 40);
}
////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////
function fn_results()
{   
    clicked= false;
    aichoice = Math.floor(Math.random() * 3) + 1;

    let pRePos = createVector (133, 300);
    let aiPrePos = createVector (665, 300);

    fill(255);
    textSize(50);
    textAlign (CENTER, CENTER);

    switch (true)
    {
        case (playerChoice === 1 && aichoice === 3):
            text ('VS', 0, 200, 800, 200);
            text ('Player Wins!', 0, 400, 800, 200);
        break;
        case (playerChoice === 2 && aichoice === 1):
            text ('VS', 0, 200, 800, 200);
            text ('Player Wins!', 0, 400, 800, 200);
        break;
        case (playerChoice === 3 && aichoice === 2):
            text ('VS', 0, 200, 800, 200);
            text ('Player Wins!', 0, 400, 800, 200);
        break;
        case (playerChoice === aichoice):
            
            text ('VS', 0, 200, 800, 200);
            text ('Its a Tie!', 0, 400, 800, 200);
        break;
        default:
            text ('VS', 0, 200, 800, 200);
            text ('Player Loses', 0, 400, 800, 200);
        break;
    }

    fn_resultsDisplay(playerChoice, aichoice, pRePos, aiPrePos);
    
    text ('Press F5 to Play Again!', 0, 50, 800, 200);

    noLoop();
}
////////////////////////////////////////////////////////////////////////////////////////////////////

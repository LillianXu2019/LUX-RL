/// LUX_main.js

// define the site that hosts stimuli images
// usually https://<your-github-username>.github.io/<your-experiment-name>/
var repo_site = "https://LillianXu2019.github.io/LUX-RL/";

/* preload images */
var imageExt = repo_site + 'images/'

var images = [
    "instructions/Slide1.png",
    "instructions/Slide2.png",
    "instructions/Slide3.png",
    "instructions/Slide4.png",
    "instructions/Slide4.png",
    "instructions/Slide5.png",
    "instructions/Slide6.png",
    "instructions/Slide7.png",
    "instructions/Slide8.png",
    "instructions/Slide9.png",
    "instructions/Slide10.png",
    "instructions/Slide11.png",
    "instructions/Slide12.png",
    "instructions/Slide13.png",
    "instructions/Slide14.png",
    "instructions/Slide15.png",
    "instructions/Slide16.png",
    "instructions/Slide17.png",
    "instructions/Slide18.png",
    "instructions/Slide19.png",
    "instructions/Slide20.png",
    "timeout1_nobg.png"
    ]
    
var preload_images=[];
for (var k = 0; k < images.length; k++) {
    preload_images.push(imageExt+images[k]);
};

let timeline = [];

/* Enter subject id */
var subject_id = jsPsych.data.getURLVariable('participantID')
jsPsych.data.addProperties({subject: subject_id});
// enter full screen
var welcome = {
    type: "fullscreen",
    message: "Now you are entering the full screen mode.<br>",
    button_label: "Click here to proceed.",
    delay_after: 500
}

timeline.push(welcome);

let inst = {
type: 'instructions',
pages: [
    'Welcome to this game! Please click next or press the right arrow key to begin.',
    '<img class="instructions-image" src="' + repo_site + 'images/instructions/Slide2.png"></img>',
    '<img class="instructions-image" src="' + repo_site + 'images/instructions/Slide3.png"></img>',
    '<img class="instructions-image" src="' + repo_site + 'images/instructions/Slide4.png"></img>',
    '<img class="instructions-image" src="' + repo_site + 'images/instructions/Slide5.png"></img>',
    '<img class="instructions-image" src="' + repo_site + 'images/instructions/Slide6.png"></img>',
    '<img class="instructions-image" src="' + repo_site + 'images/instructions/Slide7.png"></img>',
    '<img class="instructions-image" src="' + repo_site + 'images/instructions/Slide8.png"></img>',
    '<img class="instructions-image" src="' + repo_site + 'images/instructions/Slide9.png"></img>',
    '<img class="instructions-image" src="' + repo_site + 'images/instructions/Slide10.png"></img>',
    '<img class="instructions-image" src="' + repo_site + 'images/instructions/Slide11.png"></img>',
    '<img class="instructions-image" src="' + repo_site + 'images/instructions/Slide12.png"></img>',
    '<img class="instructions-image" src="' + repo_site + 'images/instructions/Slide13.png"></img>',
    '<img class="instructions-image" src="' + repo_site + 'images/instructions/Slide14.png"></img>',
    '<img class="instructions-image" src="' + repo_site + 'images/instructions/Slide15.png"></img>',
    '<img class="instructions-image" src="' + repo_site + 'images/instructions/Slide16.png"></img>',
    '<img class="instructions-image" src="' + repo_site + 'images/instructions/Slide17.png"></img>',
    '<img class="instructions-image" src="' + repo_site + 'images/instructions/Slide18.png"></img>'],
    show_clickable_nav: true
};

timeline.push(inst);
    
// experiment constants
// Set the following to true to enable Pavlovia
const runat_pavlovia = false;  // set to false for running locally, true for running at Pavlovia
const timeout_penalty = -10;  // amount of "reward" for a timeout.  Make negative to deduct points from total.
const timeout_mode = 'once';  // set to 'once' or 'infinite'.  Otherwise, timeout mode is deactivated.

const response_duration = 2000; // duration (ms) for a response before timeout, if timeout is enabled
const warning_duration = 2000;  // duration (ms) of warning icon after a timeout
const display_choice_duration = 1000;  // duration (ms) to display choice before showing feedback
const feedback_duration = 1000; // duration (ms) to display choice together with rewarded side

// randomly assign colors to box1/box2
let box_color_classes = ['color-a', 'color-b'];
box_color_classes = jsPsych.randomization.repeat(box_color_classes, 1);
let box1_class = box_color_classes[0];
let box2_class = box_color_classes[1];

// randomly assign background colors to blocks
let background_colors = ['#fff0eb', '#edffeb', '#ebf3ff'];
background_colors = jsPsych.randomization.repeat(background_colors, 1);
let block_colors = {
    stable: background_colors[0],
    stochastic: background_colors[1],
    volatile: background_colors[2]
}

function setBackgroundColor(block){
    document.body.style.backgroundColor = block_colors[block];
}

// load schedules
let schedule_stable;
let schedule_stochastic;
let schedule_volatile;
var max_possible_points = 0;

// https://observablehq.com/@chrispahm/skew-normal-distributions
function randomTruncSkewNormal({
                                   rng = Math.random,
                                   range = [-Infinity, Infinity],
                                   mean,
                                   stdDev,
                                   skew = 0
                               }) {
    // Box-Muller transform
    function randomNormals(rng) {
        let u1 = 0,
            u2 = 0;
        //Convert [0,1) to (0,1)
        while (u1 === 0) u1 = rng();
        while (u2 === 0) u2 = rng();
        const R = Math.sqrt(-2.0 * Math.log(u1));
        const theta = 2.0 * Math.PI * u2;
        return [R * Math.cos(theta), R * Math.sin(theta)];
    }

    // Skew-normal transform
    // If a variate is either below or above the desired range,
    // we recursively call the randomSkewNormal function until
    // a value within the desired range is drawn
    function randomSkewNormal(rng, mean, stdDev, skew = 0) {
        const [u0, v] = randomNormals(rng);
        if (skew === 0) {
            const value = mean + stdDev * u0;
            if (value < range[0] || value > range[1])
                return randomSkewNormal(rng, mean, stdDev, skew);
            return value;
        }
        const sig = skew / Math.sqrt(1 + skew * skew);
        const u1 = sig * u0 + Math.sqrt(1 - sig * sig) * v;
        const z = u0 >= 0 ? u1 : -u1;
        const value = mean + stdDev * z;
        if (value < range[0] || value > range[1])
            return randomSkewNormal(rng, mean, stdDev, skew);
        return value;
    }

    return randomSkewNormal(rng, mean, stdDev, skew);
}

// return a random integer from the closed interval [rangeStart, rangeEnd]
function randomInt(rangeStart, rangeEnd) {
    return Math.floor(Math.random() * (rangeEnd - rangeStart + 1)) + rangeStart;
}

function starString(numberOfStars) {
    return '<div class="starcontainer">' +
        '<div class="filledstar star">&#9733;</div>'.repeat(numberOfStars) +
        '<div class="hollowstar star">&#9734;</div>'.repeat(15-numberOfStars) +
        '</div>';
}


// Instead of loading predefined schedules, generate randomly
function generate_schedules() {

    schedule_stable = [];
    // Box1 val is randomly selected from (5, 15] and is stable throughout the block
    let stable_box1_val = randomInt(6, 15);
    let stable_box2_val = stable_box1_val - 5;
    for (let i=0; i<70; i++){
        max_possible_points += Math.max(stable_box1_val, stable_box2_val);
        schedule_stable.push({
            block: 'stable',
            magOpt1: stable_box1_val,
            magOpt2: stable_box2_val,
            opt1Left: d3.randomBernoulli(0.5)()
        });
    }

    schedule_stochastic = [];
    for (let i=0; i<70; i++){
        let box1_val = randomInt(5, 15);
        let box2_val = randomInt(0, 10);
        max_possible_points += Math.max(box1_val, box2_val);
        schedule_stochastic.push({
            block: 'stochastic',
            magOpt1: box1_val,
            magOpt2: box2_val,
            opt1Left: d3.randomBernoulli(0.5)()
        });
    }

    schedule_volatile = [];
    let box1_val;
    let box2_val;

    // Trials 1-20
    box1_val = randomInt(10, 15);
    box2_val = randomInt(5, 9);
    for (let i=0; i<20; i++){
        max_possible_points += Math.max(box1_val, box2_val);
        schedule_volatile.push({
            block: 'volatile',
            magOpt1: box1_val,
            magOpt2: box2_val,
            opt1Left: d3.randomBernoulli(0.5)()
        });
    }

    // Trials 21-35
    box2_val = randomInt(10, 15);
    box1_val = box2_val - randomInt(5,9);
    for (let i=0; i<15; i++){
        max_possible_points += Math.max(box1_val, box2_val);
        schedule_volatile.push({
            block: 'volatile',
            magOpt1: box1_val,
            magOpt2: box2_val,
            opt1Left: d3.randomBernoulli(0.5)()
        });
    }

    // Trials 36-55
    box1_val = randomInt(10, 15);
    box2_val = box1_val - randomInt(5,9);
    for (let i=0; i<20; i++){
        max_possible_points += Math.max(box1_val, box2_val);
        schedule_volatile.push({
            block: 'volatile',
            magOpt1: box1_val,
            magOpt2: box2_val,
            opt1Left: d3.randomBernoulli(0.5)()
        });
    }
    // Trials 56-70
    box2_val = randomInt(10, 15);
    box1_val = box2_val - randomInt(5,9);
    for (let i=0; i<15; i++){
        max_possible_points += Math.max(box1_val, box2_val);
        schedule_volatile.push({
            block: 'volatile',
            magOpt1: box1_val,
            magOpt2: box2_val,
            opt1Left: d3.randomBernoulli(0.5)()
        });
    }
}

function build_and_run_experiment() {
    // randomize order of stable, stochastic, and volatile blocks
    let box_vals;
    switch(Math.floor(Math.random() * 6)) {
        case 0:
            box_vals = [].concat(schedule_stable, schedule_stochastic, schedule_volatile);
            break;
        case 1:
            box_vals = [].concat(schedule_stable, schedule_volatile, schedule_stochastic);
            break;
        case 2:
            box_vals = [].concat(schedule_stochastic, schedule_volatile, schedule_stable);
            break;
        case 3:
            box_vals = [].concat(schedule_stochastic, schedule_stable, schedule_volatile);
            break;
        case 4:
            box_vals = [].concat(schedule_volatile, schedule_stable, schedule_stochastic);
            break;
        case 5:
            box_vals = [].concat(schedule_volatile, schedule_stochastic, schedule_stable);
            break;
    }
    
    let display_boxes = function (val1, val2, opt1Left, reward_total, selected, feedback) {
        let valLeft;
        let valRight;
        let starsLeft = '';
        let starsRight = '';
        let classLeft;
        let classRight;

        if(opt1Left === 1){
            valLeft = val1;
            valRight = val2;
            classLeft = box1_class;
            classRight = box2_class;
        } else {
            valLeft = val2;
            valRight = val1;
            classLeft = box2_class;
            classRight = box1_class;
        }

        // if feedback is not undefined, show stars on the appropriate side
        if(feedback !== undefined) {
            if(selected === 'left') {
                starsLeft = starString(valLeft);
            } else {
                starsRight = starString(valRight);
            }
        }

        let string_parts = []
        string_parts.push('<div class="container"><div class="' + classLeft + ' box');
        if (selected === 'left') string_parts.push(' selected ');
        //if (feedback === 'left') string_parts.push(' highlight ');
        string_parts.push('">' + starsLeft + '</div><div class="box-middle">');
        if (selected === undefined) string_parts.push('+');
        string_parts.push('</div><div class="' + classRight + ' box');
        if (selected === 'right') string_parts.push(' selected ');
        //if (feedback === 'right') string_parts.push(' highlight ');
        string_parts.push('">' + starsRight + '</div></div>');
        string_parts.push('<div class="reward_points">' + reward_total + '</div>');
        string_parts.push('<div class="reward_bar_border"><div class="reward_bar" style="width:');
        string_parts.push(reward_total / max_possible_points * 100);
        string_parts.push('%;"></div></div>');
        return string_parts.join('')
    }

    /* a trial consists of three steps:
        1. display boxes with values (ends with keypress)
        2. display boxes with chosen option indicated (gray border) for 1 s
        3. display boxes with correct side highlighted for 1 s
    */

    let step1;
    if(timeout_mode === 'once') {
        // timeout once, then wait for response indefinitely
        step1 = {
            timeline: [
                {
                    type: 'html-keyboard-response',
                    stimulus: function() {
                        let opt1Left = jsPsych.timelineVariable('opt1Left', true);
                        let val1 = jsPsych.timelineVariable('magOpt1', true);
                        let val2 = jsPsych.timelineVariable('magOpt2', true);
                        let reward_total = jsPsych.data.get().select('reward').sum();
                        return display_boxes(val1, val2, opt1Left, reward_total);
                    },
                    choices: [37, 39],
                    on_start: function() {
                        let block = jsPsych.timelineVariable('block', true);
                        setBackgroundColor(block);
                    },
                    on_finish: function (data) {
                        let opt1Rewarded = jsPsych.timelineVariable('opt1Rewarded', true);
                        let opt1Left = jsPsych.timelineVariable('opt1Left', true);
                        let val1 = jsPsych.timelineVariable('magOpt1', true);
                        let val2 = jsPsych.timelineVariable('magOpt2', true);
                        let valLeft;
                        let valRight;
                        if(opt1Left === 1) {
                            valLeft = val1;
                            valRight = val2;
                        } else {
                            valLeft = val2;
                            valRight = val1;
                        }

                        data.rewarded_side = 'both';
                        if (data.key_press === 37) {
                            data.selected_side = 'left';
                            data.reward = parseInt(valLeft);
                        } else if(data.key_press === 39) {
                            data.selected_side = 'right';
                            data.reward = parseInt(valRight);
                        } else {
                            // timeout
                            data.reward = 0;
                        }
                    },
                    trial_duration: response_duration
                },
                {
                    timeline: [
                        // display warning icon and apply penalty to points
                        {
                            type: 'html-keyboard-response',
                            stimulus: '<img class="timeout-image" alt="warning icon" src="' + repo_site + 'images/timeout1_nobg.png">',
                            choices: jsPsych.NO_KEYS,
                            trial_duration: warning_duration,
                            on_finish: function(data) {
                                data.reward = timeout_penalty;
                            }
                        },

                        // standard response, but with no timeout
                        {
                            type: 'html-keyboard-response',
                            stimulus: function() {
                                let opt1Left = jsPsych.timelineVariable('opt1Left', true);
                                let val1 = jsPsych.timelineVariable('magOpt1', true);
                                let val2 = jsPsych.timelineVariable('magOpt2', true);
                                let reward_total = jsPsych.data.get().select('reward').sum();
                                return display_boxes(val1, val2, opt1Left, reward_total);
                            },
                            choices: [37, 39],
                            on_finish: function (data) {
                                let opt1Rewarded = jsPsych.timelineVariable('opt1Rewarded', true);
                                let opt1Left = jsPsych.timelineVariable('opt1Left', true);
                                let val1 = jsPsych.timelineVariable('magOpt1', true);
                                let val2 = jsPsych.timelineVariable('magOpt2', true);

                                let valLeft;
                                let valRight;
                                if(opt1Left === 1) {
                                    valLeft = val1;
                                    valRight = val2;
                                } else {
                                    valLeft = val2;
                                    valRight = val1;
                                }

                                data.rewarded_side = 'both';
                                if (data.key_press === 37) {
                                    data.selected_side = 'left';
                                    data.reward = parseInt(valLeft);
                                } else if(data.key_press === 39) {
                                    data.selected_side = 'right';
                                    data.reward = parseInt(valRight);
                                } else {
                                    // timeout
                                    data.reward = 0;
                                }
                            }
                        },
                    ],
                    conditional_function: function() {
                        // only display feedback if there was no response in the previous trial
                        return !jsPsych.data.get().last(1).values()[0].key_press
                    }
                }
            ]
        }

    } else if(timeout_mode === 'infinite') {
        // timeout with looping (timeout is repeatedly applied if no response)
        step1 = {
            timeline: [
                {
                    type: 'html-keyboard-response',
                    stimulus: function() {
                        let opt1Left = jsPsych.timelineVariable('opt1Left', true);
                        let val1 = jsPsych.timelineVariable('magOpt1', true);
                        let val2 = jsPsych.timelineVariable('magOpt2', true);
                        let reward_total = jsPsych.data.get().select('reward').sum();
                        return display_boxes(val1, val2, opt1Left, reward_total);
                    },
                    choices: [37, 39],
                    on_start: function() {
                        let block = jsPsych.timelineVariable('block', true);
                        setBackgroundColor(block);
                    },
                    on_finish: function (data) {
                        let opt1Rewarded = jsPsych.timelineVariable('opt1Rewarded', true);
                        let opt1Left = jsPsych.timelineVariable('opt1Left', true);
                        let val1 = jsPsych.timelineVariable('magOpt1', true);
                        let val2 = jsPsych.timelineVariable('magOpt2', true);

                        let valLeft;
                        let valRight;
                        if(opt1Left === 1) {
                            valLeft = val1;
                            valRight = val2;
                        } else {
                            valLeft = val2;
                            valRight = val1;
                        }

                        data.rewarded_side = 'both';
                        if (data.key_press === 37) {
                            data.selected_side = 'left';
                            data.reward = parseInt(valLeft);
                        } else if(data.key_press === 39) {
                            data.selected_side = 'right';
                            data.reward = parseInt(valRight);
                        } else {
                            // timeout
                            data.reward = 0;
                        }

                    },
                    trial_duration: response_duration
                },
                {
                    timeline: [
                        {
                            type: 'html-keyboard-response',
                            stimulus: '<img class="timeout-image" alt="warning icon" src=' + repo_site + '"images/timeout1_nobg.png">',
                            choices: jsPsych.NO_KEYS,
                            trial_duration: warning_duration,
                            on_finish: function(data) {
                                data.reward = timeout_penalty;
                            }
                        }
                    ],
                    conditional_function: function() {
                        // only display feedback if there was no response in the previous trial
                        return !jsPsych.data.get().last(1).values()[0].key_press
                    }
                }
            ],
            loop_function: function(data) {
                // loop if there was no key press
                return !data.values()[0].key_press;
            }
        }
    } else {
        // no timeout mode or looping
        step1 =             {
            type: 'html-keyboard-response',
            stimulus: function() {
                let opt1Left = jsPsych.timelineVariable('opt1Left', true);
                let val1 = jsPsych.timelineVariable('magOpt1', true);
                let val2 = jsPsych.timelineVariable('magOpt2', true);
                let reward_total = jsPsych.data.get().select('reward').sum();
                return display_boxes(val1, val2, opt1Left, reward_total);
            },
            choices: [37, 39],
            on_start: function() {
                let block = jsPsych.timelineVariable('block', true);
                setBackgroundColor(block);
            },
            on_finish: function (data) {
                let opt1Rewarded = jsPsych.timelineVariable('opt1Rewarded', true);
                let opt1Left = jsPsych.timelineVariable('opt1Left', true);
                let val1 = jsPsych.timelineVariable('magOpt1', true);
                let val2 = jsPsych.timelineVariable('magOpt2', true);

                let valLeft;
                let valRight;
                if(opt1Left === 1) {
                    valLeft = val1;
                    valRight = val2;
                } else {
                    valLeft = val2;
                    valRight = val1;
                }

                data.rewarded_side = 'both';
                if (data.key_press === 37) {
                    data.selected_side = 'left';
                    data.reward = parseInt(valLeft);
                } else if(data.key_press === 39) {
                    data.selected_side = 'right';
                    data.reward = parseInt(valRight);
                } else {
                    // timeout
                    data.reward = 0;
                }

            }
        }

    }


    var trial = [
        // show prompt and collect response.  Handle timeout appropriately, depending on settings.
        step1,

        // display response without indicating which side is rewarded
        {
            type: 'html-keyboard-response',
            stimulus: function () {
                let opt1Left = jsPsych.timelineVariable('opt1Left', true);
                let val1 = jsPsych.timelineVariable('magOpt1', true);
                let val2 = jsPsych.timelineVariable('magOpt2', true);
                let d = jsPsych.data.get().last(1).values()[0];

                // don't include the most recent reward yet
                let reward_total = jsPsych.data.get().select('reward').sum();
                let current_reward = jsPsych.data.get().last(1).values()[0].reward;
                return display_boxes(val1, val2, opt1Left, reward_total - current_reward, d.selected_side);
            },
            choices: jsPsych.NO_KEYS,
            trial_duration: display_choice_duration
        },

        // display response and rewarded side, along with updated points total
        {
            type: 'html-keyboard-response',
            stimulus: function () {
                let opt1Left = jsPsych.timelineVariable('opt1Left', true);
                let val1 = jsPsych.timelineVariable('magOpt1', true);
                let val2 = jsPsych.timelineVariable('magOpt2', true);
                let d = jsPsych.data.get().last(2).values()[0];
                let reward_total = jsPsych.data.get().select('reward').sum();
                return display_boxes(val1, val2, opt1Left, reward_total, d.selected_side, d.rewarded_side);
            },
            choices: jsPsych.NO_KEYS,
            trial_duration: feedback_duration
        },
    ]

    // Manipulation check
    var manipulation_check_procedure = {
        timeline: [
            {
                type: 'survey-multi-choice',
                questions: [
                    {
                        prompt: "Which box earns you more points?",
                        name: 'BetterBox',
                        options: ["blue", "green", "I don't know"],
                        required: true,
                        data: {task: 'check_response'}
                    }
                ]
            },
            {
                type: 'survey-multi-choice',
                questions: [
                    {
                        prompt: "Last time you said the [blank] box earns you more points. Did it switch?",
                        name: 'BetterBoxSwitched',
                        options: ["Yes", "No", "I don't know"],
                        required: true
                    }
                ]
            },
            {
                type: 'html-slider-response',
                stimulus: "<p>Based on what you see, what number will you get from the box that earns you point?</p>",
                labels: ['0', '30'],
                min: 0,
                max: 30,
                slider_start: 0,
                step: 1,
                require_movement: true,
                prompt: '<p>Move the slider to select a value</p>',
                slider_number: true,
            },
            {
                type: 'survey-multi-choice',
                questions: [
                    {
                        prompt: "How sure are you that your guess is around the actual number?",
                        name: 'Confidence',
                        options: ['I have no idea at all', 'Somewhat confident', 'Moderately confident', 'Mostly confident'],
                        required: true
                    }
                ]
            },
        ]
    }


    // 210 trials split into blocks of 20 or 15 with manipulation checks after each block.
    // var blocks = [0, 15, 35, 55, 70, 90, 105, 125, 140, 155, 175, 190, 210];
    var blocks = [0, 5, 10];

    for (let i=1; i < blocks.length; i++){
        timeline.push({
            timeline: trial,
            timeline_variables: box_vals.slice(blocks[i-1], blocks[i])
        });
        timeline.push(manipulation_check_procedure);

        if(blocks[i] % 70 === 0){
            // display motivational slide
        }
    }
}

/// LUX_main.js

// define the site that hosts stimuli images
// usually https://<your-github-username>.github.io/<your-experiment-name>/

var g = {};  // put everything in a namespace variable

g.repo_site = "https://LillianXu2019.github.io/LUX-RL/";


/* preload images */
g.imageExt = g.repo_site + 'images/'

g.images = [
    "instructions/Slide1.png",
    "instructions/Slide2.png",
    "instructions/Slide3.png",
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
    "instructions/Slide21.png",
    "instructions/Slide22.png",
    "instructions/Slide23.png",
    "instructions/Slide24.png",
    "instructions/Slide25.png",
    "instructions/Slide26.png",
    "instructions/Slide27.png",
    "instructions/Slide28.png",
    // "instructions/Slide29.png",
    "instructions/Slide31.png",
    // "instructions/Slide32.png",
    "timeout1_nobg.png",
    "trophy2.jpeg"
    ]
    
g.preload_images=[];
for (var k = 0; k < g.images.length; k++) {
    g.preload_images.push(g.imageExt+g.images[k]);
};

g.timeline = [];

/* Enter subject id */
// var subject_id = jsPsych.data.getURLVariable('participantID')
// jsPsych.data.addProperties({subject: subject_id});
// enter full screen
g.welcome = {
    type: "fullscreen",
    message: "Now you are entering the full screen mode.<br>",
    button_label: "Click here to proceed.",
    delay_after: 500
}

g.take_a_break = {
    type: "html-keyboard-response",
    stimulus: 'Time for a break!',
    prompt: "Press any key when you're ready to continue"
};

g.start_a_new_block = {
    type: "html-keyboard-response",
    stimulus: 'Now you are playing a different game. Figure out which game it is to help you find the better card.',
    prompt: "Press any key when you're ready to continue",
    on_start: function(){
        setBackgroundColorWhite();
    }
};

g.trophy = {
    type: 'image-keyboard-response',
    stimulus: g.repo_site + 'images/trophy2.jpeg',
    prompt: "<p style = 'font-size: 25px'>Great job! You've got a trophy!</p>",
    on_start: function(){
        setBackgroundColorWhite();
    }
    // +
    // "<p style = 'font-size: 25px'>Press any key to continue to the next part.</p>"
    }

g.timeline.push(g.welcome);

g.inst = {
type: 'instructions',
pages: [
    'Welcome to this game! Please click next or press the right arrow key to begin.',
    '<img class="instructions-image" src="' + g.repo_site + 'images/instructions/Slide1.png"></img>',
    '<img class="instructions-image" src="' + g.repo_site + 'images/instructions/Slide2.png"></img>',
    '<img class="instructions-image" src="' + g.repo_site + 'images/instructions/Slide3.png"></img>',
    '<img class="instructions-image" src="' + g.repo_site + 'images/instructions/Slide4.png"></img>',
    '<img class="instructions-image" src="' + g.repo_site + 'images/instructions/Slide5.png"></img>',
    '<img class="instructions-image" src="' + g.repo_site + 'images/instructions/Slide6.png"></img>',
    '<img class="instructions-image" src="' + g.repo_site + 'images/instructions/Slide7.png"></img>',
    '<img class="instructions-image" src="' + g.repo_site + 'images/instructions/Slide8.png"></img>',
    '<img class="instructions-image" src="' + g.repo_site + 'images/instructions/Slide9.png"></img>',
    '<img class="instructions-image" src="' + g.repo_site + 'images/instructions/Slide10.png"></img>',
    '<img class="instructions-image" src="' + g.repo_site + 'images/instructions/Slide11.png"></img>',
    '<img class="instructions-image" src="' + g.repo_site + 'images/instructions/Slide12.png"></img>',
    '<img class="instructions-image" src="' + g.repo_site + 'images/instructions/Slide13.png"></img>',
    '<img class="instructions-image" src="' + g.repo_site + 'images/instructions/Slide14.png"></img>',
    '<img class="instructions-image" src="' + g.repo_site + 'images/instructions/Slide15.png"></img>',
    '<img class="instructions-image" src="' + g.repo_site + 'images/instructions/Slide16.png"></img>',
    '<img class="instructions-image" src="' + g.repo_site + 'images/instructions/Slide17.png"></img>',
    '<img class="instructions-image" src="' + g.repo_site + 'images/instructions/Slide18.png"></img>',
    '<img class="instructions-image" src="' + g.repo_site + 'images/instructions/Slide19.png"></img>',
    '<img class="instructions-image" src="' + g.repo_site + 'images/instructions/Slide20.png"></img>',
    '<img class="instructions-image" src="' + g.repo_site + 'images/instructions/Slide21.png"></img>',
    '<img class="instructions-image" src="' + g.repo_site + 'images/instructions/Slide22.png"></img>',
    '<img class="instructions-image" src="' + g.repo_site + 'images/instructions/Slide23.png"></img>',
    '<img class="instructions-image" src="' + g.repo_site + 'images/instructions/Slide24.png"></img>',
    '<img class="instructions-image" src="' + g.repo_site + 'images/instructions/Slide25.png"></img>',
    '<img class="instructions-image" src="' + g.repo_site + 'images/instructions/Slide26.png"></img>',
    '<img class="instructions-image" src="' + g.repo_site + 'images/instructions/Slide27.png"></img>',
    '<img class="instructions-image" src="' + g.repo_site + 'images/instructions/Slide28.png"></img>'],
    // '<img class="instructions-image" src="' + g.repo_site + 'images/instructions/Slide29.png"></img>'],
    show_clickable_nav: true
};

g.timeline.push(g.inst);

g.inst_postPractice = {
type: 'instructions',
pages: [
    '<img class="instructions-image" src="' + g.repo_site + 'images/instructions/Slide30.png"></img>',
    '<img class="instructions-image" src="' + g.repo_site + 'images/instructions/Slide31.png"></img>'],
    show_clickable_nav: true
};
    
// experiment constants
// Set the following to true to enable Pavlovia
g.runat_pavlovia = false;  // set to false for running locally, true for running at Pavlovia
g.timeout_penalty = -10;  // amount of "reward" for a timeout.  Make negative to deduct points from total.
g.timeout_mode = 'once';  // set to 'once' or 'infinite'.  Otherwise, timeout mode is deactivated.

g.response_duration = 2000; // duration (ms) for a response before timeout, if timeout is enabled
g.warning_duration = 2000;  // duration (ms) of warning icon after a timeout
g.display_choice_duration = 1000;  // duration (ms) to display choice before showing feedback
g.feedback_duration = 1000; // duration (ms) to display choice together with rewarded side

// randomly assign colors to box1/box2
g.box_color_classes = ['color-a', 'color-b'];
g.box_color_classes = jsPsych.randomization.repeat(g.box_color_classes, 1);
g.box1_class = g.box_color_classes[0];
g.box2_class = g.box_color_classes[1];

// randomly assign background colors to blocks
g.background_colors = ['#fff0eb', '#edffeb', '#ebf3ff'];
g.background_colors = jsPsych.randomization.repeat(g.background_colors, 1);
g.block_colors = {
    stable: g.background_colors[0],
    stochastic: g.background_colors[1],
    volatile: g.background_colors[2]
}

function setBackgroundColor(block){
    document.getElementById('display_stage').style.backgroundColor = g.block_colors[block];
    //document.body.style.backgroundColor = block_colors[block];
}

function setBackgroundColorWhite(){
    document.getElementById('display_stage').style.backgroundColor = '#ffffff';
}

// load schedules
g.schedule_stable;
g.schedule_stochastic;
g.schedule_volatile;
g.max_possible_points = 0;
g.max_practice_points = 0;
g.practice_stable;
g.practice_stochastic;
g.practice_volatile;

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

    function generate_stable(n, practice=false) {
        let schedule = [];
        let box1_val = randomInt(6, 15);
        let box2_val = box1_val - 5;
        for (let i=0; i<n; i++){
            if (practice) {
                g.max_practice_points += Math.max(box1_val, box2_val);
            } else {
                g.max_possible_points += Math.max(box1_val, box2_val);
            }

            schedule.push({
                block: 'stable',
                magOpt1: box1_val,
                magOpt2: box2_val,
                opt1Left: d3.randomBernoulli(0.5)(),
                practice: practice
            });
        }
        return schedule;
    }
    g.schedule_stable = generate_stable(35);
    g.practice_stable = generate_stable(15, true);

    function generate_stochastic(n, practice=false){
        let schedule = []
        for (let i=0; i<n; i++){
            let box1_val = randomInt(5, 15);
            let box2_val = randomInt(0, 10);
            if (practice) {
                g.max_practice_points += Math.max(box1_val, box2_val);
            } else {
                g.max_possible_points += Math.max(box1_val, box2_val);
            }
            schedule.push({
                block: 'stochastic',
                magOpt1: box1_val,
                magOpt2: box2_val,
                opt1Left: d3.randomBernoulli(0.5)(),
                practice: practice
            });
        }
        return schedule;
    }
    g.schedule_stochastic = generate_stochastic(70);
    g.practice_stochastic = generate_stochastic(15, true);

    function generate_volatile(block_list, practice=false){
        let schedule = [];
        let flipper = true;
        let box1_val;
        let box2_val;
        for (let j=0; j < block_list.length; j++) {
            if (flipper) {
                box1_val = randomInt(10, 15);
                box2_val = box1_val - randomInt(5, 9);
            } else {
                box2_val = randomInt(10, 15);
                box1_val = box2_val - randomInt(5,9);
            }
            flipper = !flipper;
            for (let i=0; i<block_list[j]; i++){
                if (practice) {
                    g.max_practice_points += Math.max(box1_val, box2_val);
                } else {
                    g.max_possible_points += Math.max(box1_val, box2_val);
                }
                schedule.push({
                    block: 'volatile',
                    magOpt1: box1_val,
                    magOpt2: box2_val,
                    opt1Left: d3.randomBernoulli(0.5)(),
                    practice: practice
                });
            }
        }
        return schedule;
    }

    g.schedule_volatile = generate_volatile([20, 15, 20, 15]);
    g.practice_volatile = generate_volatile([8, 7], true);

}

function build_and_run_experiment() {
    // randomize order of stable, stochastic, and volatile blocks
    let ordered_blocks;
    let box_vals;
    let break_breaks;
    switch(Math.floor(Math.random() * 6)) {
        case 0:
            ordered_blocks = [g.schedule_stable, g.schedule_stochastic, g.schedule_volatile];
            break;
        case 1:
            ordered_blocks = [g.schedule_stable, g.schedule_volatile, g.schedule_stochastic];
            break;
        case 2:
            ordered_blocks = [g.schedule_stochastic, g.schedule_volatile, g.schedule_stable];
            break;
        case 3:
            ordered_blocks = [g.schedule_stochastic, g.schedule_stable, g.schedule_volatile];
            break;
        case 4:
            ordered_blocks = [g.schedule_volatile, g.schedule_stable, g.schedule_stochastic];
            break;
        case 5:
            ordered_blocks = [g.schedule_volatile, g.schedule_stochastic, g.schedule_stable];
            break;
    }

    // need to know when it's time to take a break between blocks
    let block_breaks = [
        ordered_blocks[0].length,
        ordered_blocks[0].length + ordered_blocks[1].length
    ];

    // need to know when it's time to insert intro message for a new block
    let block_intro = [1,
        ordered_blocks[0].length,
        ordered_blocks[0].length + ordered_blocks[1].length
    ];

    box_vals = ordered_blocks.flat()
    
    let display_boxes = function ({val1, val2, opt1Left, reward_total, selected, feedback, practice = false} = {}) {
        let valLeft;
        let valRight;
        let starsLeft = '';
        let starsRight = '';
        let classLeft;
        let classRight;

        if(opt1Left === 1){
            valLeft = val1;
            valRight = val2;
            classLeft = g.box1_class;
            classRight = g.box2_class;
        } else {
            valLeft = val2;
            valRight = val1;
            classLeft = g.box2_class;
            classRight = g.box1_class;
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
        if (practice) {
            string_parts.push(reward_total / g.max_practice_points * 100);
        } else {
            string_parts.push(reward_total / g.max_possible_points * 100);
        }
        string_parts.push('%;"></div></div>');
        return string_parts.join('')
    }

    /* a trial consists of three steps:
        1. display boxes with values (ends with keypress)
        2. display boxes with chosen option indicated (gray border) for 1 s
        3. display boxes with correct side highlighted for 1 s
    */

    let step1;
    if(g.timeout_mode === 'once') {
        // timeout once, then wait for response indefinitely
        step1 = {
            timeline: [
                {
                    type: 'html-keyboard-response',
                    stimulus: function() {
                        let opt1Left = jsPsych.timelineVariable('opt1Left', true);
                        let val1 = jsPsych.timelineVariable('magOpt1', true);
                        let val2 = jsPsych.timelineVariable('magOpt2', true);
                        let current_phase = jsPsych.data.get().last().values()[0].phase;
                        let reward_total = jsPsych.data.get().filter({phase: current_phase}).select('reward').sum();
                        let practice = jsPsych.timelineVariable('practice', true);
                        return display_boxes({val1, val2, opt1Left, reward_total, practice: practice});
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

                        data.block_type = jsPsych.timelineVariable('block', true);
                        data.left_star = valLeft;
                        data.right_star = valRight;

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
                    trial_duration: g.response_duration
                },
                {
                    timeline: [
                        // display warning icon and apply penalty to points
                        {
                            type: 'html-keyboard-response',
                            stimulus: '<img class="timeout-image" alt="warning icon" src="' + g.repo_site + 'images/timeout1_nobg.png"><br><h2>10 points off!</h2>',
                            choices: jsPsych.NO_KEYS,
                            trial_duration: g.warning_duration,
                            on_finish: function(data) {
                                data.block_type = jsPsych.timelineVariable('block', true);
                                data.reward = g.timeout_penalty;
                            }
                        },

                        // standard response, but with no timeout
                        {
                            type: 'html-keyboard-response',
                            stimulus: function() {
                                let opt1Left = jsPsych.timelineVariable('opt1Left', true);
                                let val1 = jsPsych.timelineVariable('magOpt1', true);
                                let val2 = jsPsych.timelineVariable('magOpt2', true);
                                let current_phase = jsPsych.data.get().last().values()[0].phase;
                                let reward_total = jsPsych.data.get().filter({phase: current_phase}).select('reward').sum();
                                let practice = jsPsych.timelineVariable('practice', true);
                                return display_boxes({val1, val2, opt1Left, reward_total, practice: practice});
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

                                data.block_type = jsPsych.timelineVariable('block', true);
                                data.left_star = valLeft;
                                data.right_star = valRight;

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
                        let current_phase = jsPsych.data.get().last().values()[0].phase;
                        let reward_total = jsPsych.data.get().filter({phase: current_phase}).select('reward').sum();
                        let practice = jsPsych.timelineVariable('practice', true);
                        return display_boxes({val1, val2, opt1Left, reward_total, practice: practice});
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

                        data.block_type = jsPsych.timelineVariable('block', true);
                        data.left_star = valLeft;
                        data.right_star = valRight;

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
                    trial_duration: g.response_duration
                },
                {
                    timeline: [
                        {
                            type: 'html-keyboard-response',
                            stimulus: '<img class="timeout-image" alt="warning icon" src=' + g.repo_site + '"images/timeout1_nobg.png"><br><h2>10 points off!</h2>',
                            choices: jsPsych.NO_KEYS,
                            trial_duration: g.warning_duration,
                            on_finish: function(data) {
                                data.block_type = jsPsych.timelineVariable('block', true);
                                data.reward = g.timeout_penalty;
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
                let current_phase = jsPsych.data.get().last().values()[0].phase;
                let reward_total = jsPsych.data.get().filter({phase: current_phase}).select('reward').sum();
                let practice = jsPsych.timelineVariable('practice', true);
                return display_boxes({val1, val2, opt1Left, reward_total, practice: practice});
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

                data.block_type = jsPsych.timelineVariable('block', true);
                data.left_star = valLeft;
                data.right_star = valRight;

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
                let practice = jsPsych.timelineVariable('practice', true);
                let d = jsPsych.data.get().last(1).values()[0];

                // don't include the most recent reward yet
                let current_phase = jsPsych.data.get().last().values()[0].phase;
                let reward_total = jsPsych.data.get().filter({phase: current_phase}).select('reward').sum();
                let current_reward = jsPsych.data.get().last(1).values()[0].reward;
                return display_boxes({val1, val2, opt1Left,
                    reward_total: reward_total - current_reward, selected: d.selected_side, practice: practice});
            },
            choices: jsPsych.NO_KEYS,
            trial_duration: g.display_choice_duration
        },

        // display response and rewarded side, along with updated points total
        {
            type: 'html-keyboard-response',
            stimulus: function () {
                let opt1Left = jsPsych.timelineVariable('opt1Left', true);
                let val1 = jsPsych.timelineVariable('magOpt1', true);
                let val2 = jsPsych.timelineVariable('magOpt2', true);
                let d = jsPsych.data.get().last(2).values()[0];
                let current_phase = jsPsych.data.get().last().values()[0].phase;
                let reward_total = jsPsych.data.get().filter({phase: current_phase}).select('reward').sum();
                let practice = jsPsych.timelineVariable('practice', true);
                return display_boxes({val1, val2, opt1Left, reward_total, selected: d.selected_side, feedback: d.rewarded_side, practice: practice});
            },
            choices: jsPsych.NO_KEYS,
            trial_duration: g.feedback_duration
        },
    ]

    // Manipulation check
    var manipulation_check_procedure = {
        timeline: [
            // {
            //     type: 'survey-multi-choice',
            //     questions: [
            //         {
            //             prompt: "Which box earns you more points?",
            //             name: 'BetterBox',
            //             options: ["blue", "green", "I don't know"],
            //             required: true,
            //             data: {task: 'check_response'}
            //         }
            //     ]
            // },

            {
                    type: 'html-button-response',
                    choices: ["blue", "green"],
                    stimulus: '<h2>Which box earns you more points?</h2>',
                    button_html: [
                        '<button class="box color-a"></button><h3>%choice%</h3>',
                        '<button class="box color-b"></button><h3>%choice%</h3>'
                    ],
                    data: { name: 'betterbox' }
            },

            {
                timeline: [
                    {
                        type: 'survey-multi-choice',
                        questions: function(){
                            // let better_box_trials = jsPsych.data.get().filterCustom(function(trial){
                            //     return ('responses' in trial && trial.responses.includes('BetterBox'))
                            // });
                            //
                            // let last_response = JSON.parse(better_box_trials.last().values()[0].responses).BetterBox;
                            let last_response_button = jsPsych.data.get().filter({name: 'betterbox'}).last(2).first().values()[0].button_pressed
                            let last_response = (last_response_button === '0') ? 'blue' : 'green';
                            return [
                                {
                                    prompt: "Last time you said the " + last_response + " box earns you more points. Did it switch?",
                                    name: 'BetterBoxSwitched',
                                    options: ["Yes", "No", "I don't know"],
                                    required: true
                                }
                            ]
                        }
                    }
                ],
                conditional_function: function() {
                    // only include this question if BetterBox was previously asked in current phase

                    let current_phase = jsPsych.data.get().last().values()[0].phase;
                    return jsPsych.data.get().filter({name: 'betterbox', phase: current_phase}).count() > 1
                    // return jsPsych.data.get().filterCustom(function(trial){
                    //     return ('responses' in trial && trial.responses.includes('BetterBox'))
                    // }).count() > 1
                }
            },
            {
                type: 'star-rating',
                stimulus: "<p>Based on what you see, how many stars will you get from the box that earns you more points?</p>" +
                    "<p>Click the stars below to tell us your best guess.</p>",
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

    // practice manipulation
    let practice_manipulation_1 = {
        type: 'html-button-response',
            choices: ["blue", "green"],
        stimulus: '<h2>Which box earns you more points?</h2>',
        button_html: [
        '<button class="box color-a"></button><h3>%choice%</h3>',
        '<button class="box color-b"></button><h3>%choice%</h3>'
    ],
        data: { name: 'practice_betterbox' }
    }

    // practice trials
    let practice_trials;
    if (Math.random() > 0.5) {
        practice_trials = [g.practice_stable, g.practice_volatile, g.practice_stochastic].flat();
    } else {
        practice_trials = [g.practice_stable, g.practice_stochastic, g.practice_volatile].flat();
    }

    // let blocks = [0, 8, 15, 23, 30, 38, 45];
    // timeline.push({
    //     type: "html-keyboard-response",
    //     stimulus: "<p>Let's start with some practice trials.</p>" + 
    //         "<p>Pay attention to how the 3 games are different.</p>",
    //     prompt: "Press any key when you're ready to begin!"
    // });
    // for (let i=1; i < blocks.length; i++){
    //     timeline.push({
    //         timeline: trial,
    //         timeline_variables: practice_trials.slice(blocks[i-1], blocks[i]),
    //         data: { phase: 'practice' }
    //     });
    //     timeline.push({
    //         timeline: [manipulation_check_procedure],
    //         data: { phase: 'practice' }
    //     });
    // }

    // let blocks = [0, 8, 15, 23, 30, 38, 45];
    let blocks = [8, 15, 23, 30, 38, 45];
    let practice_breaks = [15, 30];
    g.timeline.push({
        type: "html-keyboard-response",
        stimulus: "<p>Let's start with some practice trials.</p>" + 
            "<p>Pay attention to how the 3 games are different.</p>",
        prompt: "Press any key when you're ready to begin!"
    });

    // introduce the first practice block
    g.timeline.push(g.start_a_new_block);
    for (let i=1; i < blocks.length; i++){
        g.timeline.push({
            timeline: trial,
            timeline_variables: practice_trials.slice(blocks[i-1], blocks[i]),
            data: { phase: 'practice' }
        });
        g.timeline.push({
            timeline: [manipulation_check_procedure],
            data: { phase: 'practice' }
        });
        if(practice_breaks.includes(blocks[i])){
            // time to introduce to a new block
            g.timeline.push(g.start_a_new_block);
        }

    }

    g.timeline.push(g.inst_postPractice);


    g.timeline.push({
        type: "html-keyboard-response",
        stimulus: "<p>Now let's begin the real task.</p>" +
            "<p>Remember, there will be 3 different games.</p>" +
            "<p>You will have a break after each game.</p>",
        prompt: "Press any key when you're ready to begin!"
    });

    // 210 trials split into blocks of 20 or 15 with manipulation checks after each block.
    // blocks = [0, 15, 35, 55, 70, 90, 105, 125, 140, 155, 175];  //, 190, 210];
    // blocks = [0, 15, 35, 55];  //, 190, 210];
    blocks = [15, 35, 55];  //, 190, 210];

    // introduce the first block
    g.timeline.push(g.start_a_new_block);

    for (let i=1; i < blocks.length; i++){
        g.timeline.push({
            timeline: trial,
            timeline_variables: box_vals.slice(blocks[i-1], blocks[i]),
            data: { phase: 'test' }
        });
        //timeline.push(manipulation_check_procedure);
        g.timeline.push({
            timeline: [manipulation_check_procedure],
            data: { phase: 'test' }
        });

        if(block_breaks.includes(blocks[i])){
            // time to take a break
            g.timeline.push(g.take_a_break);
            // time to introduce to a new block
            g.timeline.push(g.start_a_new_block);
        }

        if(i === blocks.length-1){
            g.timeline.push(g.trophy); // trophy slide
        }
    }
}

    

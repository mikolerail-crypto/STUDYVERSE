import {
  Subject,
  Course,
  Lesson,
  Quiz,
  QuizQuestion,
  Achievement,
  StudyNote,
  VideoLesson
} from '../types';

export const INITIAL_SUBJECTS: Subject[] = [
  {
    id: 'math',
    title: 'Mathematics',
    code: 'G7-MATH',
    description: 'Master rational numbers, algebraic linear equations, geometric figures, and coordinate systems.',
    icon: 'Calculator',
    color_accent: 'cyan',
    hero_image: '/src/assets/images/subject_math_geometry_1794057135074.jpg',
    order_index: 1,
    unit_count: 4,
    lesson_count: 6
  },
  {
    id: 'science',
    title: 'General Science',
    code: 'G7-SCI',
    description: 'Explore cell biology, microscopic structures, physics forces, and work-saving simple machines.',
    icon: 'Atom',
    color_accent: 'emerald',
    hero_image: '/src/assets/images/subject_general_science_1794057136156.jpg',
    order_index: 2,
    unit_count: 4,
    lesson_count: 6
  },
  {
    id: 'english',
    title: 'English Language',
    code: 'G7-ENG',
    description: 'Elevate reading comprehension, sentence variety, grammatical precision, and descriptive writing.',
    icon: 'BookOpen',
    color_accent: 'blue',
    hero_image: '/src/assets/images/hero_studyverse_grade7_1794057134312.jpg',
    order_index: 3,
    unit_count: 4,
    lesson_count: 6
  },
  {
    id: 'social',
    title: 'Social Studies',
    code: 'G7-SOC',
    description: 'Investigate Ethiopian topography, Great Rift Valley ecosystems, ancient Aksum, and conservation.',
    icon: 'Globe',
    color_accent: 'amber',
    hero_image: '/src/assets/images/subject_social_studies_1794057135138.jpg',
    order_index: 4,
    unit_count: 4,
    lesson_count: 6
  },
  {
    id: 'oromo',
    title: 'Afaan Oromoo',
    code: 'G7-ORO',
    description: 'Baradhu seerluga, caasaa himaa, bamaqaa, og-barruu, fi mammaaksota bu’uuraa Oromoo.',
    icon: 'Sparkles',
    color_accent: 'violet',
    hero_image: '/src/assets/images/hero_studyverse_grade7_1794057134312.jpg',
    order_index: 5,
    unit_count: 4,
    lesson_count: 6
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'math-c1',
    subject_id: 'math',
    title: 'Unit 1: Rational Numbers & Coordinate Plane',
    description: 'Definition of rational numbers, plotting points on the Cartesian coordinate plane, and arithmetic operations.',
    unit_number: 1,
    order_index: 1
  },
  {
    id: 'math-c2',
    subject_id: 'math',
    title: 'Unit 2: Linear Equations & Inequalities',
    description: 'Solving linear equations with inverse operations and real-world word problems.',
    unit_number: 2,
    order_index: 2
  },
  {
    id: 'sci-c1',
    subject_id: 'science',
    title: 'Unit 1: Cell Architecture & Microscopy',
    description: 'Eukaryotic cells, differences between plant and animal organelles, and cell hierarchy.',
    unit_number: 1,
    order_index: 1
  },
  {
    id: 'sci-c2',
    subject_id: 'science',
    title: 'Unit 2: Work, Energy & Simple Machines',
    description: 'The physics of mechanical advantage, levers, pulleys, and the inclined plane.',
    unit_number: 2,
    order_index: 2
  },
  {
    id: 'eng-c1',
    subject_id: 'english',
    title: 'Unit 1: Sentence Mastery & Clauses',
    description: 'Distinguishing simple, compound, and complex sentences with coordinating and subordinating conjunctions.',
    unit_number: 1,
    order_index: 1
  },
  {
    id: 'soc-c1',
    subject_id: 'social',
    title: 'Unit 1: Physiography & Drainage of Ethiopia',
    description: 'The Ethiopian Highlands, Rift Valley depressions, and major river drainage systems.',
    unit_number: 1,
    order_index: 1
  },
  {
    id: 'oro-c1',
    subject_id: 'oromo',
    title: 'Unit 1: Caasaa Himaa fi Seerluga',
    description: 'Seera ijaarsa himaa (Mat-himaa + Anta-himaa + Gochima) fi bamaqaa adda baasuu.',
    unit_number: 1,
    order_index: 1
  }
];

export const INITIAL_LESSONS: Lesson[] = [
  // 1. Math Lesson 1
  {
    id: 'math-l1',
    course_id: 'math-c1',
    subject_id: 'math',
    title: 'Rational Numbers & The Coordinate Plane',
    unit_number: 1,
    chapter_number: 1,
    order_index: 1,
    estimated_minutes: 18,
    xp_reward: 50,
    verified_syllabus: true,
    interactive_widget_type: 'coordinate_plane',
    learning_objectives: [
      'Define a rational number as any number expressible in the form a/b where b ≠ 0.',
      'Identify positive, negative, and zero rational numbers on a horizontal number line.',
      'Graph ordered pairs (x, y) accurately across all four quadrants of the Cartesian coordinate plane.',
      'Compare rational numbers using standard inequality symbols (<, >, =).'
    ],
    content: `
### What is a Rational Number?
In Grade 7 Mathematics, we expand our number universe beyond whole numbers and integers. A **rational number** is any number that can be expressed as the quotient or fraction $\\frac{a}{b}$ of two integers, where the numerator is an integer $a$ and the denominator is a non-zero integer $b$ ($b \\neq 0$).

Every integer is also a rational number because any integer $n$ can be written as $\\frac{n}{1}$. For example, $5 = \\frac{5}{1}$ and $-8 = \\frac{-8}{1}$. Terminating decimals (like $0.75 = \\frac{3}{4}$) and repeating decimals (like $0.333... = \\frac{1}{3}$) are also rational numbers.

### The Cartesian Coordinate Plane
The coordinate plane is formed by the intersection of two perpendicular number lines:
1. The **x-axis** (horizontal line).
2. The **y-axis** (vertical line).

The intersection point $(0, 0)$ is called the **Origin**. These two axes divide the coordinate plane into four regions called **Quadrants**:
- **Quadrant I**: $x > 0$ and $y > 0$ (Top-right, e.g., $(3, 5)$).
- **Quadrant II**: $x < 0$ and $y > 0$ (Top-left, e.g., $(-4, 6)$).
- **Quadrant III**: $x < 0$ and $y < 0$ (Bottom-left, e.g., $(-2, -5)$).
- **Quadrant IV**: $x > 0$ and $y < 0$ (Bottom-right, e.g., $(4, -3)$).
`,
    important_definitions: [
      {
        term: 'Rational Number',
        definition: 'A number that can be written in the form a/b, where a and b are integers and b ≠ 0.',
        example: '3/4, -7/2, 0.25, -9'
      },
      {
        term: 'Cartesian Coordinate Plane',
        definition: 'A two-dimensional grid system formed by perpendicular horizontal (x) and vertical (y) number lines.',
        example: 'Used for mapping geographical coordinates and plotting mathematical relationships.'
      },
      {
        term: 'Ordered Pair (x, y)',
        definition: 'A pair of numbers where the first number represents horizontal position and the second vertical position.',
        example: 'In the point (-3, 4), x = -3 and y = 4.'
      }
    ],
    examples: [
      {
        title: 'Example 1: Comparing Negative Rational Numbers',
        problem: 'Which is greater: -3/4 or -1/2?',
        solution_steps: [
          'Find a common denominator for 4 and 2. The least common multiple is 4.',
          'Convert -1/2 to an equivalent fraction with denominator 4: (-1 × 2)/(2 × 2) = -2/4.',
          'Compare the numerators: -2 is to the right of -3 on a number line, so -2 > -3.',
          'Therefore, -2/4 > -3/4.'
        ],
        final_answer: '-1/2 is greater than -3/4 (written as -1/2 > -3/4).'
      },
      {
        title: 'Example 2: Identifying the Quadrant',
        problem: 'In which quadrant does the ordered pair P(-5, 7) lie?',
        solution_steps: [
          'Check the x-coordinate: x = -5 (negative, moving left from the origin).',
          'Check the y-coordinate: y = 7 (positive, moving upwards).',
          'A point with a negative x-coordinate and positive y-coordinate resides in Quadrant II.'
        ],
        final_answer: 'Quadrant II.'
      }
    ],
    practice_exercises: [
      {
        question: 'Plot and determine the quadrant for point Q(-6, -4).',
        hint: 'Examine the signs of both x and y. Are both negative?',
        solution: 'Both x and y are negative, which places point Q in Quadrant III.'
      },
      {
        question: 'Convert the decimal -0.6 to a rational number in simplest fraction form.',
        hint: '-0.6 equals -6/10. Divide numerator and denominator by their greatest common factor.',
        solution: '-6/10 = -3/5.'
      }
    ],
    knowledge_check: [
      {
        id: 'kc-m1-1',
        question: 'Which of the following numbers is NOT a rational number?',
        options: ['-7/8', '0.45', '√2 (square root of 2)', '14'],
        correct_index: 2,
        explanation: '√2 is an irrational number because it cannot be written as a fraction of two integers.'
      },
      {
        id: 'kc-m1-2',
        question: 'In which quadrant are both the x and y coordinates negative?',
        options: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'],
        correct_index: 2,
        explanation: 'Quadrant III contains points where both coordinates are negative (-x, -y).'
      }
    ]
  },

  // 2. Math Lesson 2
  {
    id: 'math-l2',
    course_id: 'math-c2',
    subject_id: 'math',
    title: 'Solving One-Variable Linear Equations',
    unit_number: 2,
    chapter_number: 1,
    order_index: 2,
    estimated_minutes: 20,
    xp_reward: 50,
    verified_syllabus: true,
    interactive_widget_type: 'equation_scale',
    learning_objectives: [
      'Understand an algebraic equation as a balanced balance scale.',
      'Use inverse operations (Addition/Subtraction, Multiplication/Division properties of equality).',
      'Solve two-step linear equations in the standard form ax + b = c.',
      'Verify solutions by substituting back into the original equation.'
    ],
    content: `
### What is a Linear Equation?
A linear equation is a mathematical statement containing an equals sign ($=$) and one variable raised to the power of 1. 

The fundamental rule of algebra is the **Principle of Balance**: Whatever operation you perform on one side of the equals sign, you must perform identically on the other side.

### Standard Two-Step Strategy
To solve $ax + b = c$:
1. **Undo Addition or Subtraction**: Use the inverse operation to isolate the term containing the variable.
2. **Undo Multiplication or Division**: Divide or multiply both sides by the coefficient of $x$.
3. **Check Your Solution**: Plug your answer back into the original problem to verify that the left side equals the right side.
`,
    important_definitions: [
      {
        term: 'Linear Equation',
        definition: 'An algebraic equation in which the highest exponent of the variable is 1.',
        example: '3x + 4 = 19'
      },
      {
        term: 'Coefficient',
        definition: 'A numerical factor that multiplies a variable.',
        example: 'In 5x, 5 is the coefficient of x.'
      },
      {
        term: 'Inverse Operation',
        definition: 'Operations that reverse or undo each other (addition undoes subtraction; division undoes multiplication).',
        example: 'Adding 7 undoes subtracting 7.'
      }
    ],
    examples: [
      {
        title: 'Example: Solving a Two-Step Equation',
        problem: 'Solve for x: 3x - 5 = 16',
        solution_steps: [
          'Add 5 to both sides to isolate the 3x term: 3x - 5 + 5 = 16 + 5.',
          'Simplify: 3x = 21.',
          'Divide both sides by 3: 3x / 3 = 21 / 3.',
          'Simplify: x = 7.',
          'Check: 3(7) - 5 = 21 - 5 = 16. Correct!'
        ],
        final_answer: 'x = 7'
      }
    ],
    practice_exercises: [
      {
        question: 'Solve for y: 4y + 9 = 37',
        hint: 'First subtract 9 from both sides, then divide by 4.',
        solution: '4y = 28, then y = 28 / 4 = 7.'
      }
    ],
    knowledge_check: [
      {
        id: 'kc-m2-1',
        question: 'What is the first step to solve 5x + 8 = 38?',
        options: ['Divide both sides by 5', 'Subtract 8 from both sides', 'Add 8 to both sides', 'Multiply by 5'],
        correct_index: 1,
        explanation: 'Subtracting 8 from both sides isolates the variable term 5x.'
      }
    ]
  },

  // 3. Science Lesson 1
  {
    id: 'sci-l1',
    course_id: 'sci-c1',
    subject_id: 'science',
    title: 'Plant and Animal Cell Architecture',
    unit_number: 1,
    chapter_number: 1,
    order_index: 1,
    estimated_minutes: 20,
    xp_reward: 50,
    verified_syllabus: true,
    interactive_widget_type: 'cell_explorer',
    learning_objectives: [
      'Recognize that cells are the basic structural and functional units of all living organisms.',
      'Identify key organelles: Nucleus, Cell Membrane, Cytoplasm, Mitochondria, Vacuoles, and Ribosomes.',
      'Contrast plant cells with animal cells (cell wall, chloroplasts, large central vacuole).',
      'Explain the fundamental role of chloroplasts in photosynthesis.'
    ],
    content: `
### The Cell: Unit of Life
All living things in Ethiopia and across the Earth—from the acacia trees of the Great Rift Valley to the Walia ibex in the Simien Mountains—are composed of cells. 

Cells fall into two primary categories:
1. **Plant Cells**: Characterized by a rigid **cell wall** made of cellulose, green **chloroplasts** for trapping sunlight, and a large **central vacuole** for storing water and maintaining turgor pressure.
2. **Animal Cells**: Lack a cell wall and chloroplasts; have an irregular, flexible shape bounded only by a selectively permeable **cell membrane**.

### Key Organelles & Their Functions
- **Nucleus**: The control center containing genetic material (DNA).
- **Mitochondria**: The "powerhouses" of the cell, carrying out cellular respiration to produce energy (ATP).
- **Chloroplasts**: Found in green plant cells; contain chlorophyll to convert light, water, and $CO_2$ into glucose and oxygen.
- **Cell Membrane**: The selective gatekeeper controlling what enters and leaves the cell.
`,
    important_definitions: [
      {
        term: 'Organelle',
        definition: 'A specialized subunit within a cell that has a specific metabolic function.',
        example: 'Mitochondrion, nucleus, vacuole.'
      },
      {
        term: 'Cell Wall',
        definition: 'A rigid outer layer found outside the cell membrane in plant cells providing structure and protection.',
        example: 'Composed primarily of cellulose fibers.'
      },
      {
        term: 'Chloroplast',
        definition: 'The photosynthetic organelle in plant cells that captures light energy.',
        example: 'Contains chlorophyll which gives leaves their green hue.'
      }
    ],
    examples: [
      {
        title: 'Comparison: Plant vs. Animal Cell Under Microscope',
        problem: 'A student observes an onion peel cell and a human cheek cell. What two key structures are visible only in the onion cell?',
        solution_steps: [
          'Recall that onion is an organism of kingdom Plantae, while human cheek cells are Animalia.',
          'Plant cells possess a rigid outer cellulose cell wall that maintains a defined rectangular shape.',
          'Plant cells also contain large central vacuoles (and chloroplasts in green plant tissues).',
          'Cheek cells lack a cell wall and have only a flexible cell membrane.'
        ],
        final_answer: 'The rigid cell wall and the large central vacuole.'
      }
    ],
    practice_exercises: [
      {
        question: 'Why do animal cells burst when placed in pure water, but plant cells do not?',
        hint: 'Which organelle provides structural resistance against internal water pressure?',
        solution: 'The rigid cellulose cell wall of plant cells prevents them from bursting by exerting wall pressure (turgor).'
      }
    ],
    knowledge_check: [
      {
        id: 'kc-s1-1',
        question: 'Which organelle is responsible for generating energy through cellular respiration?',
        options: ['Chloroplast', 'Mitochondria', 'Cell wall', 'Ribosome'],
        correct_index: 1,
        explanation: 'Mitochondria are the powerhouses of the cell where ATP energy is synthesized.'
      },
      {
        id: 'kc-s1-2',
        question: 'Which of the following structures is found in plant cells but NOT in animal cells?',
        options: ['Nucleus', 'Mitochondria', 'Cell membrane', 'Cell wall'],
        correct_index: 3,
        explanation: 'Animal cells do not have a rigid cell wall; they only have a flexible cell membrane.'
      }
    ]
  },

  // 4. Science Lesson 2
  {
    id: 'sci-l2',
    course_id: 'sci-c2',
    subject_id: 'science',
    title: 'Work, Force & The Six Simple Machines',
    unit_number: 2,
    chapter_number: 1,
    order_index: 2,
    estimated_minutes: 18,
    xp_reward: 50,
    verified_syllabus: true,
    interactive_widget_type: 'machine_lever',
    learning_objectives: [
      'Define mechanical work in physics as Work = Force × Distance (W = F × d).',
      'Classify the six classical simple machines (lever, pulley, inclined plane, wheel and axle, screw, wedge).',
      'Explain the concept of mechanical advantage (MA = Load / Effort).',
      'Demonstrate how first-class, second-class, and third-class levers operate in daily tools.'
    ],
    content: `
### What is Work in Science?
In physics, **work** is done only when a force causes an object to move in the direction of the applied force:
$$W = F \\times d$$
Where:
- $W$ is Work measured in Joules (J).
- $F$ is Force measured in Newtons (N).
- $d$ is Distance measured in meters (m).

If you push against a boulder with all your strength but it does not move, scientifically, zero work has been performed!

### The Six Simple Machines
Simple machines do not reduce the total work required; instead, they make work easier by altering either the **direction** of force or the **distance** over which force is applied.
1. **Lever**: A rigid bar pivoting on a fixed point called a **fulcrum** (e.g., crowbar, scissors, seesaw).
2. **Pulley**: A grooved wheel with a rope used to lift heavy loads (e.g., water well hoist).
3. **Inclined Plane**: A slanted ramp that reduces the effort required to lift an object vertically.
4. **Wheel and Axle**: A larger wheel attached to a smaller shaft (e.g., doorknob, steering wheel).
5. **Screw**: An inclined plane wrapped around a cylinder.
6. **Wedge**: Two inclined planes placed back-to-back to split or cut objects (e.g., axe, knife).
`,
    important_definitions: [
      {
        term: 'Mechanical Advantage (MA)',
        definition: 'The ratio of load force to effort force (MA = Load / Effort).',
        example: 'If an inclined plane lets you lift a 400 N load with only 100 N of effort, MA = 4.'
      },
      {
        term: 'Fulcrum',
        definition: 'The fixed pivot point around which a lever moves.',
        example: 'The central hinge of a pair of scissors.'
      }
    ],
    examples: [
      {
        title: 'Example: Calculating Work',
        problem: 'A farmer pushes a wheelbarrow with a force of 150 N across a distance of 12 meters. Calculate the work done.',
        solution_steps: [
          'State the formula: Work = Force × Distance.',
          'Identify given values: F = 150 N, d = 12 m.',
          'Multiply: W = 150 N × 12 m = 1800 J.'
        ],
        final_answer: '1800 Joules (J)'
      }
    ],
    practice_exercises: [
      {
        question: 'Calculate the mechanical advantage of a lever where a 600 N load is lifted using 150 N of effort force.',
        hint: 'Use the formula MA = Load / Effort.',
        solution: 'MA = 600 N / 150 N = 4.'
      }
    ],
    knowledge_check: [
      {
        id: 'kc-s2-1',
        question: 'Which of the following is an example of an inclined plane wrapped around a cylinder?',
        options: ['Lever', 'Pulley', 'Screw', 'Wedge'],
        correct_index: 2,
        explanation: 'A screw is a spiral inclined plane wrapped helically around a central shaft.'
      }
    ]
  },

  // 5. English Lesson 1
  {
    id: 'eng-l1',
    course_id: 'eng-c1',
    subject_id: 'english',
    title: 'Mastering Sentence Variety: Simple, Compound, and Complex',
    unit_number: 1,
    chapter_number: 1,
    order_index: 1,
    estimated_minutes: 16,
    xp_reward: 50,
    verified_syllabus: true,
    interactive_widget_type: 'sentence_builder',
    learning_objectives: [
      'Distinguish between independent and dependent (subordinate) clauses.',
      'Construct compound sentences using coordinating conjunctions (FANBOYS: for, and, nor, but, or, yet, so).',
      'Build complex sentences using subordinating conjunctions (although, because, since, while, if).',
      'Apply correct comma punctuation when subordinate clauses lead a sentence.'
    ],
    content: `
### The Power of Sentence Architecture
Good writers do not write in short, repetitive fragments. By varying sentence structure, you bring rhythm, clarity, and sophistication to your communication.

### 1. Simple Sentence
Contains one independent clause with a subject and a predicate:
> *The sun rose over the Ethiopian plateau.*

### 2. Compound Sentence
Contains two or more independent clauses joined by a comma and a coordinating conjunction (**FANBOYS**):
> *The students studied diligently for the science exam, **and** they achieved outstanding marks.*

### 3. Complex Sentence
Contains one independent clause and at least one dependent (subordinate) clause beginning with a subordinating conjunction:
> ***Because** the rain was heavy in the highlands, the Blue Nile River swelled.*
`,
    important_definitions: [
      {
        term: 'Independent Clause',
        definition: 'A group of words containing a subject and verb that expresses a complete thought and can stand alone as a sentence.',
        example: '"She finished her assignment."'
      },
      {
        term: 'Dependent Clause',
        definition: 'A clause that starts with a subordinating conjunction and cannot stand alone as a complete sentence.',
        example: '"Although she was tired..."'
      }
    ],
    examples: [
      {
        title: 'Example: Combining Clauses into a Complex Sentence',
        problem: 'Combine: "Dawit arrived at school early." and "He wanted to prepare the science laboratory."',
        solution_steps: [
          'Choose a subordinating conjunction of purpose or reason, such as "because" or "since".',
          'Option A: Dawit arrived at school early because he wanted to prepare the science laboratory.',
          'Option B: Because he wanted to prepare the science laboratory, Dawit arrived at school early.'
        ],
        final_answer: 'Because he wanted to prepare the science laboratory, Dawit arrived at school early.'
      }
    ],
    practice_exercises: [
      {
        question: 'Identify the sentence type: "Although Martha was unwell, she completed her English essay, and her teacher praised her dedication."',
        hint: 'Look for both a subordinating conjunction (although) and a coordinating conjunction (and).',
        solution: 'Compound-Complex sentence.'
      }
    ],
    knowledge_check: [
      {
        id: 'kc-e1-1',
        question: 'Which conjunction is NOT part of the coordinating conjunctions (FANBOYS)?',
        options: ['Because', 'And', 'But', 'So'],
        correct_index: 0,
        explanation: '"Because" is a subordinating conjunction used to form complex sentences, not FANBOYS.'
      }
    ]
  },

  // 6. Social Studies Lesson 1
  {
    id: 'soc-l1',
    course_id: 'soc-c1',
    subject_id: 'social',
    title: 'Physical Topography and Drainage Basins of Ethiopia',
    unit_number: 1,
    chapter_number: 1,
    order_index: 1,
    estimated_minutes: 20,
    xp_reward: 50,
    verified_syllabus: true,
    interactive_widget_type: 'topo_map',
    learning_objectives: [
      'Locate Ethiopia on the globe and describe its physiographic diversity.',
      'Explain the formation and features of the Great East African Rift Valley.',
      'Identify the three major drainage systems (Mediterranean/Abbay, Indian Ocean, and Inland/Endorheic).',
      'Examine the importance of Lake Tana and the Blue Nile (Abbay) River.'
    ],
    content: `
### The Roof of Africa
Ethiopia is renowned as the "Water Tower of Eastern Africa" due to its elevated highlands, towering peaks (such as Ras Dashen in the Simien Mountains reaching 4,550 meters), and extensive river systems.

### Physiographic Regions of Ethiopia
The country is divided into three prominent physiographic divisions:
1. **The Western Highlands and Lowlands**: Home to rugged massifs, plateaus, and Lake Tana.
2. **The Southeastern Highlands and Lowlands**: Separated from the west by the tectonic fracture of the Rift Valley; includes the Bale Mountains.
3. **The Great Rift Valley**: A massive structural depression dividing the highlands from northeast to southwest, featuring lakes such as Ziway, Langano, Abijatta, and Shalla.

### Major Drainage Basins
- **Mediterranean Drainage System**: Dominated by the Abbay (Blue Nile), Tekeze, and Baro rivers, carrying rich silt and vast volumes of water toward Sudan and Egypt.
- **Indian Ocean Drainage System**: Composed of the Wabe Shebelle and Genale-Dawa rivers flowing southeastward.
- **Inland (Endorheic) Drainage System**: Rivers that terminate in lakes with no ocean outlet, notably the Awash River (terminating in Lake Abbe) and the Omo-Gibe River (terminating in Lake Turkana).
`,
    important_definitions: [
      {
        term: 'Drainage Basin',
        definition: 'An area of land drained by a river and its tributaries into a common body of water.',
        example: 'The Abbay drainage basin drains over 199,000 km².'
      },
      {
        term: 'Rift Valley',
        definition: 'A steep-sided valley formed by the downward faulting of the Earth\'s crust between tectonic plates.',
        example: 'The East African Rift system running through Ethiopia.'
      }
    ],
    examples: [
      {
        title: 'Example: Tracing River Paths',
        problem: 'Which major Ethiopian river originates from Lake Tana and flows through the Grand Ethiopian Renaissance Dam (GERD)?',
        solution_steps: [
          'Identify Lake Tana as the largest freshwater lake in Ethiopia.',
          'Recall that the river emerging from its southern shore is the Abbay River (Blue Nile).',
          'The Abbay flows west through Benishangul-Gumuz where the GERD is constructed.'
        ],
        final_answer: 'The Abbay (Blue Nile) River.'
      }
    ],
    practice_exercises: [
      {
        question: 'Into which lake does the Awash River terminate?',
        hint: 'It is an inland lake located on the border of Ethiopia and Djibouti.',
        solution: 'Lake Abbe (Inland/Endorheic basin).'
      }
    ],
    knowledge_check: [
      {
        id: 'kc-so1-1',
        question: 'What is the highest mountain peak in Ethiopia?',
        options: ['Mount Batu', 'Ras Dashen', 'Mount Chilalo', 'Mount Guna'],
        correct_index: 1,
        explanation: 'Ras Dashen in the Simien Mountains stands at approximately 4,550 meters above sea level.'
      }
    ]
  },

  // 7. Afaan Oromoo Lesson 1
  {
    id: 'oro-l1',
    course_id: 'oro-c1',
    subject_id: 'oromo',
    title: 'Caasaa Himaa fi Seerluga Bu’uuraa',
    unit_number: 1,
    chapter_number: 1,
    order_index: 1,
    estimated_minutes: 18,
    xp_reward: 50,
    verified_syllabus: true,
    interactive_widget_type: 'sentence_builder',
    learning_objectives: [
      'Caasaa himaa Afaan Oromoo (Mat-himaa + Anta-himaa + Gochima) sirriitti hubachuu.',
      'Garaagarummaa caasaa himaa Afaan Oromoo fi Afaan Ingilizii beekuu.',
      'Bamaqaa fi maqaa iddoo isaanii sirriitti fayyadamuu.',
      'Fakkeenya himoota qajeeloo fi gaaffii ijaaruu.'
    ],
    content: `
### Caasaa Himaa Afaan Oromoo (SOV)
Afaan Oromoo keessatti, himni qajeeltoon caasaa armaan gadii hordofa:
**Mat-himaa (Subject) + Anta-himaa (Object) + Gochima (Verb)**

Kunis caasaa Afaan Ingilizii (Subject + Verb + Object) irraa adda. Afaan Oromoo keessatti yeroo hunda **Gochimni** dhuma himaa irratti argama.

#### Fakkeenya Caasaa:
1. **Caaltuun** (Mat-himaa) **kitaaba** (Anta-himaa) **dubbiste** (Gochima).
2. **Barattoonni** (Mat-himaa) **herrega** (Anta-himaa) **qorataniiru** (Gochima).

### Bamaqaa (Pronouns)
Bamaqaan jecha bakka maqaa bu'uudhaan tajaajiludha:
- **Ani** (I)
- **Ati** (You - singular)
- **Inni** (He)
- **Isheen** (She)
- **Nuti** (We)
- **Isin** (You - plural/polite)
- **Isaan** (They)
`,
    important_definitions: [
      {
        term: 'Mat-himaa (Subject)',
        definition: 'Qaama himaa isa gocha raawwatu ykn isa waa’een isaa himamu.',
        example: '"Tolasaan" fiigaa jira.'
      },
      {
        term: 'Gochima (Verb)',
        definition: 'Jecha gocha, ta’umsa, ykn haala agarsiisu kan dhuma himaa irratti dhuftu.',
        example: '"barate", "deeme", "nyaate".'
      }
    ],
    examples: [
      {
        title: 'Fakkeenya: Caasaa Himaa Sirreessuu',
        problem: 'Jecha armaan gadii tartiiba sirriin kaa\'i: [ nyaate / Kabbadaan / mishingaa ]',
        solution_steps: [
          'Mat-himaa filadhu: "Kabbadaan" (eenyutu nyaate?)',
          'Anta-himaa filadhu: "mishingaa" (maaltu nyaatame?)',
          'Gochima dhuma irratti kaa\'i: "nyaate"',
          'Hima guutuu: Kabbadaan mishingaa nyaate.'
        ],
        final_answer: 'Kabbadaan mishingaa nyaate.'
      }
    ],
    practice_exercises: [
      {
        question: 'Mat-himaa hima kanaa baasi: "Obbo Leencoon sangaa bite."',
        hint: 'Eenyutu gocha bituu raawwate?',
        solution: 'Obbo Leencoon'
      }
    ],
    knowledge_check: [
      {
        id: 'kc-o1-1',
        question: 'Caasaan hima qajeeloo Afaan Oromoo maali?',
        options: ['S + V + O', 'S + O + V', 'V + S + O', 'O + V + S'],
        correct_index: 1,
        explanation: 'Afaan Oromoo keessatti caasaan hima qajeeloo Mat-himaa + Anta-himaa + Gochima (SOV) dha.'
      }
    ]
  }
];

export const INITIAL_QUIZZES: Quiz[] = [
  {
    id: 'quiz-math-1',
    subject_id: 'math',
    course_id: 'math-c1',
    title: 'Grade 7 Mathematics Mastery: Rational Numbers & Graphing',
    description: 'Test your understanding of rational number operations, number lines, and coordinate plane quadrants.',
    time_limit_seconds: 480,
    difficulty: 'intermediate',
    xp_reward: 100,
    pass_score_percent: 70,
    questions_count: 5
  },
  {
    id: 'quiz-sci-1',
    subject_id: 'science',
    course_id: 'sci-c1',
    title: 'General Science Assessment: Cell Biology & Simple Machines',
    description: 'Assess your knowledge on plant vs. animal organelles, mechanical advantage, and the laws of work.',
    time_limit_seconds: 480,
    difficulty: 'intermediate',
    xp_reward: 100,
    pass_score_percent: 70,
    questions_count: 5
  },
  {
    id: 'quiz-eng-1',
    subject_id: 'english',
    course_id: 'eng-c1',
    title: 'English Grammatical Structures & Clause Mastery',
    description: 'Evaluate your ability to identify independent/dependent clauses and coordinating conjunctions.',
    time_limit_seconds: 420,
    difficulty: 'beginner',
    xp_reward: 80,
    pass_score_percent: 70,
    questions_count: 5
  },
  {
    id: 'quiz-soc-1',
    subject_id: 'social',
    course_id: 'soc-c1',
    title: 'Social Studies Challenge: Geography of Ethiopia',
    description: 'Test your grasp of the Great Rift Valley, Ethiopian drainage basins, and historic civilizations.',
    time_limit_seconds: 480,
    difficulty: 'intermediate',
    xp_reward: 100,
    pass_score_percent: 70,
    questions_count: 5
  },
  {
    id: 'quiz-oro-1',
    subject_id: 'oromo',
    course_id: 'oro-c1',
    title: 'Afaan Oromoo: Caasaa Himaa fi Seerluga',
    description: 'Qormaata caasaa himaa (SOV), bamaqaa, fi fayyadama jechootaa Afaan Oromoo kutaa 7ffaa.',
    time_limit_seconds: 420,
    difficulty: 'intermediate',
    xp_reward: 100,
    pass_score_percent: 70,
    questions_count: 5
  }
];

export const AUTHORITATIVE_QUIZ_QUESTIONS: Record<string, QuizQuestion[]> = {
  'quiz-math-1': [
    {
      id: 'q-m-1',
      quiz_id: 'quiz-math-1',
      question_text: 'Which number is located between -3/4 and -1/4 on a standard number line?',
      question_type: 'multiple_choice',
      options: ['-1/2', '-7/8', '0', '-1'],
      correct_option_index: 0,
      explanation: '-1/2 is equivalent to -2/4, which lies exactly midway between -3/4 and -1/4.',
      points: 20,
      order_index: 1
    },
    {
      id: 'q-m-2',
      quiz_id: 'quiz-math-1',
      question_text: 'The point R(0, -6) lies on which boundary on the coordinate plane?',
      question_type: 'multiple_choice',
      options: ['The x-axis', 'The y-axis', 'Quadrant III', 'Quadrant IV'],
      correct_option_index: 1,
      explanation: 'When the x-coordinate is 0, the point lies directly on the vertical y-axis.',
      points: 20,
      order_index: 2
    },
    {
      id: 'q-m-3',
      quiz_id: 'quiz-math-1',
      question_text: 'Solve for x: 4x - 7 = 25.',
      question_type: 'multiple_choice',
      options: ['x = 6', 'x = 8', 'x = 7', 'x = 9'],
      correct_option_index: 1,
      explanation: 'Add 7 to both sides: 4x = 32. Divide by 4: x = 8.',
      points: 20,
      order_index: 3
    },
    {
      id: 'q-m-4',
      quiz_id: 'quiz-math-1',
      question_text: 'True or False: Every integer is also classified as a rational number.',
      question_type: 'true_false',
      options: ['True', 'False'],
      correct_option_index: 0,
      explanation: 'True. Any integer n can be expressed as n/1, fulfilling the definition of a rational number.',
      points: 20,
      order_index: 4
    },
    {
      id: 'q-m-5',
      quiz_id: 'quiz-math-1',
      question_text: 'In which quadrant is the point (-4, 9) located?',
      question_type: 'multiple_choice',
      options: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'],
      correct_option_index: 1,
      explanation: 'Points with negative x and positive y (-x, +y) lie in Quadrant II.',
      points: 20,
      order_index: 5
    }
  ],

  'quiz-sci-1': [
    {
      id: 'q-s-1',
      quiz_id: 'quiz-sci-1',
      question_text: 'Which organelle is present in green plant cells to conduct photosynthesis?',
      question_type: 'multiple_choice',
      options: ['Ribosome', 'Centriole', 'Chloroplast', 'Lysosome'],
      correct_option_index: 2,
      explanation: 'Chloroplasts contain chlorophyll that traps light energy for photosynthesis.',
      points: 20,
      order_index: 1
    },
    {
      id: 'q-s-2',
      quiz_id: 'quiz-sci-1',
      question_text: 'Calculate the work done when a force of 40 N moves a box 5 meters.',
      question_type: 'multiple_choice',
      options: ['8 Joules', '200 Joules', '45 Joules', '100 Joules'],
      correct_option_index: 1,
      explanation: 'Work = Force × Distance = 40 N × 5 m = 200 J.',
      points: 20,
      order_index: 2
    },
    {
      id: 'q-s-3',
      quiz_id: 'quiz-sci-1',
      question_text: 'A ramp used to load goods onto a truck is an example of which simple machine?',
      question_type: 'multiple_choice',
      options: ['Wedge', 'Pulley', 'Inclined plane', 'Lever'],
      correct_option_index: 2,
      explanation: 'An inclined plane is a sloping surface connecting a lower to a higher elevation.',
      points: 20,
      order_index: 3
    },
    {
      id: 'q-s-4',
      quiz_id: 'quiz-sci-1',
      question_text: 'True or False: Plant cells possess both a cell membrane AND a rigid cell wall.',
      question_type: 'true_false',
      options: ['True', 'False'],
      correct_option_index: 0,
      explanation: 'True. The cell wall sits directly exterior to the plasma cell membrane.',
      points: 20,
      order_index: 4
    },
    {
      id: 'q-s-5',
      quiz_id: 'quiz-sci-1',
      question_text: 'If a lever lifts a 500 N load with an effort force of 100 N, what is its Mechanical Advantage (MA)?',
      question_type: 'multiple_choice',
      options: ['5', '0.2', '50', '400'],
      correct_option_index: 0,
      explanation: 'Mechanical Advantage = Load / Effort = 500 N / 100 N = 5.',
      points: 20,
      order_index: 5
    }
  ],

  'quiz-eng-1': [
    {
      id: 'q-e-1',
      quiz_id: 'quiz-eng-1',
      question_text: 'What type of sentence is: "Although it rained heavily, we completed the experiment"?',
      question_type: 'multiple_choice',
      options: ['Simple sentence', 'Compound sentence', 'Complex sentence', 'Incomplete fragment'],
      correct_option_index: 2,
      explanation: 'It contains a dependent clause ("Although it rained heavily") and an independent clause.',
      points: 20,
      order_index: 1
    },
    {
      id: 'q-e-2',
      quiz_id: 'quiz-eng-1',
      question_text: 'Which acronym helps you remember coordinating conjunctions?',
      question_type: 'multiple_choice',
      options: ['PEMDAS', 'FANBOYS', 'HOMES', 'ROYGBIV'],
      correct_option_index: 1,
      explanation: 'FANBOYS stands for For, And, Nor, But, Or, Yet, So.',
      points: 20,
      order_index: 2
    },
    {
      id: 'q-e-3',
      quiz_id: 'quiz-eng-1',
      question_text: 'Choose the correct coordinating conjunction: "Almaz wanted to attend the study group, ___ she had to care for her younger brother."',
      question_type: 'multiple_choice',
      options: ['so', 'but', 'nor', 'for'],
      correct_option_index: 1,
      explanation: '"But" shows contrast between her desire to attend and her family duty.',
      points: 20,
      order_index: 3
    },
    {
      id: 'q-e-4',
      quiz_id: 'quiz-eng-1',
      question_text: 'True or False: A dependent clause can stand alone as a complete sentence.',
      question_type: 'true_false',
      options: ['True', 'False'],
      correct_option_index: 1,
      explanation: 'False. A dependent clause does not express a complete thought and needs an independent clause.',
      points: 20,
      order_index: 4
    },
    {
      id: 'q-e-5',
      quiz_id: 'quiz-eng-1',
      question_text: 'Identify the independent clause: "Since the library was quiet, Kebede finished his reading."',
      question_type: 'multiple_choice',
      options: ['Since the library was quiet', 'Kebede finished his reading', 'Since the library', 'was quiet Kebede'],
      correct_option_index: 1,
      explanation: '"Kebede finished his reading" expresses a complete thought and stands alone.',
      points: 20,
      order_index: 5
    }
  ],

  'quiz-soc-1': [
    {
      id: 'q-so-1',
      quiz_id: 'quiz-soc-1',
      question_text: 'Which geological feature divides the Ethiopian Highlands into northwestern and southeastern massifs?',
      question_type: 'multiple_choice',
      options: ['The Sahara Basin', 'The Great East African Rift Valley', 'The Congo Basin', 'The Danakil Depression only'],
      correct_option_index: 1,
      explanation: 'The Great East African Rift Valley diagonally cuts across the Ethiopian plateau.',
      points: 20,
      order_index: 1
    },
    {
      id: 'q-so-2',
      quiz_id: 'quiz-soc-1',
      question_text: 'From which body of water does the Abbay (Blue Nile) River directly originate?',
      question_type: 'multiple_choice',
      options: ['Lake Victoria', 'Lake Tana', 'Lake Turkana', 'Lake Ziway'],
      correct_option_index: 1,
      explanation: 'The Abbay River flows out of the southern shore of Lake Tana in the Amhara region.',
      points: 20,
      order_index: 2
    },
    {
      id: 'q-so-3',
      quiz_id: 'quiz-soc-1',
      question_text: 'Which major Ethiopian river terminates in Lake Abbe without reaching an ocean?',
      question_type: 'multiple_choice',
      options: ['Awash River', 'Baro River', 'Tekeze River', 'Abbay River'],
      correct_option_index: 0,
      explanation: 'The Awash River belongs to the inland (endorheic) drainage basin, ending in Lake Abbe.',
      points: 20,
      order_index: 3
    },
    {
      id: 'q-so-4',
      quiz_id: 'quiz-soc-1',
      question_text: 'True or False: Ras Dashen is located in the Simien Mountain National Park.',
      question_type: 'true_false',
      options: ['True', 'False'],
      correct_option_index: 0,
      explanation: 'True. Ras Dashen (4,550 m) is the highest peak in Ethiopia located in the Simien Mountains.',
      points: 20,
      order_index: 4
    },
    {
      id: 'q-so-5',
      quiz_id: 'quiz-soc-1',
      question_text: 'Ancient Aksum was historically famous for which of the following cultural accomplishments?',
      question_type: 'multiple_choice',
      options: ['Minting its own gold coinage and monumental stone stelae', 'Building pyramids of Giza', 'The Great Wall of China', 'Hanging Gardens'],
      correct_option_index: 0,
      explanation: 'Aksum was a world trading empire that minted silver/gold coins and erected towering carved obelisks.',
      points: 20,
      order_index: 5
    }
  ],

  'quiz-oro-1': [
    {
      id: 'q-o-1',
      quiz_id: 'quiz-oro-1',
      question_text: 'Hima qajeeloo Afaan Oromoo keessatti gochimni eessatti argama?',
      question_type: 'multiple_choice',
      options: ['Jalqaba himaa', 'Gidduu himaa', 'Dhuma himaa', 'Itti dabalee bakka kamiyyuu'],
      correct_option_index: 2,
      explanation: 'Caasaa Afaan Oromoo (SOV) keessatti gochimni yeroo hunda dhuma himaa irratti argama.',
      points: 20,
      order_index: 1
    },
    {
      id: 'q-o-2',
      quiz_id: 'quiz-oro-1',
      question_text: 'Hima "Caaltuun bishaan waraabde" jedhu keessatti "bishaan" maali?',
      question_type: 'multiple_choice',
      options: ['Mat-himaa', 'Anta-himaa', 'Gochima', 'Ibsa-maqaa'],
      correct_option_index: 1,
      explanation: '"Bishaan" kan gochi waraabamuu irratti raawwatame waan ta\'eef Anta-himaa (object) dha.',
      points: 20,
      order_index: 2
    },
    {
      id: 'q-o-3',
      quiz_id: 'quiz-oro-1',
      question_text: 'Bamaqaan nama lammaffaa hedduminaa (second person plural) kamidha?',
      question_type: 'multiple_choice',
      options: ['Isaan', 'Isin', 'Nuti', 'Inni'],
      correct_option_index: 1,
      explanation: '"Isin" bamaqaa nama lammaffaa kabajaa ykn hedduminaati.',
      points: 20,
      order_index: 3
    },
    {
      id: 'q-o-4',
      quiz_id: 'quiz-oro-1',
      question_text: 'Dhugaa ykn Soba: Mammaaksi Oromoo aadaa, ogummaa fi beekumsa dhalootaa dhalootatti dabarsa.',
      question_type: 'true_false',
      options: ['Dhugaa', 'Soba'],
      correct_option_index: 0,
      explanation: 'Dhugaa dha. Mammaaksi kuusaa falaasama fi ogummaa uummata Oromooti.',
      points: 20,
      order_index: 4
    },
    {
      id: 'q-o-5',
      quiz_id: 'quiz-oro-1',
      question_text: 'Mammaaksa kana xumuri: "Dhugaan ni qallatti malee ___."',
      question_type: 'multiple_choice',
      options: ['hin baddu', 'hin cittu', 'hin kufitu', 'hin duutu'],
      correct_option_index: 1,
      explanation: 'Mammaaksi beekamaan: "Dhugaan ni qallatti malee hin cittu" jedha.',
      points: 20,
      order_index: 5
    }
  ]
};

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-first-step',
    code: 'FIRST_STEP',
    title: 'Cosmic Awakening',
    description: 'Complete your very first Grade 7 interactive lesson.',
    icon: 'Compass',
    xp_bonus: 50,
    condition_type: 'lesson_1'
  },
  {
    id: 'ach-math-star',
    code: 'MATH_EXPLORER',
    title: 'Rational Master',
    description: 'Complete a full lesson in Grade 7 Mathematics.',
    icon: 'Calculator',
    xp_bonus: 100,
    condition_type: 'math_lesson'
  },
  {
    id: 'ach-science-lab',
    code: 'LAB_DISCOVERER',
    title: 'Cell Biologist',
    description: 'Score 80% or higher on the Cell Biology quiz.',
    icon: 'Atom',
    xp_bonus: 100,
    condition_type: 'science_quiz'
  },
  {
    id: 'ach-quiz-champ',
    code: 'PERFECT_SCORE',
    title: 'Academic Precision',
    description: 'Achieve a 100% perfect score on any unit assessment.',
    icon: 'Trophy',
    xp_bonus: 150,
    condition_type: 'perfect_quiz'
  },
  {
    id: 'ach-leaderboard',
    code: 'LEADERBOARD_JOIN',
    title: 'Orbit Explorer',
    description: 'Opt in to the live Grade 7 academic leaderboard.',
    icon: 'Crown',
    xp_bonus: 50,
    condition_type: 'leaderboard'
  }
];

export const INITIAL_STUDY_NOTES: StudyNote[] = [
  {
    id: 'note-math-1',
    subject_id: 'math',
    title: 'Rational Numbers & Coordinate Geometry Quick Revision',
    unit_title: 'Unit 1: Rational Numbers',
    summary: 'A fast-reference revision guide containing key definitions, sign rules for fractions, and coordinate plane quadrant formulas.',
    key_terms: [
      { term: 'Rational Number (Q)', explanation: 'Any number a/b where b ≠ 0.' },
      { term: 'Quadrant Rule', explanation: 'QI (+,+), QII (-,+), QIII (-,-), QIV (+,-).' },
      { term: 'Absolute Value |x|', explanation: 'The distance of a number from zero on the number line.' }
    ],
    download_filename: 'Studyverse_G7_Math_Unit1_Notes.txt',
    content_markdown: `# STUDYVERSE 2.0: GRADE 7 MATHEMATICS REVISION NOTES
Unit 1: Rational Numbers & Cartesian Coordinates

## 1. What is a Rational Number?
- Definition: Any number that can be expressed as a/b, where a and b are integers and b ≠ 0.
- Decimals: Terminating decimals (e.g. 0.8 = 4/5) and repeating decimals (e.g. 0.666... = 2/3) are rational.
- Integers: Every integer n is rational because n = n/1.

## 2. Operations with Rational Numbers
- Adding fractions: Always find the Least Common Denominator (LCD).
  a/c + b/c = (a + b)/c
- Multiplying fractions: Multiply straight across: (a/b) * (c/d) = (a*c)/(b*d).
- Dividing fractions: Multiply by the reciprocal: (a/b) ÷ (c/d) = (a/b) * (d/c).

## 3. Cartesian Coordinate Plane
- Origin: Point (0, 0)
- Quadrant I: (+, +)
- Quadrant II: (-, +)
- Quadrant III: (-, -)
- Quadrant IV: (+, -)

STUDYVERSE 2.0 Academic Resource (Grade 7)`
  },
  {
    id: 'note-sci-1',
    subject_id: 'science',
    title: 'Cell Organelles & Simple Machines Summary Sheet',
    unit_title: 'Unit 1 & 2: Biology & Physics',
    summary: 'Printable summary covering plant vs animal cell comparisons, photosynthesis formula, and the six simple machines.',
    key_terms: [
      { term: 'Photosynthesis', explanation: '6CO2 + 6H2O + Light → C6H12O6 + 6O2' },
      { term: 'Mechanical Advantage', explanation: 'MA = Load / Effort' },
      { term: 'Mitochondria', explanation: 'Powerhouse of eukaryotic cells generating ATP energy.' }
    ],
    download_filename: 'Studyverse_G7_Science_Revision_Notes.txt',
    content_markdown: `# STUDYVERSE 2.0: GRADE 7 GENERAL SCIENCE REVISION
Unit 1: Cell Biology & Unit 2: Simple Machines

## 1. Plant vs. Animal Cells
- Cell Wall: Present in plant cells (provides rigid cellulose support); absent in animal cells.
- Chloroplasts: Present in plant cells for photosynthesis; absent in animal cells.
- Vacuoles: One large central vacuole in plant cells; small and temporary in animal cells.
- Mitochondria: Present in both for cellular respiration.

## 2. Physics of Work & Machines
- Work Formula: Work (Joules) = Force (Newtons) × Distance (meters).
- Mechanical Advantage: MA = Load / Effort.
- Six Machines: Lever, Pulley, Inclined Plane, Wheel and Axle, Wedge, Screw.

STUDYVERSE 2.0 Academic Resource (Grade 7)`
  },
  {
    id: 'note-soc-1',
    subject_id: 'social',
    title: 'Topography & Drainage Systems of Ethiopia',
    unit_title: 'Unit 1: Ethiopian Geography',
    summary: 'Revision summary of the Great Rift Valley, major highlands, Ras Dashen peak, and drainage basins.',
    key_terms: [
      { term: 'Abbay (Blue Nile)', explanation: 'Originates from Lake Tana; main source of fertile silt to the Nile.' },
      { term: 'Ras Dashen', explanation: 'Highest peak in Ethiopia (4,550 m) in the Simien Mountains.' },
      { term: 'Endorheic Basin', explanation: 'Drainage basin with no outlet to the sea (Awash River).' }
    ],
    download_filename: 'Studyverse_G7_SocialStudies_Notes.txt',
    content_markdown: `# STUDYVERSE 2.0: GRADE 7 SOCIAL STUDIES NOTES
Unit 1: Geography & Topography of Ethiopia

## 1. Physiography
- The Ethiopian plateau represents the largest continuous area of high altitude in Africa ("Roof of Africa").
- Divided into Northwestern and Southeastern Highlands by the Great Rift Valley.

## 2. Major Rivers & Drainage
- Mediterranean: Abbay (Blue Nile), Tekeze, Baro-Akobo.
- Indian Ocean: Wabe Shebelle, Genale-Dawa.
- Inland: Awash (ends in Lake Abbe), Omo-Gibe (ends in Lake Turkana).

STUDYVERSE 2.0 Academic Resource (Grade 7)`
  }
];

export const INITIAL_VIDEOS: VideoLesson[] = [
  {
    id: 'vid-math-1',
    subject_id: 'math',
    title: 'Plotting Points on the Coordinate Plane (Grade 7)',
    description: 'Visual walkthrough of x and y axes, plotting ordered pairs, and identifying all 4 quadrants.',
    duration: '6:45',
    youtube_url: 'https://www.youtube.com/watch?v=1OEMX6NE6EM',
    embed_id: '1OEMX6NE6EM',
    related_lesson_id: 'math-l1',
    order_index: 1
  },
  {
    id: 'vid-sci-1',
    subject_id: 'science',
    title: 'Plant Cells vs Animal Cells Under the Microscope',
    description: 'High-definition microscopic exploration of cell walls, nuclei, and chloroplasts in action.',
    duration: '8:20',
    youtube_url: 'https://www.youtube.com/watch?v=URUJD5NEXC8',
    embed_id: 'URUJD5NEXC8',
    related_lesson_id: 'sci-l1',
    order_index: 2
  },
  {
    id: 'vid-sci-2',
    subject_id: 'science',
    title: 'The Six Simple Machines & Mechanical Advantage',
    description: 'Real-world demonstrations of levers, pulleys, and ramps showing how force and distance balance.',
    duration: '7:15',
    youtube_url: 'https://www.youtube.com/watch?v=fvOmaHX2GGE',
    embed_id: 'fvOmaHX2GGE',
    related_lesson_id: 'sci-l2',
    order_index: 3
  },
  {
    id: 'vid-soc-1',
    subject_id: 'social',
    title: 'The Great East African Rift Valley: Geological Miracle',
    description: 'Documentary exploration of the tectonic processes shaping Ethiopia’s volcanic lakes and valleys.',
    duration: '9:30',
    youtube_url: 'https://www.youtube.com/watch?v=0k57_j8W6oA',
    embed_id: '0k57_j8W6oA',
    related_lesson_id: 'soc-l1',
    order_index: 4
  }
];

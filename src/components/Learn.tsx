import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ChevronRight, CheckCircle2, Circle, Lightbulb, Play, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { cn } from '../lib/utils';

interface Step {
  title: string;
  content: string;
  analogy?: string;
  example?: string;
}

interface TopicGuide {
  id: string;
  title: string;
  subject: 'Physics' | 'Chemistry' | 'Maths';
  description: string;
  steps: Step[];
}

const GUIDES: TopicGuide[] = [
  {
    id: 'rotational-motion',
    title: 'Rotational Dynamics & Torque',
    subject: 'Physics',
    description: 'Understanding why things rotate and how torque works.',
    steps: [
      {
        title: 'The Concept of Rotation',
        content: "In linear motion, we have Force ($F$). In rotation, we have torque ($\\tau$). If You push a door, it doesn't move forward; it pivots. This rotational push is what we call **Torque**.",
        analogy: "Think of a seesaw. If you sit further from the center, you exert more 'turning power' than someone sitting closer, even if you weigh the same.",
        example: "Using a long wrench to loosen a tight nut. The longer the handle, the easier it is to turn."
      },
      {
        title: 'The Torque Formula',
        content: "Torque is defined as the cross product of the position vector ($r$) and the force vector ($F$): \n\n$$\\vec{\\tau} = \\vec{r} \\times \\vec{F}$$\n\nMagnitudinally: $\\tau = rF\\sin(\\theta)$, where $\\theta$ is the angle between them.",
        example: "Pushing exactly perpendicular ($90^\\circ$) to a door provides maximum torque because $\\sin(90) = 1$."
      },
      {
        title: 'Moment of Inertia',
        content: "Just as mass ($m$) resists linear motion, Moment of Inertia ($I$) resists rotational motion. \n\nFor a point mass: $I = mr^2$. For a system: $I = \\sum m_i r_i^2$.",
        analogy: "Try spinning with your arms out versus arms tucked in. You'll notice it's much harder to start spinning with arms out—that's because your Moment of Inertia is higher!"
      }
    ]
  },
  {
    id: 'organic-mechanisms',
    title: 'Nucleophilic Substitution ($S_N2$)',
    subject: 'Chemistry',
    description: 'The "backside attack" mechanism in organic reactions.',
    steps: [
      {
        title: 'What is $S_N2$?',
        content: "S stands for Substitution, N for Nucleophilic, and 2 for Bimolecular (meaning the rate depends on both reactants).",
        analogy: "Imagine a crowded bus. A new passenger (the Nucleophile) pushes in through the back door while simultaneously an existing passenger (the Leaving Group) is pushed out the front door."
      },
      {
        title: 'The Mechanism',
        content: "The nucleophile attacks the carbon atom from the side opposite to the leaving group. This is called a **Backside Attack**.\n\n$Nu^- + R-X \\rightarrow [Nu \\cdots R \\cdots X]^- \\rightarrow Nu-R + X^-$",
        example: "Reaction of Hydroxide ion ($OH^-$) with Methyl Bromide ($CH_3Br$) to form Methanol."
      },
      {
        title: 'Stereochemistry (Walden Inversion)',
        content: "Because of the backside attack, the configuration of the molecule 'flips' like an umbrella in a strong wind.",
        analogy: "An umbrella flipping inside-out during a storm."
      }
    ]
  },
  {
    id: 'calculus-integration',
    title: 'Integration as Area Under Curve',
    subject: 'Maths',
    description: 'Visually understanding the fundamental theorem of calculus.',
    steps: [
      {
        title: 'The Problem of Irregular Shapes',
        content: "How do you find the area of a shape that isn't a square or triangle? Most real-world shapes have curved boundaries.",
        analogy: "Think of measuring the area of a puddle on a flat road."
      },
      {
        title: 'Approximation by Strips',
        content: "We can divide the area under a curve $y = f(x)$ into many vertical rectangles (strips). \n\n$$\\text{Area} \\approx \\sum_{i=1}^{n} f(x_i) \\Delta x$$",
      },
      {
        title: 'The Limit and the Definite Integral',
        content: "As we make the strips thinner and thinner (as $\\Delta x \\rightarrow 0$), the approximation becomes exact. This infinite sum is the integral: \n\n$$\\text{Area} = \\int_{a}^{b} f(x) dx$$",
        analogy: "Slicing a loaf of bread into paper-thin slices. The thinner the slices, the better they represent the whole loaf's volume."
      }
    ]
  }
];

export function Learn() {
  const [selectedGuide, setSelectedGuide] = useState<TopicGuide | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  if (selectedGuide) {
    const step = selectedGuide.steps[currentStep];
    const isLastStep = currentStep === selectedGuide.steps.length - 1;

    return (
      <div className="space-y-6">
        <button 
          onClick={() => { setSelectedGuide(null); setCurrentStep(0); }}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Topics
        </button>

        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl">
          {/* Progress Bar */}
          <div className="h-1.5 w-full bg-slate-100">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / selectedGuide.steps.length) * 100}%` }}
              className="h-full bg-blue-600"
            />
          </div>

          <div className="p-8 lg:p-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                  {selectedGuide.subject} • Step {currentStep + 1} of {selectedGuide.steps.length}
                </span>
                <h2 className="text-3xl font-bold text-slate-900">{selectedGuide.title}</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <motion.div
                  key={`${selectedGuide.id}-${currentStep}-content`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="prose prose-slate lg:prose-lg max-w-none"
                >
                  <h3 className="text-xl font-bold text-slate-800 mb-4">{step.title}</h3>
                  <div className="text-slate-700 leading-relaxed">
                    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                      {step.content}
                    </ReactMarkdown>
                  </div>
                </motion.div>

                <div className="flex items-center justify-between pt-8 border-t border-slate-100">
                  <button
                    disabled={currentStep === 0}
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="px-6 py-3 border border-slate-200 rounded-xl text-slate-600 font-bold hover:bg-slate-50 disabled:opacity-30 transition-all"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => isLastStep ? setSelectedGuide(null) : setCurrentStep(prev => prev + 1)}
                    className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center gap-2"
                  >
                    {isLastStep ? "Finish Guide" : "Next Step"}
                    {!isLastStep && <ChevronRight className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <AnimatePresence mode="wait">
                  {step.analogy && (
                    <motion.div
                      key="analogy"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-amber-50 p-6 rounded-2xl border border-amber-100"
                    >
                      <div className="flex items-center gap-2 text-amber-600 mb-3 font-bold text-sm uppercase tracking-wider">
                        <Lightbulb className="w-4 h-4" />
                        Analogy
                      </div>
                      <p className="text-slate-800 italic leading-relaxed">
                        "{step.analogy}"
                      </p>
                    </motion.div>
                  )}

                  {step.example && (
                    <motion.div
                      key="example"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100"
                    >
                      <div className="flex items-center gap-2 text-emerald-600 mb-3 font-bold text-sm uppercase tracking-wider">
                        <CheckCircle2 className="w-4 h-4" />
                        Quick Example
                      </div>
                      <p className="text-slate-800 leading-relaxed font-medium">
                        {step.example}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Steps Overview</h4>
                  <div className="space-y-3">
                    {selectedGuide.steps.map((s, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        {idx < currentStep ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        ) : idx === currentStep ? (
                          <div className="w-5 h-5 rounded-full border-2 border-blue-600 flex items-center justify-center">
                            <div className="w-2 h-2 bg-blue-600 rounded-full" />
                          </div>
                        ) : (
                          <Circle className="w-5 h-5 text-slate-300" />
                        )}
                        <span className={cn(
                          "text-sm font-medium",
                          idx === currentStep ? "text-blue-600" : "text-slate-500"
                        )}>
                          {s.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans">
      <header>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Interactive Syllabus</h2>
        <p className="text-sm text-slate-500 font-medium mt-1">Deep dive into complex topics with step-by-step guides, analogies, and examples.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GUIDES.map((guide) => (
          <motion.div
            key={guide.id}
            whileHover={{ y: -5 }}
            className="group cursor-pointer bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full"
            onClick={() => setSelectedGuide(guide)}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                  guide.subject === 'Physics' ? "bg-blue-50 text-blue-600" :
                  guide.subject === 'Chemistry' ? "bg-emerald-50 text-emerald-600" :
                  "bg-amber-50 text-amber-600"
                )}>
                  {guide.subject}
                </span>
                <BookOpen className="w-4 h-4 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors tracking-tight">
                {guide.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                {guide.description}
              </p>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {guide.steps.length} Learning Steps
              </span>
              <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
            </div>
          </motion.div>
        ))}

        {/* Placeholder cards for other topics */}
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-slate-50 p-6 rounded-3xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center opacity-50 grayscale">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 border border-slate-200">
              <BookOpen className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">More Topics Coming Soon</p>
          </div>
        ))}
      </div>
    </div>
  );
}
